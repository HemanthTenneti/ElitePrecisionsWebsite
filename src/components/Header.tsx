'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import Placeholder from '@/components/Placeholder';

type Panel = 'expertise' | 'about' | null;
const expertise = [
 { title:'Healthcare', href:'/healthcare', description:'Precision tooling for medical and healthcare applications', color:'#ed854c' },
 { title:'Consumer', href:'/consumer', description:'Engineering reliable plastic products for everyday use', color:'#006331' },
 { title:'Beauty and Personal Care', href:'/personal-care', description:'Precision moulds for packaging and consumer products', color:'#357f9e' },
 { title:'Lighting, Appliances and Automotive', href:'/lighting-appliances-automotive', description:'High performance tooling for demanding engineering applications', color:'#a0c943' },
];
const about = [
 ['About','/about'],['Quality & Compliance','/quality'],['Sustainability','/sustainability'],
 ['Investors','/investors'],['Careers','/careers'],['Contact','/contact'],
];

export default function Header(){
 const [mobileOpen,setMobileOpen]=useState(false);
 const [activePanel,setActivePanel]=useState<Panel>(null);
 const [anchorX,setAnchorX]=useState(0);
 const mobileMenu=useRef<HTMLDivElement>(null);
 const panelRef=useRef<HTMLDivElement>(null);
 const pathname=usePathname();

 useEffect(()=>{setMobileOpen(false);setActivePanel(null)},[pathname]);
 useEffect(()=>{
  document.body.style.overflow=mobileOpen?'hidden':'';
  const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMobileOpen(false);setActivePanel(null)}};
  window.addEventListener('keydown',onKey);
  if(mobileOpen&&mobileMenu.current){
   gsap.fromTo(mobileMenu.current,{opacity:0,y:-12},{opacity:1,y:0,duration:.3,ease:'power2.out'});
   gsap.fromTo(mobileMenu.current.querySelectorAll('a'),{opacity:0,y:12},{opacity:1,y:0,stagger:.035,duration:.35,delay:.08});
  }
  return()=>{document.body.style.overflow='';window.removeEventListener('keydown',onKey)};
 },[mobileOpen]);
 useEffect(()=>{if(activePanel&&panelRef.current){gsap.fromTo(panelRef.current,{opacity:0,y:-9},{opacity:1,y:0,duration:.26,ease:'power2.out'})}},[activePanel]);

 const activate=(panel:Exclude<Panel,null>,element:HTMLElement)=>{
  const box=element.getBoundingClientRect();
  setAnchorX(box.left+box.width/2);
  setActivePanel(panel);
 };

 return <>
  <header onMouseLeave={()=>setActivePanel(null)} className={`${mobileOpen?'fixed':'absolute'} inset-x-0 top-0 z-50 h-[94px] lg:h-[150px] ${mobileOpen||activePanel||pathname!=='/'?'bg-white':'bg-white/75'}`}>
   <div className="site-container header-desktop flex h-full items-center justify-between">
    <Link href="/" aria-label="Elite Technologies home" onClick={()=>{setMobileOpen(false);setActivePanel(null)}} className="relative block h-[76px] w-[180px] sm:w-[210px] md:w-[180px] lg:h-[100px] lg:w-[245px]"><Image src="/images/elite-logo-transparent.png" alt="Elite Technologies" fill priority className="object-contain object-left"/></Link>
    <nav className="hidden h-full items-center gap-5 text-[16px] font-extrabold md:flex lg:gap-12 lg:text-[19px]" aria-label="Main navigation">
     <Link href="/expertise" onMouseEnter={e=>activate('expertise',e.currentTarget)} onFocus={e=>activate('expertise',e.currentTarget)} aria-expanded={activePanel==='expertise'} aria-controls="expertise-panel" className={`flex h-full items-center gap-3 hover:text-[#397f9e] ${activePanel==='expertise'?'text-[#397f9e]':''}`}>Expertise <ChevronDown size={22} className={`transition-transform ${activePanel==='expertise'?'rotate-180':''}`}/></Link>
     <Link href="/capabilities" onMouseEnter={()=>setActivePanel(null)} className="flex h-full items-center hover:text-[#12018A]">Capabilities</Link>
     <Link href="/about" onMouseEnter={e=>activate('about',e.currentTarget)} onFocus={e=>activate('about',e.currentTarget)} aria-expanded={activePanel==='about'} aria-controls="about-panel" className={`flex h-full items-center gap-3 hover:text-[#397f9e] ${activePanel==='about'?'text-[#397f9e]':''}`}>About <ChevronDown size={22} className={`transition-transform ${activePanel==='about'?'rotate-180':''}`}/></Link>
    </nav>
    <button aria-label={mobileOpen?'Close navigation':'Toggle navigation'} aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)} className="flex h-12 w-12 items-center justify-center text-[#555] md:hidden">{mobileOpen?<X size={29} strokeWidth={1.25}/>:<Menu size={29} strokeWidth={1.2}/>}</button>
   </div>
   {activePanel&&<div ref={panelRef} id={`${activePanel}-panel`} className="absolute inset-x-0 top-full bg-[#eff3f9] shadow-sm" onMouseEnter={()=>setActivePanel(activePanel)}>
    <span aria-hidden="true" className="absolute -top-[18px] h-[36px] w-[36px] rotate-45 bg-[#eff3f9]" style={{left:`calc(${anchorX}px - 18px)`}}/>
    {activePanel==='expertise' ? <div className="grid grid-cols-4 gap-7 px-8 pb-[47px] pt-[48px] lg:gap-[65px] lg:px-[70px]">
     {expertise.map(item=><Link href={item.href} key={item.href} onClick={()=>setActivePanel(null)} className="group block min-w-0 text-[#555]"><Placeholder label={`${item.title} image placeholder`} className="aspect-[1.5] w-full rounded-[16px] transition-transform duration-300 group-hover:scale-[1.02]" style={{background:`linear-gradient(140deg,${item.color},${item.color}d9)`}}/><h2 className="mt-[30px] text-[15px] font-extrabold leading-[1.2] lg:text-[17px]">{item.title}</h2><p className="mt-[8px] text-[14px] leading-[1.4] lg:text-[17px]">{item.description}</p></Link>)}
    </div> : <nav aria-label="About menu" className="flex min-h-[120px] flex-wrap items-center justify-end gap-x-6 gap-y-3 px-8 py-9 text-[15px] font-extrabold lg:gap-x-[35px] lg:px-[70px] lg:text-[17px]">{about.map(([label,url])=><Link href={url} key={url} onClick={()=>setActivePanel(null)} className="whitespace-nowrap hover:text-[#397f9e]">{label}</Link>)}</nav>}
   </div>}
  </header>
  {mobileOpen&&<div ref={mobileMenu} className="fixed inset-0 z-40 overflow-y-auto bg-[#fbfbfc] pt-[94px] md:hidden"><nav className="site-container pb-20 pt-9" aria-label="Mobile navigation"><div className="flex flex-col items-start gap-[25px] text-[15px] font-bold"><div className="mb-1 text-[#555]">Expertise</div>{expertise.map(item=><Link key={item.href} href={item.href} className="text-[#4b7890] hover:text-[#12018A]">{item.title}</Link>)}<Link href="/capabilities" className="mt-3 text-[#555] hover:text-[#12018A]">Capabilities</Link><div className="mt-3 text-[#555]">About</div>{about.map(([label,url])=><Link key={url} href={url} className="text-[#4b7890] hover:text-[#12018A]">{label}</Link>)}</div></nav></div>}
 </>;
}
