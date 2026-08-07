"use client";

import {
  FormEvent,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

function Link(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} />;
}

export type PageKey = "home" | "services" | "industries" | "packages" | "process" | "portfolio" | "about" | "quote";

const nav = [
  ["home", "Home", "/"], ["services", "Services", "/services"],
  ["industries", "Industries", "/industries"], ["packages", "Packages", "/packages"],
  ["process", "Process", "/process"], ["portfolio", "Work", "/portfolio"],
  ["about", "About", "/about"],
] as const;

const services = [
  { n: "01", title: "Business websites", text: "Fast, polished websites that build trust and turn local searches into genuine enquiries.", tags: ["Responsive design", "SEO foundations", "Lead capture"] },
  { n: "02", title: "Website redesign", text: "A strategic refresh for websites that have fallen behind your business, brand, or customers.", tags: ["UX audit", "Content structure", "Performance"] },
  { n: "03", title: "E-commerce", text: "Clear, friction-free storefronts that make discovering, buying, and returning feel effortless.", tags: ["Product experience", "Payments", "Analytics"] },
  { n: "04", title: "Custom web solutions", text: "Practical portals, dashboards, integrations, and workflows built around how your team works.", tags: ["Automation", "Integrations", "Custom apps"] },
];

const industries = [
  ["TR", "Trades & construction", "Win better jobs with clear service areas, project proof, and fast quote pathways."],
  ["HO", "Hospitality", "Turn curious visitors into bookings with menus, atmosphere, and local discovery built in."],
  ["PR", "Professional services", "Communicate expertise without the corporate fog, and make the next step obvious."],
  ["HW", "Health & wellbeing", "Create a reassuring, accessible experience from first search through to appointment."],
  ["RM", "Retail & makers", "Bring the product story to life and remove friction between browsing and buying."],
  ["GT", "Growing teams", "Replace manual work with focused portals, dashboards, and connected systems."],
];

const packages = [
  { name: "Launch", label: "Starter", text: "A sharp online foundation for a new or focused business.", features: ["1–3 strategic pages", "Responsive design", "SEO essentials", "Enquiry form"] },
  { name: "Grow", label: "Most popular", text: "A lead-generating site for an established local business.", features: ["5–8 strategic pages", "Full on-page SEO", "Custom service pages", "Analytics setup"], featured: true },
  { name: "Scale", label: "Advanced", text: "A deeper content system for a business ready to own its market.", features: ["8–15 pages", "Insights or news", "Advanced performance", "CRM integration"] },
  { name: "Custom", label: "Tailored", text: "Digital tools designed around a unique operational challenge.", features: ["Client portals", "Dashboards", "Automated workflows", "API integrations"], dark: true },
];

