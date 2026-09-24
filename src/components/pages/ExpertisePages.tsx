"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type Slug = "expertise" | "healthcare" | "consumer" | "personal-care" | "lighting-appliances-automotive" | `healthcare/${string}`;

const C = {
  blue: "#497f97",
  lime: "#a1bf55",
  orange: "#dc8553",
  green: "#245b36",
};

function Placeholder({ label, color = "#e4e6e7", className = "" }: { label: string; color?: string; className?: string }) {
  return <div role="img" aria-label={`${label} image placeholder`} className={`relative flex min-h-64 items-center justify-center overflow-hidden rounded-2xl ${className}`} style={{ backgroundColor: color }}>
    <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/20" />
    <div className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-black/5" />
    <span className="relative max-w-56 text-center text-sm font-semibold tracking-wide text-black/30">{label}</span>
  </div>;
}

function Hero({ title, statement, color, media }: { title: string; statement: string; color: string; media: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-title", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(".hero-statement", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-media", { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.9 }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, [title]);
  return <section ref={root} className="relative flex min-h-[480px] items-center overflow-hidden text-white md:min-h-[480px]" style={{ backgroundColor: color }}>
    <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-0">
      <div className="z-10">
        <h1 className="hero-title mb-4 max-w-[580px] text-[28px] font-extrabold uppercase leading-[1.2] tracking-wide text-white/85 md:text-[30px]">{title}</h1>
        <p className="hero-statement max-w-[620px] text-[38px] font-extrabold leading-[1.18] md:text-[46px]">{statement}</p>
      </div>
      <Placeholder label={media} color={color} className="hero-media h-[320px] rounded-none border border-white/10 opacity-40 md:h-[400px]" />
    </div>
  </section>;
}

function Button({ href, children = "Find out more" }: { href: string; children?: ReactNode }) {
  return <a href={href} className="mt-5 inline-flex min-h-9 items-center rounded-full bg-[#555] px-4 py-2 text-[14px] font-bold text-white transition-colors hover:bg-[#12018A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12018A]">{children}</a>;
}

function Feature({ title, children, media, mediaColor, href, button, shaded = false }: { title: string; children: ReactNode; media: string; mediaColor?: string; href?: string; button?: string; shaded?: boolean }) {
  return <section className={`expertise-reveal py-12 md:py-14 ${shaded ? "bg-[#f7f7f8]" : "bg-white"}`}>
    <div className="mx-auto grid max-w-[1280px] gap-10 px-4 md:grid-cols-2 md:gap-12">
      <div>
        <h2 className="mb-6 text-[42px] font-extrabold leading-tight text-[#565656] md:text-[44px]">{title}</h2>
        <div className="max-w-[590px] space-y-4 text-[16px] leading-[1.55] text-[#555]">{children}</div>
        {href && <Button href={href}>{button}</Button>}
      </div>
      <Placeholder label={media} color={mediaColor} className="h-[360px] w-full md:h-[370px]" />
    </div>
  </section>;
}

function InfoGrid({ title, items, round = false }: { title: string; items: { title: string; text: string }[]; round?: boolean }) {
  return <section className="expertise-reveal mx-auto max-w-[1280px] px-4 py-14 text-center">
    <h2 className="mb-12 text-[31px] font-extrabold text-[#565656]">{title}</h2>
    <div className="grid gap-x-9 gap-y-12 md:grid-cols-3">
      {items.map((item, i) => <div key={item.title} className="flex flex-col items-center">
        <Placeholder label={item.title} color={["#e4e8e8", "#d6e8ef", "#e8e2d9", "#e3e5e4"][i % 4]} className={round ? "mb-5 aspect-square min-h-0 w-full max-w-[280px] rounded-full" : "mb-5 aspect-[4/3] min-h-0 w-full"} />
        <h3 className="mb-3 text-[18px] font-extrabold text-[#555]">{item.title}</h3>
        <p className="text-[15px] leading-relaxed text-[#555]">{item.text}</p>
      </div>)}
    </div>
  </section>;
}

