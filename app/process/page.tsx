import type { Metadata } from "next";
import SitePage from "../SitePage";
export const metadata: Metadata = { title: "Our Process", description: "A clear, collaborative website process from discovery and design through build, testing, and launch." };
export default function Page() { return <SitePage page="process"/>; }