function Header({ current }: { current: PageKey }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="nav-wrap">
    <Link className="brand" href="/" aria-label="Launchpad Web Solutions home"><span className="brand-mark" aria-hidden="true"><img src="/launchpad_logo.png" alt=""/></span>Launchpad</Link>
    <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
      {nav.map(([key, label, href]) => <Link key={key} className={current === key ? "active" : ""} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="button nav-cta" href="/quote" onClick={() => setOpen(false)}>Start a project <span>↗</span></Link>
    </nav>
    <button className="menu-button" type="button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}><span/><span/></button>
  </div></header>;
}

function Footer() {
  return <footer className="footer"><div className="footer-top">
    <div><Link className="brand brand-light" href="/"><span className="brand-mark" aria-hidden="true"><img src="/launchpad_logo.png" alt=""/></span>Launchpad</Link><p>Websites built to move Australian business forward.</p></div>
    <div><p className="footer-label">Explore</p>{nav.slice(1).map(([, label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
    <div><p className="footer-label">Get in touch</p><a href="mailto:info@launchpadwebsolutions.com">info@launchpadwebsolutions.com</a><a href="tel:0494759161">0494 759 161</a><p>Melbourne, Victoria, Australia</p></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Launchpad Web Solutions</span><span>Built for momentum.</span></div></footer>;
}

function OrbitVisual() {
  return <div className="orbit-visual" aria-label="A responsive website interface launching into orbit">
    <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-dot dot-one"/><div className="orbit-dot dot-two"/>
    <div className="browser-card"><div className="browser-top"><i/><i/><i/></div><div className="browser-body"><div className="mini-label"/><div className="mini-title"/><div className="mini-title short"/><div className="mini-button"/><div className="mini-stats"><b>↑</b><span>More of the right enquiries</span></div></div></div>
    <div className="phone-card"><div className="phone-speaker"/><div className="phone-shape"/><div className="phone-line"/><div className="phone-line short"/><div className="phone-button"/></div>
    <div className="launch-chip"><span aria-hidden="true"/> Ready to launch</div>
  </div>;
}

function PageHero({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text: string; dark?: boolean }) {
  return <section className={dark ? "page-hero dark" : "page-hero"}><div className="page-hero-inner"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-intro">{text}</p></div></section>;
}

function CTA({ title = "Ready to move your business forward?", text = "Tell us what you’re building. We’ll come back with a clear, practical next step." }: { title?: string; text?: string }) {
  return <section className="cta-band"><div><p className="eyebrow light">Your next move</p><h2>{title}</h2><p>{text}</p></div><Link className="button button-light" href="/quote">Start a conversation <span>↗</span></Link></section>;
}

function Home() {
  return <>
    <section className="home-hero"><div className="hero-copy"><p className="eyebrow">Web design & digital systems · Sydney</p><h1>Built to look sharp.<br/><em>Engineered to move.</em></h1><p className="hero-intro">Modern, high-performance websites for Australian businesses ready to turn attention into action.</p><div className="hero-actions"><Link className="button" href="/quote">Start your project <span>↗</span></Link><Link className="text-link" href="/portfolio">See selected work <span>→</span></Link></div><div className="trust-row"><span><b>Fast</b> by default</span><span><b>Clear</b> at every step</span><span><b>Built</b> for growth</span></div></div><OrbitVisual/></section>
    <section className="marquee" aria-label="Capabilities"><div>STRATEGY <i>✦</i> DESIGN <i>✦</i> DEVELOPMENT <i>✦</i> SEO <i>✦</i> AUTOMATION <i>✦</i> SUPPORT</div></section>
    <section className="section split-heading"><div><p className="eyebrow">What we do</p><h2>Useful websites.<br/>Nothing ornamental.</h2></div><div><p className="lead">Every decision has a job: earn trust, explain value, remove friction, or create the next opportunity.</p><Link className="text-link" href="/services">Explore all services <span>→</span></Link></div></section>
    <section className="service-strip">{services.map(s => <article className="service-card" key={s.title}><span className="card-number">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p><Link aria-label={`Learn about ${s.title}`} href="/services">↗</Link></article>)}</section>
    <section className="section proof-section"><div className="proof-panel"><p className="eyebrow light">Why Launchpad</p><h2>A practical partner,<br/>not another black box.</h2><p>Strategy in plain English. Thoughtful design. Clean builds. You’ll always know what’s happening, why it matters, and what comes next.</p><Link className="button button-light" href="/about">Meet your web partner <span>↗</span></Link></div><div className="proof-grid">{[["01","Local context","Built around the way Australian customers search, compare, and choose."],["02","Commercial clarity","We connect design decisions to useful business outcomes."],["03","Responsive craft","One considered experience across phone, tablet, and desktop."],["04","No mystery","Clear scope, sensible communication, and a site you can own."]].map(x => <div key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>
    <CTA/>
  </>;
}

function Services() {
  return <><PageHero eyebrow="Services" title="Digital work with a job to do." text="From a focused business website to a custom operational tool, we design around the outcome—not a list of fashionable features."/>
    <section className="section service-list">{services.map(s => <article key={s.title}><div className="service-index">{s.n}</div><div><h2>{s.title}</h2><p>{s.text}</p><div className="tag-row">{s.tags.map(t => <span key={t}>{t}</span>)}</div></div><Link className="round-link" href="/quote" aria-label={`Enquire about ${s.title}`}>↗</Link></article>)}</section>
    <section className="section approach"><p className="eyebrow">Built into every project</p><div className="three-col"><div><h3>Strategic structure</h3><p>Content and pathways shaped around the decisions your customers need to make.</p></div><div><h3>Technical quality</h3><p>Responsive layouts, clear semantics, quick loading, and a clean search foundation.</p></div><div><h3>Confident handover</h3><p>Clear ownership, practical training, and support that doesn’t disappear at launch.</p></div></div></section><CTA/>
  </>;
}

function Industries() {
  return <><PageHero eyebrow="Industries" title="Different businesses need different websites." text="A plumber does not need the same experience as a café or consulting firm. We build around the realities of your work and your customers." dark/>
    <section className="section industry-grid">{industries.map(([mark,title,text]) => <article key={title}><span>{mark}</span><h2>{title}</h2><p>{text}</p><Link href="/quote">Talk about your industry →</Link></article>)}</section>
    <section className="section quote-panel"><blockquote>“The right website doesn’t just describe the business. It makes choosing the business feel easy.”</blockquote><p>That principle stays the same in every sector.</p></section><CTA title="Don’t see your industry?" text="Good. We’d rather learn how your business actually works than force it into a predefined box."/>
  </>;
}

function Packages() {
  return <><PageHero eyebrow="Packages" title="A clear place to start. A flexible way to grow." text="Choose the foundation that best matches where your business is today. We’ll shape the final scope around what will make the biggest difference."/>
    <section className="package-grid">{packages.map(p => <article className={`${p.featured ? "featured " : ""}${p.dark ? "package-dark" : ""}`} key={p.name}><p className="package-label">{p.label}</p><h2>{p.name}</h2><p>{p.text}</p><ul>{p.features.map(f => <li key={f}><span>✓</span>{f}</li>)}</ul><Link className={p.dark ? "button button-light" : "button"} href={`/quote?package=${p.name.toLowerCase()}`}>Enquire about {p.name} <span>↗</span></Link></article>)}</section>
    <section className="section care"><div><p className="eyebrow">After launch</p><h2>Care plans that keep things moving.</h2></div><div className="care-list">{[["Essential care","Security, updates, backups, and uptime oversight."],["Growth care","Ongoing improvements, reporting, and content support."],["Priority care","Faster support and a regular improvement rhythm."]].map(x => <p key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></p>)}</div></section><CTA/>
  </>;
}

function Process() {
  const steps = [["01","Discover","We get clear on your customers, offer, goals, and what success needs to look like."],["02","Structure","We map the content and user journeys so every page has a job and every click has purpose."],["03","Design","We shape a distinctive responsive experience around your brand—not a recycled template."],["04","Build","We develop cleanly, connect the essentials, and tune the experience for speed and search."],["05","Refine","We test across screen sizes, review together, and resolve the details that make it feel finished."],["06","Launch","We handle the final checks and handover, then stay close while your new site finds its feet."]];
  return <><PageHero eyebrow="Our process" title="No mystery. Just momentum." text="A calm, collaborative process that keeps decisions clear, progress visible, and the work moving in the right direction." dark/>
    <section className="section process-list">{steps.map(([n,title,text]) => <article key={n}><span>{n}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
    <section className="section process-note"><p className="eyebrow">How we work together</p><h2>Focused communication.<br/>Fewer loose ends.</h2><div><p>You’ll have clear milestones, concise feedback rounds, and a single view of what’s decided and what comes next.</p><p>We’ll bring recommendations, explain trade-offs, and keep jargon out of the way.</p></div></section><CTA/>
  </>;
}

function Portfolio() {
  const work = [["Trades platform","Harbour Trade Co.","A sharper path from urgent search to qualified enquiry.","work-one","+62% enquiry quality"],["Professional services","Northline Studio","A confident editorial presence built around expertise.","work-two","2.1× longer visits"],["E-commerce","Grain & Co.","A warm storefront that makes local craft easy to buy.","work-three","+38% checkout rate"],["Custom dashboard","Axis Logistics","Operational complexity turned into one clear daily view.","work-four","11 hrs saved weekly"]];
  return <><PageHero eyebrow="Selected work" title="Digital experiences built for real-world momentum." text="A selection of concepts showing how strategy, identity, and utility can meet in one focused experience."/>
    <section className="work-grid">{work.map(([type,title,result,cls,metric]) => <article key={title} className={cls}><div className="work-visual"><div className="mock-window"><i/><i/><i/><div className="mock-layout"><span/><b/><em/></div></div></div><div className="work-copy"><p className="eyebrow">{type}</p><h2>{title}</h2><p>{result}</p><strong>{metric}</strong></div></article>)}</section>
    <p className="concept-note">Concept portfolio shown for demonstration. Project names and performance figures are illustrative.</p><CTA title="Your project could be next." text="Bring the challenge. We’ll help shape the clearest way forward."/>
  </>;
}

function About() {
  return <><PageHero eyebrow="About Launchpad" title="Small enough to care. Experienced enough to guide." text="Launchpad partners with Australian trades, services, and growing teams to create websites that work as hard as they do." dark/>
    <section className="section story"><div><p className="eyebrow">Our point of view</p><h2>Good web work should make business feel simpler.</h2></div><div><p className="lead">Too many websites begin with decoration. We begin with the decision your customer is trying to make—and the confidence they need to make it.</p><p>That means listening closely, challenging gently, writing clearly, and designing with intent. The result is not just a better-looking website. It is a more useful piece of your business.</p></div></section>
    <section className="values">{[["01","Clarity over clutter","We earn attention through hierarchy and relevance, not noise."],["02","Useful over impressive","The work can be beautiful, but it always needs to perform."],["03","Partnership over theatre","Plain language, honest recommendations, and shared decisions."],["04","Momentum over perfectionism","Thoughtful progress, clear feedback, and a strong finish."]].map(x => <article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</section><CTA/>
  </>;
}

function Quote() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/enquiries", { method: "POST", body: new FormData(form) });
      const result = await response.json().catch(() => null) as { message?: string } | null;
      if (!response.ok) throw new Error(result?.message || "We couldn’t send your enquiry. Please try again.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t send your enquiry. Please try again.");
      setStatus("error");
    }
  }
  return <><PageHero eyebrow="Start a project" title="Tell us where you want to go." text="Share a little about the business, the challenge, and what a successful project would change. We’ll reply with a practical next step."/>
    <section className="quote-layout"><aside><p className="eyebrow">What happens next</p><ol>{[["1","We read every detail","A real person reviews your enquiry."],["2","We arrange a short call","We clarify the goals, timing, fit, and likely path."],["3","You get a clear proposal","Defined scope, investment, timing, and no surprises."]].map(x => <li key={x[0]}><span>{x[0]}</span><div><b>{x[1]}</b><p>{x[2]}</p></div></li>)}</ol><div className="contact-card"><a href="mailto:info@launchpadwebsolutions.com">info@launchpadwebsolutions.com</a><a href="tel:0494759161">0494 759 161</a><p>Melbourne, Victoria, Australia</p></div></aside>
      <form className="quote-form" onSubmit={submit}><div className="field-grid"><label>Full name *<input name="name" required maxLength={120} autoComplete="name"/></label><label>Business name *<input name="business" required maxLength={160} autoComplete="organization"/></label><label>Email *<input name="email" type="email" required maxLength={254} autoComplete="email"/></label><label>Phone<input name="phone" type="tel" maxLength={50} autoComplete="tel"/></label><label>Project type *<select name="project" required defaultValue=""><option value="" disabled>Select one</option><option>New business website</option><option>Website redesign</option><option>E-commerce</option><option>Custom web solution</option><option>Not sure yet</option></select></label><label>Indicative budget<select name="budget" defaultValue=""><option value="">Prefer to discuss</option><option>$2,000–$4,000</option><option>$4,000–$6,000</option><option>$6,000–$8,000</option><option>$8,000–$10,000</option></select></label></div><label>What would you like this project to achieve? *<textarea name="message" rows={6} required maxLength={5000} placeholder="A little context goes a long way…"/></label><label className="form-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><button className="button submit-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending enquiry…" : "Send my enquiry"} <span>↗</span></button><p className="form-note">Your details are sent securely to Launchpad. We’ll use them only to respond to your enquiry.</p><div className="form-status" aria-live="polite">{status === "success" && <p className="success" role="status">Thanks — your enquiry has been sent. We’ll be in touch with a practical next step.</p>}{status === "error" && <p className="error" role="alert">{error}</p>}</div></form>
    </section></>;
}

export default function SitePage({ page }: { page: PageKey }) {
  const content = page === "home" ? <Home/> : page === "services" ? <Services/> : page === "industries" ? <Industries/> : page === "packages" ? <Packages/> : page === "process" ? <Process/> : page === "portfolio" ? <Portfolio/> : page === "about" ? <About/> : <Quote/>;
  return <><a className="skip-link" href="#main">Skip to content</a><Header current={page}/><main id="main">{content}</main><Footer/></>;
}