function Clients({ title, names }: { title: string; names: string[] }) {
  return <section className="expertise-reveal mx-auto max-w-[1280px] px-4 py-12 text-center">
    <h2 className="mb-10 text-[27px] font-extrabold text-[#555]">{title}</h2>
    <div className="flex flex-wrap justify-center gap-4">{names.map(name => <div key={name} className="flex h-[105px] w-[175px] items-center justify-center rounded-xl border border-[#ececec] px-3 text-lg font-semibold text-[#737b84]">{name}</div>)}</div>
  </section>;
}

const consumerCapabilities = [
  { title: "Product Design", text: "Design support for precision plastic components, from initial concepts through manufacturable product details." },
  { title: "Rapid Prototyping", text: "Prototype development to evaluate fit, form and function before committing to production tooling." },
  { title: "Precision Mould Manufacturing", text: "Mould design and manufacturing for demanding consumer and engineering applications." },
  { title: "Mould Testing", text: "Testing and qualification to validate mould performance and support dependable production." },
  { title: "Quality Management", text: "Our ISO 9001:2015 certified quality management system supports consistent precision work." },
  { title: "Mass-production Support", text: "Support for the transition from approved tooling to repeatable mass production." },
];

const personalCapabilities = [
  { title: "Injection molding", text: "Precision injection moulding support for demanding component geometries and finishes." },
  { title: "Mold manufacturing", text: "Our precision mould design, manufacturing, testing and qualification services support accurate components." },
  { title: "Rapid prototyping", text: "Evaluate product concepts and improve details before mould manufacture." },
  { title: "Mould design", text: "Tool design considers precision, repeatability and efficient production." },
  { title: "Mould testing", text: "Validate mould behaviour and component output before qualification." },
  { title: "Mould qualification", text: "Structured qualification helps establish production readiness." },
  { title: "Product design", text: "Translate product requirements into mouldable, functional components." },
  { title: "Mass-production support", text: "Support the move from qualified tooling to repeatable production." },
  { title: "Quality management", text: "ISO 9001:2015 certified quality management supports our work." },
];

const healthcareLinks = [
  ["Healthcare", "/healthcare"],
  ["Platform Devices", "/healthcare/platform-devices"],
  ["Drug Delivery", "/healthcare/drug-delivery-devices"],
  ["Medical Components", "/healthcare/primary-packaging"],
  ["Mould Development", "/healthcare/healthcare-facility"],
  ["Product Design", "/healthcare/product-design"],
  ["Quality & Compliance", "/healthcare/quality"],
] as const;

