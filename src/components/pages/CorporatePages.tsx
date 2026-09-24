"use client";

import { useState, type FormEvent } from "react";
import { BriefcaseBusiness, ChevronDown, ChevronRight, Clock3, UsersRound } from "lucide-react";

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return <div role="img" aria-label={`${label} placeholder`} className={`relative overflow-hidden bg-[#dce5e7] ${className}`}><div className="absolute inset-0 bg-gradient-to-br from-[#d6dedf] via-[#abbfc5] to-[#668b98]"/><div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(110deg, transparent 45%, white 45%, white 46%, transparent 46%), linear-gradient(25deg, transparent 53%, #426879 53%, #426879 54%, transparent 54%)", backgroundSize: "180px 180px" }}/><span className="sr-only">{label}</span></div>;
}

function PhotoHero({ title, label }: { title: string; label: string }) {
  return <section className="relative h-[35vw] min-h-[340px] max-h-[540px]"><Placeholder label={label} className="absolute inset-0"/><div className="absolute inset-0 bg-black/25"/><h1 className="absolute left-[1.2%] top-[10%] text-[clamp(2.5rem,3.6vw,4.5rem)] font-extrabold leading-none text-white">{title}</h1></section>;
}

const careerStories = [
  ["A Legacy of Excellence", "Elite Precision Technologies brings precision and care to the manufacturing of engineered components. Our work is grounded in the people and processes that make consistent quality possible.", "machinery"],
  ["Built on Engineering, Driven by People", "We bring technical skill, problem solving, and close collaboration to every project. The people behind each process help turn demanding ideas into reliable products.", "employee working"],
  ["Invent the Future, One Idea at a Time", "Innovation starts with curiosity. Our teams are encouraged to ask what can be improved and find practical ways to make it happen.", "female employees"],
  ["People First, Always", "Our people are central to our work. We value safe working conditions, learning, and respect across every team.", "doctor and employee"],
  ["Certified to Lead, Committed to Excel", "Quality and care guide our engineering and manufacturing approach. We continue to improve our processes and the experience of the people we work with.", "awards"],
  ["Globally Connected, Locally Rooted", "From our base in Hyderabad, our teams work together to meet the needs of customers and partners.", "employees"],
] as const;

const jobs = [
  { title: "Explore opportunities at Elite", years: "Enquire", openings: "Open application", href: "/careers/opportunities" },
];

