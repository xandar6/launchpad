import { env } from "cloudflare:workers";
import { saveEnquiry } from "../../../lib/enquiries";

export async function POST(request: Request) {
  return saveEnquiry(request, env.DB);
}
