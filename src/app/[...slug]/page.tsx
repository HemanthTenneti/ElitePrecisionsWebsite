import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/AboutPages';
import { ExpertisePage } from '@/components/pages/ExpertisePages';
import CorporatePage from '@/components/pages/CorporatePages';

const expertise = new Set(['expertise','healthcare','consumer','personal-care','lighting-appliances-automotive']);
const about = new Set(['about','vision-mission-values','awards-and-recognition','capabilities','quality','sustainability','team']);
const corporate = new Set(['investors','careers','contact']);
const titles:Record<string,[string,string]>={
 expertise:['Expertise','Explore Elite precision tooling across healthcare, consumer, personal care and engineering applications.'],
 healthcare:['Healthcare','Precision injection mould technology for medical and healthcare applications.'],
 consumer:['Consumer','Precision mould design and manufacturing for reliable consumer products.'],
 'personal-care':['Beauty and Personal Care','Precision tooling for beauty and personal care products and packaging.'],
 'lighting-appliances-automotive':['Lighting, Appliances and Automotive','Engineering-led injection mould solutions for demanding industrial applications.'],
 about:['About','Learn about Elite Precision Technologies, serving tooling customers since 2003.'],
 'vision-mission-values':['Vision, Mission & Values','The engineering principles and values behind Elite Precision Technologies.'],
 'awards-and-recognition':['Awards and Recognition','Quality recognition and ISO 9001:2015 certification at Elite Precision Technologies.'],
 capabilities:['Capabilities','Product design, rapid prototyping, mould design, manufacturing, testing and qualification.'],
 quality:['Quality & Compliance','Learn about Elite Precision Technologies ISO 9001:2015 certified quality system.'],
 sustainability:['Sustainability','Our approach to thoughtful design and reliable precision tooling.'],
 'team':['Team','Meet the disciplines behind precision tooling at Elite Precision Technologies.'],
 investors:['Investors','Investor information for Elite Precision Technologies Pvt. Ltd.'],
 careers:['Careers','Explore career opportunities with Elite Precision Technologies in Hyderabad.'],
 contact:['Contact','Contact Elite Precision Technologies Pvt. Ltd. in Hyderabad, India.'],
};
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const {slug}=await params;const path=slug.join('/');const [title,description]=titles[slug[0]]??['Elite Precision Technologies','Precision injection moulds and engineering solutions.'];return {title,description,alternates:{canonical:`/${path}`},openGraph:{type:'website',locale:'en_IN',siteName:'Elite Precision Technologies',title,description,url:`/${path}`,images:[{url:'/og-image.png',width:1200,height:630,alt:'Elite Precision Technologies'}]},twitter:{card:'summary_large_image',title,description,images:['/og-image.png']}}}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){
 const {slug}=await params;
 const path=slug.join('/');
 if(path==='shaily-team') redirect('/team');
 if(path==='healthcare/shaily-innovations') redirect('/healthcare/product-design');
 const section=slug[0];
 let content:React.ReactNode;
 if(expertise.has(section)) content=<ExpertisePage slug={path}/>;
 else if(about.has(section) && slug.length===1) content=<AboutPage slug={section}/>;
 else if(corporate.has(section)) content=<CorporatePage slug={path}/>;
 else notFound();
 return <div className="pt-[94px] lg:pt-[150px]">{content}</div>;
}
