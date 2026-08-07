import type { Metadata } from "next";
import SitePage from "../SitePage";
export const metadata: Metadata = { title: "Website Packages", description: "Flexible website packages for new, established, and growing Australian businesses." };
export default function Page() { return <SitePage page="packages"/>; }