function HealthcareNav({ active }: { active: string }) {
  return <nav aria-label="Healthcare sections" className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-[#575756] px-4 py-4 text-[14px] font-normal text-white md:justify-center">
    {healthcareLinks.map(([label, url]) => <a key={url} href={url} aria-current={url === active ? "page" : undefined} className={`${url === active ? "font-bold" : "font-normal"} hover:underline`}>{label}</a>)}
  </nav>;
}

function Healthcare() {
  return <>
    <HealthcareNav active="/healthcare" />
    <Hero title="Healthcare" statement="Innovative devices for global health" color={C.orange} media="Healthcare devices" />
    <Feature title="Platform Devices" media="Platform devices" mediaColor="#a1bf55" href="/healthcare/platform-devices" button="Browse our platform devices">
      <p className="text-xl">Advancing medical device concepts with precision tooling.</p>
      <p>Pen injectors are a strategic growth platform for Elite. Our product design, prototyping and mould development capabilities can support the journey from concept through testing and qualification.</p>
      <a className="font-semibold text-[#12018A] hover:underline" href="/healthcare/product-design">Read more about our product development services.</a>
    </Feature>
    <Feature title="Drug Delivery Development" media="Drug delivery devices" mediaColor="#497f97" href="/healthcare/drug-delivery-devices">
      <p className="text-xl">Precision engineering for emerging drug delivery opportunities.</p>
      <p>Our focus on medical pen injectors brings product design, rapid prototyping and precision mould development together as a strategic platform for future growth.</p>
    </Feature>
    <Feature title="Precision Mould Development" media="Healthcare tooling" mediaColor="#245b36" href="/healthcare/healthcare-facility">
      <p>Elite has designed and manufactured precision injection moulds since 2003. Our work spans product design, rapid prototyping, mould design, manufacturing, testing and qualification, with support for mass production.</p>
    </Feature>
    <Feature title="Quality & Compliance" media="Quality control" mediaColor="#d8dadd" href="/healthcare/quality">
      <p>Elite is ISO 9001:2015 certified. Quality management is central to the precision mould development process, from design through testing and qualification.</p>
    </Feature>
    <Feature title="Medical Components" media="Healthcare components" mediaColor={C.orange} href="/healthcare/primary-packaging" shaded>
      <p>Our precision injection mould expertise supports the development of detailed components for healthcare and medical applications.</p>
    </Feature>
    <Clients title="Healthcare and Medical" names={["Product design", "Rapid prototyping", "Mould development", "Testing", "Qualification"]} />
  </>;
}

const healthcareSubpages: Record<string, {
  title: string;
  statement: string;
  media: string;
  sections: { title: string; text: string; media: string; color?: string }[];
  grid?: { title: string; items: { title: string; text: string }[] };
}> = {
  "platform-devices": {
    title: "Platform Devices",
    statement: "Precision development for future drug delivery platforms",
    media: "Medical device concepts",
    sections: [
      { title: "Medical pen injectors", text: "Medical pen injectors are a strategic growth platform for Elite. Our established strengths in product design, rapid prototyping and precision injection mould development provide a foundation for this work.", media: "Pen injector concept", color: C.lime },
      { title: "From concept to qualification", text: "A considered development process brings together product requirements, manufacturability, tooling, testing and qualification. Elite supports these stages with its precision mould expertise.", media: "Precision device component", color: C.blue },
    ],
    grid: { title: "Development Capabilities", items: [
      { title: "Product design", text: "Develop a functional component concept with mouldability in mind." },
      { title: "Rapid prototyping", text: "Evaluate physical concepts before production tooling." },
      { title: "Mould qualification", text: "Test and qualify tooling for repeatable outcomes." },
    ] },
  },
  "drug-delivery-devices": {
    title: "Drug Delivery Development",
    statement: "Engineering concepts for medical pen injectors",
    media: "Drug delivery device concept",
    sections: [
      { title: "Precision for emerging devices", text: "Elite sees medical pen injectors as a strategic area of growth. Our experience in precision injection mould design and manufacturing can support development of the intricate plastic components these concepts require.", media: "Injector component concept", color: C.blue },
      { title: "A connected development process", text: "Product design, rapid prototyping, mould design and manufacture, testing and qualification form a connected path from an initial concept toward production readiness.", media: "Collaborative mould design", color: C.orange },
    ],
    grid: { title: "Our Development Capabilities", items: [
      { title: "Design review", text: "Review product requirements and manufacturability from the outset." },
      { title: "Precision moulds", text: "Develop moulds for components with demanding geometry and fit." },
      { title: "Testing and qualification", text: "Validate tooling and component output against project requirements." },
      { title: "Production support", text: "Support transfer from approved tooling toward repeatable production." },
    ] },
  },
  "healthcare-facility": {
    title: "Precision Mould Development",
    statement: "Supporting healthcare concepts with engineering precision",
    media: "Precision mould manufacturing",
    sections: [
      { title: "Infrastructure", text: "Since 2003, Elite has focused on precision injection moulds. Our work spans mould design, manufacturing, testing and qualification for customers across FMCG, healthcare and engineering markets.", media: "Mould manufacturing", color: C.blue },
      { title: "Product Development", text: "Product design and rapid prototyping allow teams to explore component form, fit and manufacturability before completing production tooling.", media: "Prototype development", color: C.lime },
      { title: "Quality Assurance", text: "Our ISO 9001:2015 certified quality management system supports a consistent approach to precision work, testing and qualification.", media: "Precision inspection", color: C.orange },
      { title: "Production Readiness", text: "Elite supports the move from qualified moulds to repeatable mass production, keeping component requirements in focus across the process.", media: "Production support", color: C.green },
    ],
  },
  "primary-packaging": {
    title: "Medical Components",
    statement: "Precision tooling for detailed plastic components",
    media: "Medical component concepts",
    sections: [
      { title: "Component development", text: "Elite can support product design and precision mould development for detailed healthcare and medical components. Each project begins with its specific functional and manufacturing requirements.", media: "Component prototypes", color: C.orange },
      { title: "Design for manufacture", text: "Rapid prototyping, mould design, testing and qualification help turn a component concept into a production-ready tool.", media: "Precision mould", color: C.blue },
    ],
    grid: { title: "Development Process", items: [
      { title: "Design", text: "Define component form and manufacturing requirements." },
      { title: "Prototype", text: "Test concepts before final tooling." },
      { title: "Mould", text: "Design and manufacture precision injection moulds." },
      { title: "Qualify", text: "Test and qualify the mould and component output." },
    ] },
  },
  "quality": {
    title: "Quality & Compliance",
    statement: "Quality through each stage of mould development",
    media: "Quality inspection",
    sections: [
      { title: "Quality management", text: "Elite is ISO 9001:2015 certified. Our quality management system supports precision injection mould development from design through manufacture, testing and qualification.", media: "Quality management", color: C.blue },
      { title: "Mould life cycle", text: "Product design, rapid prototyping, mould design, manufacture and qualification each contribute to reliable production readiness.", media: "Mould testing", color: C.lime },
      { title: "Testing and qualification", text: "Mould testing and qualification provide a structured way to validate component requirements before mass-production support.", media: "Component inspection", color: C.orange },
    ],
  },
  "product-design": {
    title: "Product Design",
    statement: "From concepts to precision production tooling",
    media: "Product design concepts",
    sections: [
      { title: "Crafted concepts", text: "Elite combines product design and rapid prototyping with precision injection mould expertise. This helps teams refine a concept while accounting for how its components will be made.", media: "Product concept", color: C.blue },
      { title: "Mould development", text: "Our process continues through mould design, manufacturing, testing and qualification, with support for mass-production readiness.", media: "Mould design", color: C.green },
      { title: "Medical device direction", text: "Medical pen injectors are an important strategic growth platform for Elite. Precision tooling and design expertise underpin this developing direction.", media: "Medical device concept", color: C.orange },
    ],
  },
};

function HealthcareSubpage({ page }: { page: string }) {
  const data = healthcareSubpages[page];
  if (!data) return null;
  return <>
    <HealthcareNav active={`/healthcare/${page}`} />
    <Hero title={data.title} statement={data.statement} color={C.orange} media={data.media} />
    {data.sections.map((section, i) => <Feature key={section.title} title={section.title} media={section.media} mediaColor={section.color} shaded={i % 2 === 1}><p>{section.text}</p></Feature>)}
    {data.grid && <InfoGrid title={data.grid.title} items={data.grid.items} round />}
  </>;
}

function Consumer() {
  return <>
    <Hero title="Consumer" statement="Creating safe, reliable and attractive plastics for families and homes" color={C.green} media="Homeware products" />
    <Feature title="Homeware" media="Homeware brushes" mediaColor="#d4e8f0" href="/capabilities" button="Explore capabilities">
      <p>Elite supports consumer and FMCG product development with precision injection mould design and manufacturing. From early product concepts to qualification, our process is built around accurate, repeatable tooling.</p>
      <p>Our ISO 9001:2015 certified <a className="font-semibold text-[#12018A] hover:underline" href="/quality">quality management system</a> supports consistent work across each stage.</p>
    </Feature>
    <Feature title="Precision consumer tooling" media="Consumer product tooling" mediaColor="#f4f4f4" href="/capabilities" button="Explore capabilities" shaded>
      <p>Since 2003, Elite has developed precision injection moulds for products across several sectors, including FMCG.</p>
      <p>Our services include product design, rapid prototyping and mould design, manufacturing, testing and qualification.</p>
      <p>We also support the move from qualified tooling to mass production.</p>
    </Feature>
    <InfoGrid title="Facilities and Capabilities" items={consumerCapabilities} round />
  </>;
}

function PersonalCare() {
  return <>
    <Hero title="Beauty and Personal Care" statement="Transforming packaging, enhancing brands" color={C.blue} media="Beauty and personal care products" />
    <Feature title="Beauty and cosmetics" media="Beauty and cosmetics packaging" mediaColor="#d9e8ef">
      <p>Elite develops precision injection moulds for consumer and FMCG applications, including detailed components used in personal care products.</p>
      <p>Product design and rapid prototyping help assess form and function before mould design, manufacture and qualification.</p>
    </Feature>
    <Feature title="Personal care" media="Personal care razor handles" mediaColor="#eff0f1" shaded>
      <p>Our mould development process supports precise, repeatable components for personal care concepts.</p>
      <p>Elite can provide support from early product design through prototyping, mould qualification and mass-production readiness.</p>
    </Feature>
    <InfoGrid title="Our Capabilities for Beauty and Personal Care Brands" items={personalCapabilities} round />
    <Clients title="Beauty and Personal Care" names={["Product design", "Rapid prototyping", "Precision moulds", "Qualification"]} />
  </>;
}

function Lighting() {
  return <>
    <Hero title="Lighting, Appliances and Automotive" statement="Ultra-performance plastics for ultimate reliability in critical components" color={C.lime} media="Lighting and industrial components" />
    <Feature title="Lighting" media="LED light casings" mediaColor="#dce1e2">
      <p>Elite&apos;s precision injection moulding capabilities can support engineered plastic components for lighting products and assemblies.</p>
    </Feature>
    <Feature title="Appliances" media="Appliance knobs" mediaColor="#e9eaeb" shaded>
      <p>Our work in engineering and consumer product tooling can support components for appliance concepts. We provide product design, prototyping, mould manufacture, testing and qualification.</p>
    </Feature>
    <Feature title="Automotive" media="Automotive components" mediaColor="#d6d9dc">
      <p>Elite&apos;s engineering sector experience includes precision injection mould development for demanding component requirements. Our ISO 9001:2015 certified quality system supports each project stage.</p>
    </Feature>
    <Clients title="Engineering Capabilities" names={["Product design", "Precision moulds", "Mould testing", "Qualification"]} />
  </>;
}

function ExpertiseIndex() {
  const entries = [
    { title: "Trusted", text: "Precision injection mould development since 2003.", href: "/about" },
    { title: "Quality", text: "An ISO 9001:2015 certified quality management system supports every stage of our work.", href: "/quality" },
    { title: "Development", text: "From product design and rapid prototyping to mould testing and qualification.", href: "/capabilities" },
    { title: "Precision", text: "Precision mould design and manufacturing for FMCG, medical and engineering applications.", href: "/capabilities" },
  ];
  return <section className="mx-auto grid max-w-[1280px] gap-7 px-4 py-12 md:grid-cols-4 md:py-12">
    {entries.map((entry, i) => <a href={entry.href} key={entry.title} className="expertise-reveal block text-center text-[#565656] hover:text-[#12018A]">
      <Placeholder label={entry.title} color={["#edf1f4", "#dae6e9", "#e6ebdf", "#e2e2e2"][i]} className="mb-5 h-[194px] min-h-0 w-full" />
      <h3 className="mb-6 text-[29px] font-extrabold">{entry.title}</h3>
      <p className="text-[17px] leading-[1.45]">{entry.text}</p>
    </a>)}
  </section>;
}

export function ExpertisePage({ slug }: { slug: Slug | string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".expertise-reveal", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power2.out", clearProps: "all" });
    }, root);
    return () => ctx.revert();
  }, [slug]);
  return <div ref={root} className="w-full overflow-hidden bg-white">
    {slug === "expertise" ? <ExpertiseIndex /> : slug === "healthcare" ? <Healthcare /> : slug.startsWith("healthcare/") ? <HealthcareSubpage page={slug.slice("healthcare/".length)} /> : slug === "consumer" ? <Consumer /> : slug === "personal-care" ? <PersonalCare /> : slug === "lighting-appliances-automotive" ? <Lighting /> : null}
  </div>;
}

export default ExpertisePage;