function CareersPage({ slug }: { slug: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const selectedJob = jobs.find(job => slug.includes(job.href.slice(1)));
  if (selectedJob) return <div className="mx-auto max-w-[850px] px-5 py-20 text-[#555]"><a href="/careers" className="text-[#12018A]">← Careers</a><h1 className="mt-8 text-4xl font-bold">{selectedJob.title}</h1><p className="mt-5 flex flex-wrap gap-6"><span>{selectedJob.years}</span><span>full-time</span><span>{selectedJob.openings}</span></p><p className="mt-10">Apply for this position</p><a className="mt-5 inline-block rounded-full bg-[#12018A] px-8 py-3 font-bold text-white" href="mailto:info@elitetechindia.com">Apply now</a></div>;
  return <main className="text-[#555]">
    <PhotoHero title="Careers" label="Careers team hero" />
    <div className="mx-auto max-w-[850px] px-4 py-12 md:py-14">{careerStories.map(([title, text, media], i) => <section key={title} className={`mb-14 grid items-start gap-10 md:grid-cols-[1.25fr_.75fr] ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}><div><h2 className="mb-4 text-[29px] font-extrabold leading-tight">{title}</h2><p className="text-[17px] leading-[1.55]">{text}</p></div><Placeholder label={media} className="aspect-[1.45] rounded-2xl shadow-lg"/></section>)}
      <section className="pb-16 pt-8"><h2 className="text-[30px] font-extrabold">Ready to Shape the Future with Us?</h2><p className="mt-4 text-[17px] leading-relaxed">If you're passionate about engineering and making a real impact, explore opportunities to join Elite Precision Technologies.</p><div className="mt-12">{jobs.map((job, i) => <div key={job.title} className="border-b border-[#777] first:border-t"><button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-start justify-between py-4 text-left"><span><strong className={`block text-[19px] ${open === i ? "text-[#12018A]" : ""}`}>{job.title}</strong><span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[16px]"><span className="flex items-center gap-1"><Clock3 size={17}/>{job.years}</span><span className="flex items-center gap-1"><BriefcaseBusiness size={17}/>full-time</span><span className="flex items-center gap-1"><UsersRound size={17}/>{job.openings}</span></span></span><ChevronDown size={20} className={`mt-1 transition-transform ${open === i ? "rotate-180" : ""}`}/></button>{open === i && <div className="pb-5 pt-3"><a href={job.href} className="inline-block rounded-full bg-[#12018A] px-4 py-2 text-[14px] font-bold text-white hover:bg-[#0b0060]">Apply now</a></div>}</div>)}</div></section>
    </div>
  </main>;
}

const locations = [
  { heading: "Contact Details", lines: ["Elite Precision Technologies Pvt. Ltd."], email: "info@elitetechindia.com" },
  { heading: "Registered Office", lines: ["Plot No. 87/9 & 87/11, S.No. 374, IDA Kukatpally, Gandhinagar, Balanagar, Hyderabad – 500037"] },
  { heading: "Website", lines: ["www.elitetechindia.com"] },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <main className="text-[#555]"><PhotoHero title="Contact" label="Industrial facility aerial view"/><div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 md:grid-cols-[40%_1fr]"><div className="space-y-8">{[locations.slice(0,1),locations.slice(1,2),locations.slice(2)].map((group, i) => <div key={i} className="rounded-2xl bg-[#f6f6f8] p-5">{group.map(loc => <div key={loc.heading} className="mb-5 last:mb-0"><h2 className="mb-5 text-[21px] font-extrabold">{loc.heading}</h2>{loc.lines.map(line => <p key={line} className="mb-3 text-[17px] leading-relaxed">{line}</p>)}{loc.email && <a href={`mailto:${loc.email}`} className="font-bold text-[#12018A]">{loc.email}</a>}</div>)}</div>)}</div><form onSubmit={submit} className="space-y-4">{["Name", "Company", "Phone", "Email"].map(field => <label key={field} className="block text-[15px] font-bold">{field}<input required={field === "Name" || field === "Email"} type={field === "Email" ? "email" : field === "Phone" ? "tel" : "text"} className="mt-3 block h-[39px] w-full rounded border border-[#d3d3d3] bg-white px-3 font-normal outline-none focus:border-[#12018A]" /></label>)}<label className="block text-[15px] font-bold">Business Unit<select className="mt-3 block h-[39px] w-full rounded border border-[#d3d3d3] bg-white px-3 font-normal"><option>Precision Engineering</option><option>Manufacturing</option><option>General Enquiry</option></select></label><label className="block text-[15px] font-bold">Feedback or Enquiry<textarea required rows={12} className="mt-3 block w-full rounded border border-[#d3d3d3] bg-white p-3 font-normal outline-none focus:border-[#12018A]"/></label><button type="submit" className="rounded-full bg-[#12018A] px-7 py-3 font-bold text-white hover:bg-[#0b0060]">Submit</button>{sent && <p role="status" className="text-sm text-[#12018A]">This is a frontend preview. Your enquiry was not sent.</p>}</form></div></main>;
}

const companyTabs = [
  ["Company Information", "company-information"],
  ["Policies", "policies"],
  ["Documents", "documents"],
  ["Enquiry", "enquiry"],
] as const;

const companyAddress = "Plot No. 87/9 & 87/11, S.No. 374, IDA Kukatpally, Gandhinagar, Balanagar, Hyderabad – 500037";
const documentGroups = [
  { title: "Company profile", description: "Company profile document", status: "Not provided" },
  { title: "Capabilities", description: "Capabilities document", status: "Not provided" },
  { title: "Certifications", description: "Certification documents", status: "Not provided" },
];
const policyGroups = [
  { title: "Quality policy", description: "Quality policy document", status: "Not provided" },
  { title: "Privacy policy", description: "Privacy policy document", status: "Not provided" },
  { title: "Terms of use", description: "Terms of use document", status: "Not provided" },
];

function InformationAccordion({ items }: { items: typeof documentGroups }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="border-t border-[#bbb]">{items.map((item, index) => <div key={item.title} className="border-b border-[#bbb]"><button className="flex w-full items-center justify-between gap-5 py-5 text-left" type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span className="text-lg font-bold text-[#12018A]">{item.title}</span><ChevronDown size={20} className={open === index ? "rotate-180" : ""}/></button>{open === index && <div className="pb-5"><p>{item.description}</p><p className="mt-2 text-sm text-[#777]">Availability: {item.status}</p></div>}</div>)}</div>;
}

function InvestorsPage({ slug }: { slug: string }) {
  const path = slug.split("/").filter(Boolean);
  const validTab = companyTabs.find(([, route]) => route === path[1]);
  const active = validTab || companyTabs[0];
  const title = active[0];
  return <main className="text-[#555]">
    <nav className="flex min-h-[58px] flex-wrap items-stretch gap-x-6 bg-[#555550] px-4 text-[14px] font-bold text-white" aria-label="Company information sections">
      {companyTabs.map(([name, route]) => <a key={route} href={`/investors/${route}`} className={`flex items-center border-b-2 py-3 ${active[1] === route ? "border-white" : "border-transparent hover:border-white/60"}`}>{name}</a>)}
    </nav>
    <section className="bg-[#12018A] px-4 py-11 text-white"><h1 className="max-w-[850px] text-[clamp(2.25rem,3.8vw,4rem)] font-extrabold leading-[1.12]">{title}</h1><div className="mt-7 flex items-center gap-2 font-bold"><a href="/investors" className="hover:underline">Company Information</a><ChevronRight size={19}/><span>{title}</span></div></section>
    <div className="mx-auto max-w-[850px] px-4 py-12 text-[16px] leading-relaxed">
      {active[1] === "company-information" && <div><h2 className="mb-5 text-2xl font-extrabold">Elite Precision Technologies Pvt. Ltd.</h2><p>{companyAddress}</p><p className="mt-4"><a href="mailto:info@elitetechindia.com" className="font-bold text-[#12018A] hover:underline">info@elitetechindia.com</a></p><p className="mt-3"><a href="https://www.elitetechindia.com" className="font-bold text-[#12018A] hover:underline">www.elitetechindia.com</a></p><div className="mt-12 grid gap-8 md:grid-cols-2"><a href="/investors/policies" className="rounded-xl bg-[#f6f6f8] p-6 font-bold text-[#12018A] hover:underline">Policies <ChevronRight className="mt-3"/></a><a href="/investors/documents" className="rounded-xl bg-[#f6f6f8] p-6 font-bold text-[#12018A] hover:underline">Documents <ChevronRight className="mt-3"/></a></div></div>}
      {active[1] === "policies" && <><p className="mb-8">Policy documents will appear here when supplied by Elite Precision Technologies.</p><InformationAccordion items={policyGroups}/></>}
      {active[1] === "documents" && <><p className="mb-8">Select a document category to view its availability.</p><InformationAccordion items={documentGroups}/></>}
      {active[1] === "enquiry" && <><h2 className="mb-5 text-2xl font-extrabold">Company enquiries</h2><p>Elite Precision Technologies Pvt. Ltd.<br/>{companyAddress}</p><p className="mt-5">Email: <a href="mailto:info@elitetechindia.com" className="font-bold text-[#12018A] hover:underline">info@elitetechindia.com</a></p><a href="/contact" className="mt-7 inline-block rounded-full bg-[#12018A] px-6 py-3 font-bold text-white">Contact us</a></>}
    </div>
  </main>;
}

export default function CorporatePage({ slug }: { slug: string }) {
  const clean = slug.replace(/^\/+/, "");
  if (clean.startsWith("careers")) return <CareersPage slug={clean}/>;
  if (clean.startsWith("contact")) return <ContactPage/>;
  return <InvestorsPage slug={clean.startsWith("investors") ? clean : `investors/${clean}`}/>;
}
