import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata: Metadata = {
 metadataBase: new URL('https://www.elitetechindia.com'),
 title: {default:'Elite Precision Technologies | Precision Injection Moulds',template:'%s | Elite Precision Technologies'},
 description:'Elite Precision Technologies designs, manufactures, tests and qualifies precision multi-cavity plastic injection moulds in Hyderabad, India.',
 applicationName:'Elite Precision Technologies',
 keywords:['precision injection moulds','multi-cavity moulds','mould design','mould manufacturing','precision tooling','Hyderabad','Elite Precision Technologies'],
 alternates:{canonical:'/'},
 openGraph:{type:'website',locale:'en_IN',siteName:'Elite Precision Technologies',title:'Elite Precision Technologies | Precision Injection Moulds',description:'Precision tooling, mould design, manufacturing, testing and qualification from Hyderabad, India.',url:'/',images:[{url:'/og-image.png',width:1200,height:630,alt:'Elite Precision Technologies'}]},
 twitter:{card:'summary_large_image',title:'Elite Precision Technologies',description:'Precision injection moulds and engineering solutions.',images:['/og-image.png']},
 icons:{icon:[{url:'/favicon.ico',sizes:'any'},{url:'/icon.png',type:'image/png',sizes:'64x64'}],apple:[{url:'/apple-icon.png',sizes:'180x180'}]},
 robots:{index:true,follow:true},
};
export default function RootLayout({children}:{children:React.ReactNode}) { const schema={'@context':'https://schema.org','@type':'Organization',name:'Elite Precision Technologies Pvt. Ltd.',url:'https://www.elitetechindia.com',logo:'https://www.elitetechindia.com/images/elite-logo-transparent.png',email:'info@elitetechindia.com',address:{'@type':'PostalAddress',streetAddress:'Plot No. 87/9 & 87/11, S.No. 374, IDA Kukatpally, Gandhinagar, Balanagar',addressLocality:'Hyderabad',addressRegion:'Telangana',postalCode:'500037',addressCountry:'IN'}};return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><Header/>{children}<Footer/></body></html>; }
