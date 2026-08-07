import Link from "next/link";
export default function NotFound() { return <main className="not-found"><p className="eyebrow">404 · Off course</p><h1>That page didn’t make the flight.</h1><p>Let’s get you back to solid ground.</p><Link className="button" href="/">Return home <span>↗</span></Link></main>; }
