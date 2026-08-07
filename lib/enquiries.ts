type EnquiryDatabase = {
  prepare(query: string): {
    bind(...values: string[]): { run(): Promise<unknown> };
  };
};

const PROJECT_TYPES = new Set([
  "New business website",
  "Website redesign",
  "E-commerce",
  "Custom web solution",
  "Not sure yet",
]);

function value(body: FormData, key: string, maxLength: number) {
  const entry = body.get(key);
  return typeof entry === "string" ? entry.trim().slice(0, maxLength) : "";
}

export async function saveEnquiry(request: Request, database: EnquiryDatabase) {
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

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email);
    if (!enquiry.name || !enquiry.business || !emailIsValid || !PROJECT_TYPES.has(enquiry.project) || !enquiry.message) {
      return Response.json({ ok: false, message: "Please check the required fields and try again." }, { status: 400 });
    }

    await database.prepare(
      `INSERT INTO enquiries (name, business, email, phone, project, budget, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      enquiry.name,
      enquiry.business,
      enquiry.email,
      enquiry.phone,
      enquiry.project,
      enquiry.budget,
      enquiry.message,
    ).run();

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save enquiry", error);
    return Response.json(
      { ok: false, message: "We couldn’t send your enquiry. Please try again or contact us directly." },
      { status: 500 },
    );
  }
}
