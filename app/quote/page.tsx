import type { Metadata } from "next";
import SitePage from "../SitePage";
export const metadata: Metadata = { title: "Start a Project", description: "Tell Launchpad Web Solutions about your website or custom web project." };
export default function Page() { return <SitePage page="quote"/>; }
