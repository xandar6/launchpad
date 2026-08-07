import type { Metadata } from "next";
import SitePage from "../SitePage";
export const metadata: Metadata = { title: "About", description: "Meet Launchpad Web Solutions, a practical digital partner for Australian small businesses." };
export default function Page() { return <SitePage page="about"/>; }
