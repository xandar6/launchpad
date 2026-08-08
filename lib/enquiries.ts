type EnquiryDatabase = {
  prepare(query: string): {
    bind(...values: string[]): { run(): Promise<unknown> };
  };
};

export type ZohoMailConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountId: string;
  fromAddress: string;
  toAddress: string;
};

const PROJECT_TYPES = new Set([
  "New business website",
  "Website redesign",
  "E-commerce",
  "Custom web solution",
  "Not sure yet",
]);

let cachedAccessToken:
  | {
      token: string;
      expiresAt: number;
    }
  | undefined;

function value(body: FormData, key: string, maxLength: number) {
  const entry = body.get(key);
  return typeof entry === "string" ? entry.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

async function getZohoAccessToken(config: ZohoMailConfig) {
  if (
    cachedAccessToken &&
    Date.now() < cachedAccessToken.expiresAt
  ) {
    return cachedAccessToken.token;
  }

  const tokenResponse = await fetch(
    "https://accounts.zoho.com.au/oauth/v2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        refresh_token: config.refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: "refresh_token",
      }),
    },
  );

  if (!tokenResponse.ok) {
    const responseText = await tokenResponse.text();
  
    throw new Error(
      `Zoho token refresh failed (${tokenResponse.status}): ${responseText.slice(
        0,
        500,
      )}`,
    );
  }

 const tokenData = (await tokenResponse.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };
  
  if (!tokenData.access_token) {
    throw new Error(
      `Zoho token error: ${tokenData.error ?? "unknown_error"}`,
    );
  }

  const expiresIn = tokenData.expires_in ?? 3600;

  cachedAccessToken = {
    token: tokenData.access_token,
    expiresAt: Date.now() + Math.max(60, expiresIn - 300) * 1000,
  };

  return tokenData.access_token;
}

async function sendEnquiryNotification(
  enquiry: {
    name: string;
    business: string;
    email: string;
    phone: string;
    project: string;
    budget: string;
    message: string;
  },
  config: ZohoMailConfig,
) {
  const accessToken = await getZohoAccessToken(config);

  const subjectName = enquiry.name.replace(/[\r\n]+/g, " ");

const replySubject = encodeURIComponent(
  `Re: Website enquiry — ${subjectName}`,
);

const replyUrl = `mailto:${enquiry.email}?subject=${replySubject}`;

const content = `
  <div style="font-family: Arial, sans-serif; max-width: 620px; color: #122139;">
    <h2 style="margin-bottom: 24px;">
      New website enquiry
    </h2>

    <table
      cellpadding="0"
      cellspacing="0"
      style="width: 100%; line-height: 1.7;"
    >
      <tr>
        <td><strong>Name:</strong></td>
        <td>${escapeHtml(enquiry.name)}</td>
      </tr>

      <tr>
        <td><strong>Business:</strong></td>
        <td>${escapeHtml(enquiry.business)}</td>
      </tr>

      <tr>
        <td><strong>Email:</strong></td>
        <td>
          <a href="mailto:${escapeHtml(enquiry.email)}">
            ${escapeHtml(enquiry.email)}
          </a>
        </td>
      </tr>

      <tr>
        <td><strong>Phone:</strong></td>
        <td>${escapeHtml(enquiry.phone || "Not provided")}</td>
      </tr>

      <tr>
        <td><strong>Project:</strong></td>
        <td>${escapeHtml(enquiry.project)}</td>
      </tr>

      <tr>
        <td><strong>Budget:</strong></td>
        <td>${escapeHtml(enquiry.budget || "Not provided")}</td>
      </tr>
    </table>

    <div style="margin-top: 24px;">
      <strong>Message:</strong>

      <div
        style="
          margin-top: 8px;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 6px;
          line-height: 1.6;
        "
      >
        ${escapeHtml(enquiry.message).replace(/\n/g, "<br>")}
      </div>
    </div>

    <div style="margin-top: 28px;">
      <a
        href="${escapeHtml(replyUrl)}"
        style="
          display: inline-block;
          padding: 12px 20px;
          background: #ef6531;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        "
      >
        Reply to customer
      </a>
    </div>

    <p
      style="
        margin-top: 28px;
        font-size: 13px;
        color: #666666;
      "
    >
      This enquiry was submitted through launchpadwebsolutions.com.
    </p>
  </div>
`;

  const mailResponse = await fetch(
    `https://mail.zoho.com.au/api/accounts/${encodeURIComponent(
      config.accountId,
    )}/messages`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      body: JSON.stringify({
        fromAddress: config.fromAddress,
        toAddress: config.toAddress,
        subject: `New website enquiry — ${subjectName}`,
        content,
        mailFormat: "html",
      }),
    },
  );

  if (!mailResponse.ok) {
    const responseText = await mailResponse.text();

    throw new Error(
      `Zoho Mail send failed (${mailResponse.status}): ${responseText.slice(
        0,
        500,
      )}`,
    );
  }
}

export async function saveEnquiry(
  request: Request,
  database: EnquiryDatabase,
  zoho?: ZohoMailConfig,
) {
  try {
    const body = await request.formData();

    if (value(body, "website", 200)) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const enquiry = {
      name: value(body, "name", 120),
      business: value(body, "business", 160),
      email: value(body, "email", 254).toLowerCase(),
      phone: value(body, "phone", 50),
      project: value(body, "project", 80),
      budget: value(body, "budget", 80),
      message: value(body, "message", 5000),
    };

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      enquiry.email,
    );

    if (
      !enquiry.name ||
      !enquiry.business ||
      !emailIsValid ||
      !PROJECT_TYPES.has(enquiry.project) ||
      !enquiry.message
    ) {
      return Response.json(
        {
          ok: false,
          message: "Please check the required fields and try again.",
        },
        { status: 400 },
      );
    }

    await database
      .prepare(
        `INSERT INTO enquiries (name, business, email, phone, project, budget, message)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        enquiry.name,
        enquiry.business,
        enquiry.email,
        enquiry.phone,
        enquiry.project,
        enquiry.budget,
        enquiry.message,
      )
      .run();

    if (zoho) {
      try {
        await sendEnquiryNotification(enquiry, zoho);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);
    
        console.error(`ZOHO ERROR: ${message}`);
      }
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save enquiry", error);

    return Response.json(
      {
        ok: false,
        message:
          "We couldn’t send your enquiry. Please try again or contact us directly.",
      },
      { status: 500 },
    );
  }
}
