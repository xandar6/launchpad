import { env } from "cloudflare:workers";
import {
  saveEnquiry,
  type ZohoMailConfig,
} from "../../../lib/enquiries";

type RuntimeEnv = typeof env & {
  ZOHO_CLIENT_ID: string;
  ZOHO_CLIENT_SECRET: string;
  ZOHO_REFRESH_TOKEN: string;
  ZOHO_ACCOUNT_ID: string;
  ZOHO_FROM_ADDRESS: string;
  ZOHO_TO_ADDRESS: string;
};

export async function POST(request: Request) {
  const runtimeEnv = env as RuntimeEnv;

  const zoho: ZohoMailConfig = {
    clientId: runtimeEnv.ZOHO_CLIENT_ID,
    clientSecret: runtimeEnv.ZOHO_CLIENT_SECRET,
    refreshToken: runtimeEnv.ZOHO_REFRESH_TOKEN,
    accountId: runtimeEnv.ZOHO_ACCOUNT_ID,
    fromAddress: runtimeEnv.ZOHO_FROM_ADDRESS,
    toAddress: runtimeEnv.ZOHO_TO_ADDRESS,
  };

  return saveEnquiry(request, runtimeEnv.DB, zoho);
}
