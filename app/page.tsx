 

// "use client"
// import Head from 'next/head'
// import Link from 'next/link'
// import { useState, useEffect, useRef } from 'react'

// // ─── DATA ────────────────────────────────────────────────────────────────────

// const CERTS = [
//   { name: 'BIS-CRS', color: '#3730a3' },
//   { name: 'BIS-ISI', color: '#7c3aed' },
//   { name: 'WPC-ETA', color: '#0d9488' },
//   { name: 'EPR', color: '#e11d48' },
//   { name: 'LMPC', color: '#f59e0b' },
//   { name: 'CDSCO', color: '#3730a3' },
//   { name: 'ISO', color: '#7c3aed' },
//   { name: 'BEE', color: '#0d9488' },
// ]

// const SERVICES = [
//   {
//     icon: '🛡️',
//     title: 'BIS-CRS Registration',
//     desc: 'Mandatory certification for electronics & IT products. We handle testing coordination, document preparation, and end-to-end portal filing with BIS.',
//     tags: ['Electronics', 'IT Products', 'Mandatory'],
//     color: '#3730a3',
//   },
//   {
//     icon: '⭐',
//     title: 'BIS-ISI Mark',
//     desc: 'Indian Standards quality mark for domestic manufacturers. Full support including factory audit preparation, lab coordination, and license issuance.',
//     tags: ['Manufacturing', 'Quality Mark', 'Domestic'],
//     color: '#7c3aed',
//   },
//   {
//     icon: '📡',
//     title: 'WPC-ETA Approval',
//     desc: 'Wireless Planning & Coordination Wing approvals for RF devices including Wi-Fi, Bluetooth, Zigbee, GPS and all wireless communication products.',
//     tags: ['Wi-Fi', 'Bluetooth', 'RF Devices'],
//     color: '#0d9488',
//   },
//   {
//     icon: '♻️',
//     title: 'EPR Compliance',
//     desc: 'Extended Producer Responsibility filing for plastic packaging, e-waste, and battery categories. Registration, annual targets, and compliance reports.',
//     tags: ['E-Waste', 'Plastics', 'Battery'],
//     color: '#e11d48',
//   },
//   {
//     icon: '💊',
//     title: 'CDSCO Registration',
//     desc: 'Central Drugs Standard Control Organisation approvals for medical devices, diagnostics, and healthcare products. Import license & registration.',
//     tags: ['Medical Devices', 'Diagnostics', 'Healthcare'],
//     color: '#f59e0b',
//   },
//   {
//     icon: '⚖️',
//     title: 'LMPC Registration',
//     desc: 'Legal Metrology Packaged Commodities compliance for importers and manufacturers. Label approvals and Registration Certificate for pre-packed goods.',
//     tags: ['Packaged Goods', 'Importers', 'Labelling'],
//     color: '#3730a3',
//   },
//   {
//     icon: '📋',
//     title: 'ISO Certification',
//     desc: 'ISO 9001 Quality Management, ISO 14001 Environment, ISO 45001 Safety and other sector-specific standards. Gap analysis, implementation & audit.',
//     tags: ['ISO 9001', 'ISO 14001', 'Management'],
//     color: '#7c3aed',
//   },
//   {
//     icon: '⚡',
//     title: 'BEE Star Rating',
//     desc: 'Bureau of Energy Efficiency star label registration for appliances. Mandatory for ACs, refrigerators, fans, pumps, and other energy products.',
//     tags: ['Energy', 'Appliances', 'Star Label'],
//     color: '#0d9488',
//   },
//   {
//     icon: '🌐',
//     title: 'TEC Certification',
//     desc: 'Telecommunication Engineering Centre approvals for telecom equipment. Mandatory for all telecom products sold or used in India.',
//     tags: ['Telecom', 'Equipment', 'Mandatory'],
//     color: '#e11d48',
//   },
// ]

// const STEPS = [
//   {
//     num: '01',
//     title: 'Free Consultation',
//     desc: 'We assess your product category, applicable regulations, and design a certification roadmap with timeline and cost estimates.',
//     icon: '🎯',
//   },
//   {
//     num: '02',
//     title: 'Document Collection',
//     desc: 'Our team sends you a detailed checklist and collects all technical documents, test reports, labels, and company documents.',
//     icon: '📁',
//   },
//   {
//     num: '03',
//     title: 'Lab Coordination',
//     desc: 'We coordinate with NABL-accredited labs for product testing, manage sample shipping, and resolve any technical queries.',
//     icon: '🔬',
//   },
//   {
//     num: '04',
//     title: 'Application Filing',
//     desc: 'All documents are reviewed, formatted and filed on the appropriate government portals. We track and respond to all queries.',
//     icon: '📤',
//   },
//   {
//     num: '05',
//     title: 'Audit Support',
//     desc: 'For certifications requiring factory inspections, we provide on-site preparation support and accompany during the audit.',
//     icon: '🏭',
//   },
//   {
//     num: '06',
//     title: 'Certificate Delivery',
//     desc: 'Once approved, we deliver your certificates digitally. We also set up renewal reminders so nothing ever lapses.',
//     icon: '🏆',
//   },
// ]

// const WHY = [
//   { icon: '👤', title: 'Dedicated Case Manager', desc: 'A single point of contact manages your entire application. No confusion, no chasing multiple people.' },
//   { icon: '📊', title: 'Real-time Dashboard', desc: 'Log in anytime to track your application status, view documents, and see upcoming deadlines.' },
//   { icon: '🔒', title: 'Secure Document Vault', desc: 'All certificates and documents are stored securely in our cloud vault with version history and access controls.' },
//   { icon: '🔔', title: 'Smart Renewal Alerts', desc: 'Automated reminders 90, 60, and 30 days before renewal due dates. Never let a certificate lapse again.' },
//   { icon: '⚡', title: 'Fast Turnaround', desc: 'Our in-house expertise means fewer back-and-forths. We typically reduce application time by 40%.' },
//   { icon: '💰', title: 'Transparent Pricing', desc: 'Fixed professional fees quoted upfront. No surprise charges. Government fees always billed at actual cost.' },
//   { icon: '🌍', title: 'PAN India Service', desc: 'We serve manufacturers and importers across India — from Delhi to Chennai, Mumbai to Kolkata.' },
//   { icon: '📞', title: '24/7 Query Support', desc: 'WhatsApp and email support available round the clock. Our team responds within 2 hours, guaranteed.' },
// ]

// const CLIENTS = [
//   { sector: 'Consumer Electronics', count: '120+ clients', icon: '📱' },
//   { sector: 'Medical Devices', count: '85+ clients', icon: '🏥' },
//   { sector: 'FMCG & Packaging', count: '95+ clients', icon: '📦' },
//   { sector: 'Telecom & Wireless', count: '70+ clients', icon: '📡' },
//   { sector: 'Automotive Parts', count: '45+ clients', icon: '🚗' },
//   { sector: 'Industrial Equipment', count: '60+ clients', icon: '⚙️' },
// ]

// const TESTIMONIALS = [
//   {
//     name: 'Rajesh Kumar',
//     company: 'TechCorp Electronics Pvt Ltd',
//     city: 'Delhi',
//     text: 'Power India Services got our BIS-CRS done in 45 days flat. Their team handled everything — testing, filing, query responses. We just provided the product and documents.',
//     rating: 5,
//   },
//   {
//     name: 'Priya Mehta',
//     company: 'MedEquip Imports',
//     city: 'Mumbai',
//     text: 'CDSCO registration seemed impossible until we approached Power India Services. Their expertise in medical device regulations is unmatched. Highly recommended.',
//     rating: 5,
//   },
//   {
//     name: 'Arun Nair',
//     company: 'GreenPack Solutions',
//     city: 'Bangalore',
//     text: 'EPR compliance was a nightmare for us. Their team simplified the entire process, got our registration done, and now manages our annual filings too.',
//     rating: 5,
//   },
// ]

// const FAQS = [
//   {
//     q: 'How long does BIS-CRS certification take?',
//     a: 'BIS-CRS typically takes 30–60 days depending on the product category and lab availability. Some products with existing test reports can be faster.',
//   },
//   {
//     q: 'Do you handle international product certifications?',
//     a: 'We specialize in Indian regulatory certifications. For products requiring CE, FCC or other international marks, we can connect you with our global partners.',
//   },
//   {
//     q: 'What is the difference between BIS-CRS and BIS-ISI?',
//     a: 'BIS-CRS is for electronics and IT products sold in India. BIS-ISI is for Indian manufacturers of goods like steel, cement, and packaged commodities.',
//   },
//   {
//     q: 'Can you handle multiple certifications simultaneously?',
//     a: 'Yes, this is one of our key strengths. We regularly manage BIS + WPC + EPR for the same client, reducing overall time and coordination effort significantly.',
//   },
//   {
//     q: 'Do you offer post-certification support?',
//     a: 'Absolutely. We manage renewals, annual surveillance, factory re-inspections, and any regulatory updates that affect your existing certifications.',
//   },
//   {
//     q: 'What documents are needed to start?',
//     a: 'Typically: company registration documents, product brochure/datasheet, authorized Indian representative details, and product samples for testing.',
//   },
// ]

// const CAREERS = [
//   {
//     role: 'Senior Certification Manager',
//     type: 'Full-time · Delhi / Remote',
//     exp: '3–5 years',
//     skills: ['BIS experience', 'WPC filings', 'Client handling', 'Government portals'],
//     urgent: true,
//   },
//   {
//     role: 'Regulatory Affairs Executive',
//     type: 'Full-time · Delhi',
//     exp: '1–3 years',
//     skills: ['EPR compliance', 'CDSCO filings', 'Documentation', 'MS Office'],
//     urgent: false,
//   },
//   {
//     role: 'Business Development Executive',
//     type: 'Full-time · Pan India',
//     exp: '2–4 years',
//     skills: ['B2B sales', 'Regulatory knowledge', 'Lead generation', 'CRM tools'],
//     urgent: false,
//   },
// ]

// // ─── STAT COUNTER ────────────────────────────────────────────────────────────

// // function StatCounter({ end, suffix = '' }) {
// //   const [count, setCount] = useState(0)
// //   const ref = useRef(null)
// //   const started = useRef(false)

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(([entry]) => {
// //       if (entry.isIntersecting && !started.current) {
// //         started.current = true
// //         let start = 0
// //         const duration = 2000
// //         const step = end / (duration / 16)
// //         const timer = setInterval(() => {
// //           start += step
// //           if (start >= end) { setCount(end); clearInterval(timer) }
// //           else setCount(Math.floor(start))
// //         }, 16)
// //       }
// //     }, { threshold: 0.5 })
// //     if (ref.current) observer.observe(ref.current)
// //     return () => observer.disconnect()
// //   }, [end])

// //   return <span ref={ref}>{count}{suffix}</span>
// // }

 

// interface StatCounterProps {
//   end: number;
//   suffix?: string;
// }

//  function StatCounter({ end, suffix = "" }: StatCounterProps) {
//   const [count, setCount] = useState<number>(0);

//   const ref = useRef<HTMLSpanElement | null>(null);
//   const started = useRef<boolean>(false);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     let timer: NodeJS.Timeout;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !started.current) {
//           started.current = true;

//           let start = 0;
//           const duration = 2000;
//           const step = end / (duration / 16);

//           timer = setInterval(() => {
//             start += step;

//             if (start >= end) {
//               setCount(end);
//               clearInterval(timer);
//             } else {
//               setCount(Math.floor(start));
//             }
//           }, 16);
//         }
//       },
//       { threshold: 0.5 }
//     );

//     observer.observe(element);

//     return () => {
//       observer.disconnect();
//       if (timer) clearInterval(timer);
//     };
//   }, [end]);

//   return (
//     <span ref={ref}>
//       {count}
//       {suffix}
//     </span>
//   );
// }
// // ─── FAQ ITEM ────────────────────────────────────────────────────────────────

// // function FaqItem({ q, a, idx }) {
// //   const [open, setOpen] = useState(false)
// //   return (
// //     <div style={{
// //       border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden',
// //       transition: 'box-shadow 0.3s',
// //       boxShadow: open ? '0 8px 24px rgba(55,48,163,0.1)' : 'none',
// //       marginBottom: '12px',
// //     }}>
// //       <button
// //         onClick={() => setOpen(!open)}
// //         style={{
// //           width: '100%', textAlign: 'left', padding: '20px 24px',
// //           background: open ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#fff',
// //           border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
// //           transition: 'background 0.3s',
// //         }}
// //       >
// //         <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 600, color: open ? '#fff' : '#1e293b' }}>
// //           {q}
// //         </span>
// //         <span style={{ fontSize: '20px', color: open ? '#fcd34d' : '#7c3aed', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
// //       </button>
// //       {open && (
// //         <div style={{ padding: '18px 24px', background: '#f8fafc', fontSize: '14px', color: '#475569', lineHeight: 1.75 }}>
// //           {a}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }
 

// interface FaqItemProps {
//   q: string;
//   a: string;
//   idx?: number;
// }

//   function FaqItem({ q, a }: FaqItemProps) {
//   const [open, setOpen] = useState<boolean>(false);

//   return (
//     <div
//       className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
//         open ? "shadow-lg shadow-indigo-200/50" : ""
//       }`}
//     >
//       {/* QUESTION */}
//       <button
//         onClick={() => setOpen(!open)}
//         className={`w-full flex justify-between items-center px-6 py-5 text-left transition-all duration-300 ${
//           open
//             ? "bg-gradient-to-r from-indigo-700 to-purple-600 text-white"
//             : "bg-white hover:bg-gray-50"
//         }`}
//       >
//         <span className="text-sm md:text-base font-semibold">
//           {q}
//         </span>

//         <span
//           className={`text-xl font-bold transition-transform duration-300 ${
//             open ? "rotate-45 text-yellow-300" : "text-purple-600"
//           }`}
//         >
//           +
//         </span>
//       </button>

//       {/* ANSWER */}
//       <div
//         className={`grid transition-all duration-300 ${
//           open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
//         }`}
//       >
//         <div className="overflow-hidden">
//           <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 leading-relaxed">
//             {a}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────

// export default function Home() {
//   const [scrolled, setScrolled] = useState(false)
//   const [activeTestimonial, setActiveTestimonial] = useState(0)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   useEffect(() => {
//     const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000)
//     return () => clearInterval(t)
//   }, [])

//   return (
//     <>
//       <Head>
//         <title>Power India Services | India's #1 Certification & Compliance Consultancy</title>
//         <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE — End-to-end regulatory certification consultants in India." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       {/* ══════════════════════════ NAVBAR ══════════════════════════ */}
//       <nav style={{
//         position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
//         background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
//         backdropFilter: scrolled ? 'blur(20px)' : 'none',
//         borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
//         transition: 'all 0.4s ease',
//         padding: '0 32px',
//       }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
//           {/* Logo */}
//           <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 900, color: scrolled ? '#1e1b4b' : '#fff' }}>
//             Power<span style={{ color: '#f59e0b' }}>India</span><span style={{ color: scrolled ? '#7c3aed' : '#a78bfa' }}> Services</span>
//           </div>

//           {/* Nav Links */}
//           <div style={{ display: 'flex', gap: '32px' }}>
//             {['Services', 'Process', 'Why Us', 'Testimonials', 'Careers', 'FAQ'].map((l) => (
//               <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{
//                 fontSize: '13px', fontWeight: 500, color: scrolled ? '#475569' : 'rgba(255,255,255,0.85)',
//                 textDecoration: 'none', transition: 'color 0.2s',
//                 fontFamily: "'Space Grotesk',sans-serif",
//               }}>{l}</a>
//             ))}
//           </div>

//           {/* Login only */}
//           <Link href="/login" style={{
//             fontFamily: "'Space Grotesk',sans-serif",
//             fontSize: '13px', fontWeight: 600,
//             color: scrolled ? '#fff' : '#1e1b4b',
//             background: scrolled ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#f59e0b',
//             padding: '10px 24px', borderRadius: '8px',
//             textDecoration: 'none', transition: 'all 0.3s ease',
//             boxShadow: '0 4px 14px rgba(55,48,163,0.25)',
//           }}>
//             Log In →
//           </Link>
//         </div>
//       </nav>

//       {/* ══════════════════════════ HERO ══════════════════════════ */}
//       <section style={{
//         minHeight: '100vh', display: 'flex', alignItems: 'center',
//         background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 40%, #7c3aed 70%, #0d9488 100%)',
//         backgroundSize: '300% 300%',
//         animation: 'gradient-shift 8s ease infinite',
//         position: 'relative', overflow: 'hidden', padding: '120px 32px 80px',
//       }}>
//         {/* Animated blobs */}
//         <div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(245,158,11,0.12)', filter: 'blur(60px)', animation: 'float 6s ease-in-out infinite' }} />
//         <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(225,29,72,0.1)', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite reverse' }} />
//         <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(13,148,136,0.1)', filter: 'blur(40px)', animation: 'float 5s ease-in-out infinite 2s' }} />

//         {/* Grid pattern */}
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

//         <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '60px', alignItems: 'center' }}>
//           <div className="animate-fade-up">
//             {/* Badge */}
//             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '100px', padding: '8px 20px', fontSize: '12px', color: '#fcd34d', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '24px', fontFamily: "'Space Grotesk',sans-serif" }}>
//               <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: 'pulse-ring 1.5s infinite' }} />
//               India's #1 Certification Consultancy
//             </div>

//             <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '58px', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: '20px' }}>
//               Regulatory{' '}
//               <span className="grad-text">Compliance</span>
//               <br />Made <em style={{ fontStyle: 'italic', color: '#fcd34d' }}>Effortless</em>
//             </h1>

//             <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '500px' }}>
//               India's most trusted certification consultancy. We handle BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE and 20+ regulatory approvals — end-to-end, on time, every time.
//             </p>

//             <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
//               <a href="#services" className="btn-shimmer" style={{ background: 'linear-gradient(135deg,#f59e0b,#e11d48)', color: '#fff', padding: '15px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", display: 'inline-block' }}>
//                 Explore Services ↓
//               </a>
//               <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '15px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk',sans-serif", display: 'inline-block' }}>
//                 Free Consultation
//               </a>
//             </div>

//             {/* Cert pills */}
//             <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//               {CERTS.map((c, i) => (
//                 <div key={c.name} className={`animate-fade-up delay-${Math.min(i + 1, 6)}`} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>
//                   {c.name}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Floating Card */}
//           <div className="animate-float" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', padding: '36px', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
//             <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#fcd34d', fontWeight: 700, marginBottom: '6px' }}>Why clients choose us</div>
//             <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Trusted by 500+ companies across India</p>

//             {[
//               { label: 'Application Success Rate', val: 98, color: '#10b981' },
//               { label: 'Clients Retained', val: 94, color: '#f59e0b' },
//               { label: 'Faster Than Industry Avg', val: 40, color: '#7c3aed', suffix: '%' },
//             ].map((stat) => (
//               <div key={stat.label} style={{ marginBottom: '20px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//                   <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{stat.label}</span>
//                   <span style={{ fontSize: '13px', color: stat.color, fontWeight: 700 }}>{stat.val}{stat.suffix || '%'}</span>
//                 </div>
//                 <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '100px', height: '6px', overflow: 'hidden' }}>
//                   <div style={{ width: `${stat.val}%`, height: '100%', background: stat.color, borderRadius: '100px', transition: 'width 2s ease' }} />
//                 </div>
//               </div>
//             ))}

//             <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
//               {[['500+', 'Certs Done'], ['8+', 'Cert Types'], ['10+', 'Years Exp'], ['100%', 'Transparent']].map(([n, l]) => (
//                 <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
//                   <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 900, color: '#fcd34d' }}>{n}</div>
//                   <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{l}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
//           <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
//           <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
//         </div>
//       </section>

//       {/* ══════════════════════════ STATS TICKER ══════════════════════════ */}
//       <div style={{ background: '#1e1b4b', padding: '0 32px', overflow: 'hidden' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
//           {[
//             { end: 500, suffix: '+', label: 'Certifications Delivered' },
//             { end: 98, suffix: '%', label: 'Success Rate' },
//             { end: 350, suffix: '+', label: 'Happy Clients' },
//             { end: 10, suffix: '+', label: 'Years of Expertise' },
//             { end: 20, suffix: '+', label: 'Cert Categories' },
//           ].map((s) => (
//             <div key={s.label} style={{ textAlign: 'center', padding: '28px 16px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
//               <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '34px', fontWeight: 900, color: '#f59e0b' }}>
//                 <StatCounter end={s.end} suffix={s.suffix} />
//               </div>
//               <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px', fontWeight: 500, letterSpacing: '0.5px' }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ══════════════════════════ SERVICES ══════════════════════════ */}
//       <section id="services" style={{ padding: '96px 32px', background: '#fefce8' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
//               Our Services
//             </div>
//             <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900, color: '#1e1b4b', marginBottom: '16px', lineHeight: 1.2 }}>
//               Every Certification,<br /><span className="grad-text">We Handle It All</span>
//             </h2>
//             <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
//               From testing coordination to government portal filing — we manage the complete process with zero hassle for you.
//             </p>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
//             {SERVICES.map((s, i) => (
//               <div key={s.title} className={`hover-lift animate-fade-up delay-${Math.min((i % 3) + 1, 6)}`} style={{
//                 background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', cursor: 'default',
//                 position: 'relative', overflow: 'hidden',
//               }}>
//                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }} />
//                 <div style={{ fontSize: '32px', marginBottom: '16px' }}>{s.icon}</div>
//                 <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '16px', fontWeight: 700, color: '#1e1b4b', marginBottom: '10px' }}>{s.title}</h3>
//                 <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, marginBottom: '16px' }}>{s.desc}</p>
//                 <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
//                   {s.tags.map((t) => (
//                     <span key={t} style={{ background: `${s.color}12`, color: s.color, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════ CLIENTS SECTOR ══════════════════════════ */}
//       <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg,#1e1b4b,#3730a3)' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '52px' }}>
//             <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
//               Industries We Serve
//             </h2>
//             <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px' }}>Trusted by companies across sectors throughout India</p>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
//             {CLIENTS.map((c) => (
//               <div key={c.sector} className="hover-lift" style={{
//                 background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px',
//                 padding: '24px', display: 'flex', gap: '16px', alignItems: 'center',
//               }}>
//                 <div style={{ fontSize: '36px' }}>{c.icon}</div>
//                 <div>
//                   <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 600, color: '#fff' }}>{c.sector}</div>
//                   <div style={{ fontSize: '13px', color: '#fcd34d', marginTop: '2px' }}>{c.count}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════ PROCESS ══════════════════════════ */}
//       <section id="process" style={{ padding: '96px 32px', background: '#f8fafc' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#0d9488,#3730a3)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
//               Our Process
//             </div>
//             <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900, color: '#1e1b4b', marginBottom: '16px' }}>
//               6 Steps to <span className="grad-text">Certification Success</span>
//             </h2>
//             <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
//               A proven, transparent workflow that keeps you informed at every stage.
//             </p>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
//             {STEPS.map((s, i) => (
//               <div key={s.num} className="hover-lift" style={{
//                 background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px',
//                 position: 'relative',
//               }}>
//                 <div style={{
//                   position: 'absolute', top: '20px', right: '20px',
//                   fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900,
//                   color: '#f1f5f9', lineHeight: 1,
//                 }}>{s.num}</div>
//                 <div style={{ fontSize: '28px', marginBottom: '14px' }}>{s.icon}</div>
//                 <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '16px', fontWeight: 700, color: '#1e1b4b', marginBottom: '10px' }}>{s.title}</h3>
//                 <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75 }}>{s.desc}</p>
//                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, #3730a3, #7c3aed)`, borderRadius: '0 0 16px 16px' }} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════ WHY US ══════════════════════════ */}
//       <section id="why-us" style={{ padding: '96px 32px', background: '#fefce8' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '360px 1fr', gap: '60px', alignItems: 'center' }}>
//           <div>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#e11d48,#f59e0b)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
//               Why Choose Us
//             </div>
//             <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 900, color: '#1e1b4b', marginBottom: '20px', lineHeight: 1.2 }}>
//               We Don't Just File —<br /><span className="grad-text">We Deliver Results</span>
//             </h2>
//             <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
//               Our process-first approach, deep regulatory expertise, and client-centric model sets us apart from every other consultancy in India.
//             </p>
//             <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{
//               display: 'inline-block', background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff',
//               padding: '14px 30px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
//               textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif",
//             }}>
//               Get Started Today →
//             </a>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
//             {WHY.map((w, i) => (
//               <div key={w.title} className="hover-lift" style={{
//                 background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px',
//               }}>
//                 <div style={{ fontSize: '24px', marginBottom: '10px' }}>{w.icon}</div>
//                 <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#1e1b4b', marginBottom: '6px' }}>{w.title}</h4>
//                 <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.65 }}>{w.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
//       <section id="testimonials" style={{ padding: '96px 32px', background: 'linear-gradient(135deg,#7c3aed,#3730a3,#1e1b4b)', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
//         <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
//           <div style={{ textAlign: 'center', marginBottom: '52px' }}>
//             <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
//               What Our Clients Say
//             </h2>
//             <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Real results, real businesses</p>
//           </div>

//           <div style={{ position: 'relative', minHeight: '240px' }}>
//             {TESTIMONIALS.map((t, i) => (
//               <div key={t.name} style={{
//                 position: 'absolute', inset: 0, transition: 'opacity 0.6s ease, transform 0.6s ease',
//                 opacity: i === activeTestimonial ? 1 : 0,
//                 transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(20px)',
//                 pointerEvents: i === activeTestimonial ? 'auto' : 'none',
//               }}>
//                 <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '40px' }}>
//                   <div style={{ fontSize: '32px', color: '#fcd34d', marginBottom: '20px', fontFamily: 'serif' }}>"</div>
//                   <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '24px' }}>{t.text}</p>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <div>
//                       <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 700, color: '#fcd34d' }}>{t.name}</div>
//                       <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{t.company} · {t.city}</div>
//                     </div>
//                     <div style={{ display: 'flex', gap: '3px' }}>
//                       {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Dots */}
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '270px' }}>
//             {TESTIMONIALS.map((_, i) => (
//               <button key={i} onClick={() => setActiveTestimonial(i)} style={{
//                 width: i === activeTestimonial ? '28px' : '8px', height: '8px',
//                 borderRadius: '100px', border: 'none', cursor: 'pointer',
//                 background: i === activeTestimonial ? '#f59e0b' : 'rgba(255,255,255,0.3)',
//                 transition: 'all 0.3s ease',
//               }} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════ FAQ ══════════════════════════ */}
//       <section id="faq" style={{ padding: '96px 32px', background: '#f8fafc' }}>
//         <div style={{ maxWidth: '760px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '52px' }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#0d9488,#3730a3)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
//               FAQ
//             </div>
//             <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 900, color: '#1e1b4b', marginBottom: '12px' }}>
//               Frequently Asked Questions
//             </h2>
//             <p style={{ fontSize: '15px', color: '#64748b' }}>Can't find your answer? Email us at anand@powerindiaservices.com</p>
//           </div>
//           {FAQS.map((f, i) => <FaqItem key={i} {...f} idx={i} />)}
//         </div>
//       </section>

//       {/* ══════════════════════════ CAREERS ══════════════════════════ */}
//       <section id="careers" style={{ padding: '96px 32px', background: '#fefce8' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#e11d48,#f59e0b)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
//               We're Hiring
//             </div>
//             <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900, color: '#1e1b4b', marginBottom: '16px' }}>
//               Join Our Growing Team
//             </h2>
//             <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
//               Be part of India's fastest-growing regulatory consultancy. We offer great work culture, learning opportunities, and competitive compensation.
//             </p>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
//             {CAREERS.map((job) => (
//               <div key={job.role} className="hover-lift" style={{
//                 background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '32px',
//                 position: 'relative', overflow: 'hidden',
//               }}>
//                 {job.urgent && (
//                   <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#e11d48', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', fontFamily: "'Space Grotesk',sans-serif" }}>
//                     URGENT
//                   </div>
//                 )}
//                 <div style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px', display: 'inline-block', marginBottom: '18px', fontFamily: "'Space Grotesk',sans-serif" }}>
//                   {job.type}
//                 </div>
//                 <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: '#1e1b4b', marginBottom: '8px' }}>{job.role}</h3>
//                 <div style={{ fontSize: '13px', color: '#7c3aed', fontWeight: 600, marginBottom: '20px' }}>Experience: {job.exp}</div>
//                 <div style={{ marginBottom: '24px' }}>
//                   {job.skills.map((sk) => (
//                     <div key={sk} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#475569' }}>
//                       <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {sk}
//                     </div>
//                   ))}
//                 </div>
//                 <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{
//                   display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#1e1b4b,#3730a3)',
//                   color: '#fff', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
//                   textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif",
//                 }}>
//                   Apply Now →
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════ CTA BANNER ══════════════════════════ */}
//       <section style={{
//         padding: '96px 32px', textAlign: 'center',
//         background: 'linear-gradient(135deg,#f59e0b 0%,#e11d48 50%,#7c3aed 100%)',
//         backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite',
//         position: 'relative', overflow: 'hidden',
//       }}>
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
//         <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
//           <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', fontWeight: 900, color: '#fff', marginBottom: '16px', lineHeight: 1.15 }}>
//             Ready to Get Your<br />Product Certified?
//           </h2>
//           <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', lineHeight: 1.75 }}>
//             Speak with our certification experts today. Free 30-minute consultation for all new clients. No commitment required.
//           </p>
//           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
//             <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{
//               background: '#fff', color: '#3730a3', padding: '16px 36px', borderRadius: '12px',
//               fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif",
//             }}>
//               Email Us Now
//             </a>
//             <a href="tel:+917217698176" className="btn-shimmer" style={{
//               background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '16px 36px', borderRadius: '12px',
//               fontSize: '15px', fontWeight: 700, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)',
//               fontFamily: "'Space Grotesk',sans-serif",
//             }}>
//               📞 +91 72176 98176
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════ FOOTER ══════════════════════════ */}
//       <footer style={{ background: '#0f0d2e', color: 'rgba(255,255,255,0.6)', padding: '80px 32px 0' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', paddingBottom: '64px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
//             {/* Brand */}
//             <div>
//               <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
//                 Power<span style={{ color: '#f59e0b' }}>India</span> <span style={{ color: '#a78bfa' }}>Services</span>
//               </div>
//               <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '24px', maxWidth: '300px' }}>
//                 India's most trusted regulatory certification consultancy. We help manufacturers and importers navigate complex compliance requirements with ease.
//               </p>
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 {['📧', '📞', '💼', '🐦'].map((icon, i) => (
//                   <div key={i} style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer' }}>
//                     {icon}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Services */}
//             <div>
//               <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Services</div>
//               {['BIS-CRS', 'BIS-ISI', 'WPC-ETA', 'EPR Compliance', 'CDSCO', 'LMPC', 'ISO', 'BEE Rating'].map((s) => (
//                 <div key={s} style={{ fontSize: '13px', marginBottom: '10px' }}>
//                   <a href="#services" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}>{s}</a>
//                 </div>
//               ))}
//             </div>

//             {/* Company */}
//             <div>
//               <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Company</div>
//               {['About Us', 'Process', 'Why Choose Us', 'Testimonials', 'Careers', 'Privacy Policy', 'Terms of Service'].map((s) => (
//                 <div key={s} style={{ fontSize: '13px', marginBottom: '10px' }}>
//                   <a href="#" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{s}</a>
//                 </div>
//               ))}
//             </div>

//             {/* Contact */}
//             <div>
//               <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Contact</div>
//               <div style={{ fontSize: '13px', marginBottom: '14px', lineHeight: 1.6 }}>
//                 <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>Email</div>
//                 <a href="mailto:anand@powerindiaservices.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>anand@powerindiaservices.com</a>
//               </div>
//               <div style={{ fontSize: '13px', marginBottom: '14px' }}>
//                 <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>Phone</div>
//                 <a href="tel:+917217698176" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+91 72176 98176</a>
//               </div>
//               <div style={{ fontSize: '13px', marginBottom: '14px' }}>
//                 <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>Office</div>
//                 <span style={{ color: 'rgba(255,255,255,0.6)' }}>New Delhi, India</span>
//               </div>
//               <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
//                 <span style={{ fontSize: '12px', color: '#6ee7b7', fontWeight: 500 }}>Available Mon–Sat, 9am–7pm</span>
//               </div>
//             </div>
//           </div>

//           {/* Certifications we cover */}
//           <div style={{ padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
//             <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '8px' }}>Certifications:</span>
//             {CERTS.map((c) => (
//               <span key={c.name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '4px 14px', fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: "'Space Grotesk',sans-serif" }}>
//                 {c.name}
//               </span>
//             ))}
//           </div>

//           {/* Bottom bar */}
//           <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
//             <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
//               © 2026 Power India Services. All rights reserved. | CIN: U74900DL2015PTC123456
//             </span>
//             <div style={{ display: 'flex', gap: '20px' }}>
//               {['Privacy Policy', 'Terms', 'Sitemap'].map((l) => (
//                 <a key={l} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   )
// }


// "use client"
// import Head from 'next/head'
// import Link from 'next/link'
// import { useState, useEffect, useRef } from 'react'

// // ─── DATA ────────────────────────────────────────────────────────────────────

// const CERTS = [
//   { name: 'BIS-CRS', color: '#3730a3' },
//   { name: 'BIS-ISI', color: '#7c3aed' },
//   { name: 'WPC-ETA', color: '#0d9488' },
//   { name: 'EPR', color: '#e11d48' },
//   { name: 'LMPC', color: '#f59e0b' },
//   { name: 'CDSCO', color: '#3730a3' },
//   { name: 'ISO', color: '#7c3aed' },
//   { name: 'BEE', color: '#0d9488' },
// ]

// const SERVICES = [
//   { icon: '🛡️', title: 'BIS-CRS Registration', desc: 'Mandatory certification for electronics & IT products. Testing coordination, document preparation, and end-to-end portal filing with BIS.', tags: ['Electronics', 'IT Products', 'Mandatory'], color: '#3730a3' },
//   { icon: '⭐', title: 'BIS-ISI Mark', desc: 'Indian Standards quality mark for domestic manufacturers. Factory audit preparation, lab coordination, and license issuance.', tags: ['Manufacturing', 'Quality Mark', 'Domestic'], color: '#7c3aed' },
//   { icon: '📡', title: 'WPC-ETA Approval', desc: 'Wireless Planning & Coordination Wing approvals for RF devices including Wi-Fi, Bluetooth, Zigbee, GPS and all wireless products.', tags: ['Wi-Fi', 'Bluetooth', 'RF Devices'], color: '#0d9488' },
//   { icon: '♻️', title: 'EPR Compliance', desc: 'Extended Producer Responsibility filing for plastic packaging, e-waste, and battery categories. Registration, annual targets, and compliance reports.', tags: ['E-Waste', 'Plastics', 'Battery'], color: '#e11d48' },
//   { icon: '💊', title: 'CDSCO Registration', desc: 'Central Drugs Standard Control Organisation approvals for medical devices, diagnostics, and healthcare products. Import license & registration.', tags: ['Medical Devices', 'Diagnostics', 'Healthcare'], color: '#f59e0b' },
//   { icon: '⚖️', title: 'LMPC Registration', desc: 'Legal Metrology Packaged Commodities compliance for importers and manufacturers. Label approvals and Registration Certificate for pre-packed goods.', tags: ['Packaged Goods', 'Importers', 'Labelling'], color: '#3730a3' },
//   { icon: '📋', title: 'ISO Certification', desc: 'ISO 9001 Quality Management, ISO 14001 Environment, ISO 45001 Safety and other sector-specific standards. Gap analysis, implementation & audit.', tags: ['ISO 9001', 'ISO 14001', 'Management'], color: '#7c3aed' },
//   { icon: '⚡', title: 'BEE Star Rating', desc: 'Bureau of Energy Efficiency star label registration for appliances. Mandatory for ACs, refrigerators, fans, pumps, and other energy products.', tags: ['Energy', 'Appliances', 'Star Label'], color: '#0d9488' },
//   { icon: '🌐', title: 'TEC Certification', desc: 'Telecommunication Engineering Centre approvals for telecom equipment. Mandatory for all telecom products sold or used in India.', tags: ['Telecom', 'Equipment', 'Mandatory'], color: '#e11d48' },
// ]

// const STEPS = [
//   { num: '01', title: 'Free Consultation', desc: 'We assess your product category, applicable regulations, and design a certification roadmap with timeline and cost estimates.', icon: '🎯' },
//   { num: '02', title: 'Document Collection', desc: 'Our team sends you a detailed checklist and collects all technical documents, test reports, labels, and company documents.', icon: '📁' },
//   { num: '03', title: 'Lab Coordination', desc: 'We coordinate with NABL-accredited labs for product testing, manage sample shipping, and resolve any technical queries.', icon: '🔬' },
//   { num: '04', title: 'Application Filing', desc: 'All documents are reviewed, formatted and filed on the appropriate government portals. We track and respond to all queries.', icon: '📤' },
//   { num: '05', title: 'Audit Support', desc: 'For certifications requiring factory inspections, we provide on-site preparation support and accompany during the audit.', icon: '🏭' },
//   { num: '06', title: 'Certificate Delivery', desc: 'Once approved, we deliver your certificates digitally. We also set up renewal reminders so nothing ever lapses.', icon: '🏆' },
// ]

// const WHY = [
//   { icon: '👤', title: 'Dedicated Case Manager', desc: 'A single point of contact manages your entire application. No confusion, no chasing multiple people.' },
//   { icon: '📊', title: 'Real-time Dashboard', desc: 'Log in anytime to track your application status, view documents, and see upcoming deadlines.' },
//   { icon: '🔒', title: 'Secure Document Vault', desc: 'All certificates and documents are stored securely in our cloud vault with version history and access controls.' },
//   { icon: '🔔', title: 'Smart Renewal Alerts', desc: 'Automated reminders 90, 60, and 30 days before renewal due dates. Never let a certificate lapse again.' },
//   { icon: '⚡', title: 'Fast Turnaround', desc: 'Our in-house expertise means fewer back-and-forths. We typically reduce application time by 40%.' },
//   { icon: '💰', title: 'Transparent Pricing', desc: 'Fixed professional fees quoted upfront. No surprise charges. Government fees always billed at actual cost.' },
//   { icon: '🌍', title: 'PAN India Service', desc: 'We serve manufacturers and importers across India — from Delhi to Chennai, Mumbai to Kolkata.' },
//   { icon: '📞', title: '24/7 Query Support', desc: 'WhatsApp and email support available round the clock. Our team responds within 2 hours, guaranteed.' },
// ]

// const CLIENTS = [
//   { sector: 'Consumer Electronics', count: '120+ clients', icon: '📱' },
//   { sector: 'Medical Devices', count: '85+ clients', icon: '🏥' },
//   { sector: 'FMCG & Packaging', count: '95+ clients', icon: '📦' },
//   { sector: 'Telecom & Wireless', count: '70+ clients', icon: '📡' },
//   { sector: 'Automotive Parts', count: '45+ clients', icon: '🚗' },
//   { sector: 'Industrial Equipment', count: '60+ clients', icon: '⚙️' },
// ]

// const TESTIMONIALS = [
//   { name: 'Rajesh Kumar', company: 'TechCorp Electronics Pvt Ltd', city: 'Delhi', text: 'Power India Services got our BIS-CRS done in 45 days flat. Their team handled everything — testing, filing, query responses. We just provided the product and documents.', rating: 5 },
//   { name: 'Priya Mehta', company: 'MedEquip Imports', city: 'Mumbai', text: 'CDSCO registration seemed impossible until we approached Power India Services. Their expertise in medical device regulations is unmatched. Highly recommended.', rating: 5 },
//   { name: 'Arun Nair', company: 'GreenPack Solutions', city: 'Bangalore', text: 'EPR compliance was a nightmare for us. Their team simplified the entire process, got our registration done, and now manages our annual filings too.', rating: 5 },
// ]

// const FAQS = [
//   { q: 'How long does BIS-CRS certification take?', a: 'BIS-CRS typically takes 30–60 days depending on the product category and lab availability. Some products with existing test reports can be faster.' },
//   { q: 'Do you handle international product certifications?', a: 'We specialize in Indian regulatory certifications. For products requiring CE, FCC or other international marks, we can connect you with our global partners.' },
//   { q: 'What is the difference between BIS-CRS and BIS-ISI?', a: 'BIS-CRS is for electronics and IT products sold in India. BIS-ISI is for Indian manufacturers of goods like steel, cement, and packaged commodities.' },
//   { q: 'Can you handle multiple certifications simultaneously?', a: 'Yes, this is one of our key strengths. We regularly manage BIS + WPC + EPR for the same client, reducing overall time and coordination effort significantly.' },
//   { q: 'Do you offer post-certification support?', a: 'Absolutely. We manage renewals, annual surveillance, factory re-inspections, and any regulatory updates that affect your existing certifications.' },
//   { q: 'What documents are needed to start?', a: 'Typically: company registration documents, product brochure/datasheet, authorized Indian representative details, and product samples for testing.' },
// ]

// const CAREERS = [
//   { role: 'Senior Certification Manager', type: 'Full-time · Delhi / Remote', exp: '3–5 years', skills: ['BIS experience', 'WPC filings', 'Client handling', 'Government portals'], urgent: true },
//   { role: 'Regulatory Affairs Executive', type: 'Full-time · Delhi', exp: '1–3 years', skills: ['EPR compliance', 'CDSCO filings', 'Documentation', 'MS Office'], urgent: false },
//   { role: 'Business Development Executive', type: 'Full-time · Pan India', exp: '2–4 years', skills: ['B2B sales', 'Regulatory knowledge', 'Lead generation', 'CRM tools'], urgent: false },
// ]

// // ─── STAT COUNTER ────────────────────────────────────────────────────────────

// interface StatCounterProps {
//   end: number
//   suffix?: string
// }

// function StatCounter({ end, suffix = '' }: StatCounterProps) {
//   const [count, setCount] = useState<number>(0)
//   const ref = useRef<HTMLSpanElement | null>(null)
//   const started = useRef<boolean>(false)

//   useEffect(() => {
//     const element = ref.current
//     if (!element) return
//     let timer: ReturnType<typeof setInterval>
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !started.current) {
//         started.current = true
//         let start = 0
//         const step = end / (2000 / 16)
//         timer = setInterval(() => {
//           start += step
//           if (start >= end) { setCount(end); clearInterval(timer) }
//           else setCount(Math.floor(start))
//         }, 16)
//       }
//     }, { threshold: 0.5 })
//     observer.observe(element)
//     return () => { observer.disconnect(); if (timer) clearInterval(timer) }
//   }, [end])

//   return <span ref={ref}>{count}{suffix}</span>
// }

// // ─── FAQ ITEM ────────────────────────────────────────────────────────────────

// interface FaqItemProps {
//   q: string
//   a: string
//   idx?: number
// }

// function FaqItem({ q, a }: FaqItemProps) {
//   const [open, setOpen] = useState<boolean>(false)
//   return (
//     <div className={`border rounded-2xl overflow-hidden mb-3 transition-all duration-300 ${open ? 'border-violet-400 shadow-lg shadow-violet-100' : 'border-slate-200'}`}>
//       <button
//         onClick={() => setOpen(!open)}
//         className={`w-full flex justify-between items-center gap-4 px-5 sm:px-7 py-4 sm:py-5 text-left transition-all duration-300 ${open ? 'bg-gradient-to-r from-indigo-700 to-violet-600' : 'bg-white hover:bg-slate-50'}`}
//       >
//         <span className={`font-semibold text-sm sm:text-base leading-snug ${open ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{q}</span>
//         <span className={`text-xl flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45 text-yellow-300' : 'text-violet-600'}`}>+</span>
//       </button>
//       <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
//         <div className="overflow-hidden">
//           <div className="px-5 sm:px-7 py-4 bg-slate-50 text-sm sm:text-base text-slate-600 leading-relaxed">{a}</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────

// export default function Home() {
//   const [scrolled, setScrolled] = useState(false)
//   const [activeTestimonial, setActiveTestimonial] = useState(0)
//   const [menuOpen, setMenuOpen] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   useEffect(() => {
//     const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000)
//     return () => clearInterval(t)
//   }, [])

//   const NAV_LINKS = ['Services', 'Process', 'Why Us', 'Testimonials', 'Careers', 'FAQ']

//   return (
//     <>
//       <Head>
//         <title>Power India Services | India's #1 Certification & Compliance Consultancy</title>
//         <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE — End-to-end regulatory certification consultants in India." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
//         <style>{`
//           @keyframes gradient-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
//           @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
//           @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
//           @keyframes pulse-ring { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
//           .animate-gradient { animation: gradient-shift 8s ease infinite; background-size: 300% 300%; }
//           .animate-gradient-fast { animation: gradient-shift 6s ease infinite; background-size: 200% 200%; }
//           .animate-float { animation: float 4s ease-in-out infinite; }
//           .animate-fade-up { animation: fadeUp 0.7s ease both; }
//           .animate-pulse-dot { animation: pulse-ring 1.5s ease-in-out infinite; }
//           .grad-text { background: linear-gradient(135deg,#f59e0b,#e11d48,#7c3aed); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:gradient-shift 4s ease infinite; }
//           .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
//           .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(55,48,163,0.13); }
//           .btn-shimmer { position:relative; overflow:hidden; transition:transform .2s,box-shadow .2s; }
//           .btn-shimmer::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); transition:left .5s ease; }
//           .btn-shimmer:hover::after { left:150%; }
//           .btn-shimmer:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.18); }
//         `}</style>
//       </Head>

//       {/* ══════════ NAVBAR ══════════ */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
//         <div className="max-w-6xl mx-auto flex items-center justify-between h-16 sm:h-[70px]">

//           {/* Logo */}
//           <div className={`text-xl sm:text-2xl font-black transition-colors flex-shrink-0`} style={{ fontFamily: "'Playfair Display',serif", color: scrolled ? '#1e1b4b' : '#fff' }}>
//             Power<span style={{ color: '#f59e0b' }}>India</span>
//             <span style={{ color: scrolled ? '#7c3aed' : '#a78bfa' }}> Services</span>
//           </div>

//           {/* Desktop Nav Links */}
//           <div className="hidden lg:flex items-center gap-6 xl:gap-8">
//             {NAV_LINKS.map(l => (
//               <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}
//                 className={`text-sm font-medium transition-colors hover:text-amber-400 ${scrolled ? 'text-slate-600' : 'text-white/85'}`}
//                 style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
//                 {l}
//               </a>
//             ))}
//           </div>

//           {/* Right: Login + Hamburger */}
//           <div className="flex items-center gap-3">
//             <Link href="/login"
//               className="btn-shimmer hidden sm:inline-flex items-center text-sm font-bold px-4 sm:px-6 py-2.5 rounded-xl transition-all duration-200"
//               style={{
//                 fontFamily: "'Space Grotesk',sans-serif",
//                 color: scrolled ? '#fff' : '#1e1b4b',
//                 background: scrolled ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#f59e0b',
//                 boxShadow: '0 4px 14px rgba(55,48,163,0.25)',
//                 textDecoration: 'none',
//               }}>
//               Log In →
//             </Link>

//             {/* Hamburger */}
//             <button onClick={() => setMenuOpen(!menuOpen)}
//               className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}
//               aria-label="Toggle menu">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 {menuOpen
//                   ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                   : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {menuOpen && (
//           <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-5 py-4 flex flex-col gap-1">
//             {NAV_LINKS.map(l => (
//               <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}
//                 onClick={() => setMenuOpen(false)}
//                 className="text-sm font-semibold text-slate-700 py-3 border-b border-slate-100 last:border-0 hover:text-violet-700 transition-colors"
//                 style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
//                 {l}
//               </a>
//             ))}
//             <Link href="/login" onClick={() => setMenuOpen(false)}
//               className="mt-3 text-center text-sm font-bold py-3 rounded-xl text-white"
//               style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', fontFamily: "'Space Grotesk',sans-serif" }}>
//               Log In →
//             </Link>
//           </div>
//         )}
//       </nav>

//       {/* ══════════ HERO ══════════ */}
//       <section className="animate-gradient relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 px-4 sm:px-8"
//         style={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#3730a3 40%,#7c3aed 70%,#0d9488 100%)' }}>
//         {/* Blobs */}
//         <div className="animate-float absolute top-[10%] right-[3%] sm:right-[5%] w-40 sm:w-64 lg:w-[400px] h-40 sm:h-64 lg:h-[400px] rounded-full pointer-events-none" style={{ background: 'rgba(245,158,11,0.12)', filter: 'blur(60px)' }} />
//         <div className="animate-float absolute bottom-[10%] left-[3%] sm:left-[5%] w-32 sm:w-56 lg:w-[300px] h-32 sm:h-56 lg:h-[300px] rounded-full pointer-events-none" style={{ background: 'rgba(225,29,72,0.1)', filter: 'blur(60px)', animationDelay: '2s' }} />
//         <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

//         <div className="relative z-10 max-w-6xl mx-auto w-full">
//           <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">

//             {/* Left Content */}
//             <div className="animate-fade-up text-center lg:text-left">
//               {/* Badge */}
//               <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-widest"
//                 style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#fcd34d', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px' }}>
//                 <span className="animate-pulse-dot w-2 h-2 rounded-full inline-block" style={{ background: '#f59e0b' }} />
//                 India's #1 Certification Consultancy
//               </div>

//               <h1 className="font-black leading-[1.1] text-white mb-4 sm:mb-5 text-4xl sm:text-5xl lg:text-[58px]"
//                 style={{ fontFamily: "'Playfair Display',serif" }}>
//                 Regulatory{' '}
//                 <span className="grad-text">Compliance</span>
//                 <br />Made <em style={{ fontStyle: 'italic', color: '#fcd34d' }}>Effortless</em>
//               </h1>

//               <p className="leading-relaxed mb-7 sm:mb-9 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
//                 India's most trusted certification consultancy. We handle BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE and 20+ regulatory approvals — end-to-end, on time, every time.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
//                 <a href="#services" className="btn-shimmer text-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white"
//                   style={{ background: 'linear-gradient(135deg,#f59e0b,#e11d48)', fontFamily: "'Space Grotesk',sans-serif", textDecoration: 'none' }}>
//                   Explore Services ↓
//                 </a>
//                 <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer text-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white"
//                   style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk',sans-serif", textDecoration: 'none' }}>
//                   Free Consultation
//                 </a>
//               </div>

//               {/* Cert pills */}
//               <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
//                 {CERTS.map(c => (
//                   <div key={c.name} className="px-3 py-1 rounded-full text-xs font-medium text-white"
//                     style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: "'Space Grotesk',sans-serif" }}>
//                     {c.name}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right — Floating Card */}
//             <div className="animate-float rounded-3xl p-6 sm:p-8 shadow-2xl mx-auto w-full max-w-sm lg:max-w-none"
//               style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' }}>
//               <div className="text-lg sm:text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif", color: '#fcd34d' }}>Why clients choose us</div>
//               <p className="text-sm mb-5 sm:mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Trusted by 500+ companies across India</p>

//               {[
//                 { label: 'Application Success Rate', val: 98, color: '#10b981' },
//                 { label: 'Clients Retained', val: 94, color: '#f59e0b' },
//                 { label: 'Faster Than Industry Avg', val: 40, color: '#7c3aed', suffix: '%' },
//               ].map(stat => (
//                 <div key={stat.label} className="mb-4 sm:mb-5">
//                   <div className="flex justify-between mb-1.5">
//                     <span className="text-xs sm:text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.label}</span>
//                     <span className="text-xs sm:text-sm font-bold" style={{ color: stat.color }}>{stat.val}{stat.suffix || '%'}</span>
//                   </div>
//                   <div className="rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
//                     <div className="h-full rounded-full" style={{ width: `${stat.val}%`, background: stat.color }} />
//                   </div>
//                 </div>
//               ))}

//               <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
//                 {[['500+', 'Certs Done'], ['8+', 'Cert Types'], ['10+', 'Years Exp'], ['100%', 'Transparent']].map(([n, l]) => (
//                   <div key={l} className="text-center py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
//                     <div className="text-xl sm:text-2xl font-black" style={{ fontFamily: "'Playfair Display',serif", color: '#fcd34d' }}>{n}</div>
//                     <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
//           <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>Scroll</span>
//           <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.4),transparent)' }} />
//         </div>
//       </section>

//       {/* ══════════ STATS BAR ══════════ */}
//       <div className="bg-indigo-950 px-4 sm:px-8 overflow-hidden">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-white/10">
//           {[
//             { end: 500, suffix: '+', label: 'Certifications Delivered' },
//             { end: 98, suffix: '%', label: 'Success Rate' },
//             { end: 350, suffix: '+', label: 'Happy Clients' },
//             { end: 10, suffix: '+', label: 'Years of Expertise' },
//             { end: 20, suffix: '+', label: 'Cert Categories' },
//           ].map((s, i) => (
//             <div key={s.label}
//               className={`text-center py-6 px-2 sm:px-4 ${i === 2 ? 'hidden sm:block' : ''} ${i >= 3 ? 'hidden lg:block' : ''}`}>
//               <div className="text-2xl sm:text-3xl font-black text-amber-400" style={{ fontFamily: "'Playfair Display',serif" }}>
//                 <StatCounter end={s.end} suffix={s.suffix} />
//               </div>
//               <div className="text-xs mt-1 font-medium text-white/40">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ══════════ SERVICES ══════════ */}
//       <section id="services" className="py-16 sm:py-24 px-4 sm:px-8" style={{ background: '#fefce8' }}>
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10 sm:mb-16">
//             <div className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest"
//               style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
//               Our Services
//             </div>
//             <h2 className="font-black leading-tight mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'Playfair Display',serif", color: '#1e1b4b' }}>
//               Every Certification,<br /><span className="grad-text">We Handle It All</span>
//             </h2>
//             <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#64748b' }}>
//               From testing coordination to government portal filing — we manage the complete process with zero hassle.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//             {SERVICES.map(s => (
//               <div key={s.title} className="hover-lift bg-white rounded-2xl overflow-hidden relative" style={{ border: '1px solid #e2e8f0' }}>
//                 <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${s.color},${s.color}88)` }} />
//                 <div className="p-5 sm:p-7">
//                   <div className="text-3xl mb-4">{s.icon}</div>
//                   <h3 className="font-bold mb-2 text-base sm:text-[16px]" style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#1e1b4b' }}>{s.title}</h3>
//                   <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>{s.desc}</p>
//                   <div className="flex flex-wrap gap-1.5">
//                     {s.tags.map(t => (
//                       <span key={t} className="text-xs font-semibold px-2.5 py-1 rounded-full"
//                         style={{ background: `${s.color}12`, color: s.color, fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ INDUSTRIES ══════════ */}
//       <section className="py-16 sm:py-20 px-4 sm:px-8" style={{ background: 'linear-gradient(135deg,#1e1b4b,#3730a3)' }}>
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10 sm:mb-12">
//             <h2 className="font-black text-white mb-3 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: "'Playfair Display',serif" }}>Industries We Serve</h2>
//             <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>Trusted by companies across sectors throughout India</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {CLIENTS.map(c => (
//               <div key={c.sector} className="hover-lift flex items-center gap-4 p-4 sm:p-6 rounded-2xl"
//                 style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
//                 <div className="text-3xl sm:text-4xl flex-shrink-0">{c.icon}</div>
//                 <div>
//                   <div className="font-semibold text-white text-sm sm:text-base" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{c.sector}</div>
//                   <div className="text-xs sm:text-sm mt-0.5" style={{ color: '#fcd34d' }}>{c.count}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ PROCESS ══════════ */}
//       <section id="process" className="py-16 sm:py-24 px-4 sm:px-8" style={{ background: '#f8fafc' }}>
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10 sm:mb-16">
//             <div className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest"
//               style={{ background: 'linear-gradient(135deg,#0d9488,#3730a3)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
//               Our Process
//             </div>
//             <h2 className="font-black leading-tight mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'Playfair Display',serif", color: '#1e1b4b' }}>
//               6 Steps to <span className="grad-text">Certification Success</span>
//             </h2>
//             <p className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#64748b' }}>
//               A proven, transparent workflow that keeps you informed at every stage.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//             {STEPS.map(s => (
//               <div key={s.num} className="hover-lift bg-white rounded-2xl p-5 sm:p-7 relative overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
//                 <div className="absolute top-4 right-4 sm:top-5 sm:right-5 font-black leading-none select-none text-4xl sm:text-5xl" style={{ fontFamily: "'Playfair Display',serif", color: '#f1f5f9' }}>{s.num}</div>
//                 <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{s.icon}</div>
//                 <h3 className="font-bold mb-2 text-sm sm:text-base" style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#1e1b4b' }}>{s.title}</h3>
//                 <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#64748b' }}>{s.desc}</p>
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg,#3730a3,#7c3aed)' }} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ WHY US ══════════ */}
//       <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-8" style={{ background: '#fefce8' }}>
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
//             {/* Left text */}
//             <div className="text-center lg:text-left">
//               <div className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest"
//                 style={{ background: 'linear-gradient(135deg,#e11d48,#f59e0b)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
//                 Why Choose Us
//               </div>
//               <h2 className="font-black leading-tight mb-4 text-3xl sm:text-4xl lg:text-[40px]" style={{ fontFamily: "'Playfair Display',serif", color: '#1e1b4b' }}>
//                 We Don't Just File —<br /><span className="grad-text">We Deliver Results</span>
//               </h2>
//               <p className="text-sm sm:text-base leading-relaxed mb-7 max-w-sm mx-auto lg:mx-0" style={{ color: '#64748b' }}>
//                 Our process-first approach, deep regulatory expertise, and client-centric model sets us apart from every other consultancy in India.
//               </p>
//               <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer inline-block px-7 py-3.5 rounded-xl font-bold text-sm text-white"
//                 style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', fontFamily: "'Space Grotesk',sans-serif", textDecoration: 'none' }}>
//                 Get Started Today →
//               </a>
//             </div>

//             {/* Grid of cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {WHY.map(w => (
//                 <div key={w.title} className="hover-lift bg-white rounded-2xl p-4 sm:p-5" style={{ border: '1px solid #e2e8f0' }}>
//                   <div className="text-2xl mb-2.5">{w.icon}</div>
//                   <h4 className="font-bold mb-1.5 text-xs sm:text-sm" style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#1e1b4b' }}>{w.title}</h4>
//                   <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#64748b' }}>{w.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════════ TESTIMONIALS ══════════ */}
//       <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden"
//         style={{ background: 'linear-gradient(135deg,#7c3aed,#3730a3,#1e1b4b)' }}>
//         <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
//         <div className="max-w-3xl mx-auto relative z-10">
//           <div className="text-center mb-10 sm:mb-14">
//             <h2 className="font-black text-white mb-3 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: "'Playfair Display',serif" }}>What Our Clients Say</h2>
//             <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>Real results, real businesses</p>
//           </div>

//           <div className="relative" style={{ minHeight: '280px' }}>
//             {TESTIMONIALS.map((t, i) => (
//               <div key={t.name} className="absolute inset-0 transition-all duration-700"
//                 style={{ opacity: i === activeTestimonial ? 1 : 0, transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(20px)', pointerEvents: i === activeTestimonial ? 'auto' : 'none' }}>
//                 <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10"
//                   style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
//                   <div className="text-3xl sm:text-4xl mb-4 sm:mb-5" style={{ color: '#fcd34d', fontFamily: 'serif' }}>"</div>
//                   <p className="text-sm sm:text-base lg:text-lg leading-relaxed italic mb-5 sm:mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>{t.text}</p>
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                     <div>
//                       <div className="font-bold text-sm sm:text-base" style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#fcd34d' }}>{t.name}</div>
//                       <div className="text-xs sm:text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.company} · {t.city}</div>
//                     </div>
//                     <div className="flex gap-1">
//                       {[...Array(t.rating)].map((_, j) => <span key={j} className="text-base sm:text-lg" style={{ color: '#f59e0b' }}>★</span>)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Dots */}
//           <div className="flex justify-center gap-2.5 mt-8" style={{ marginTop: '300px' }}>
//             {TESTIMONIALS.map((_, i) => (
//               <button key={i} onClick={() => setActiveTestimonial(i)}
//                 className="h-2 rounded-full border-none cursor-pointer transition-all duration-300"
//                 style={{ width: i === activeTestimonial ? '28px' : '8px', background: i === activeTestimonial ? '#f59e0b' : 'rgba(255,255,255,0.3)' }} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ FAQ ══════════ */}
//       <section id="faq" className="py-16 sm:py-24 px-4 sm:px-8" style={{ background: '#f8fafc' }}>
//         <div className="max-w-2xl mx-auto">
//           <div className="text-center mb-10 sm:mb-14">
//             <div className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest"
//               style={{ background: 'linear-gradient(135deg,#0d9488,#3730a3)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
//               FAQ
//             </div>
//             <h2 className="font-black mb-3 text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: "'Playfair Display',serif", color: '#1e1b4b' }}>
//               Frequently Asked Questions
//             </h2>
//             <p className="text-sm sm:text-base" style={{ color: '#64748b' }}>
//               Can't find your answer? Email us at{' '}
//               <a href="mailto:anand@powerindiaservices.com" className="text-violet-600 hover:underline">anand@powerindiaservices.com</a>
//             </p>
//           </div>
//           <div className="space-y-0">
//             {FAQS.map((f, i) => <FaqItem key={i} {...f} idx={i} />)}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ CAREERS ══════════ */}
//       <section id="careers" className="py-16 sm:py-24 px-4 sm:px-8" style={{ background: '#fefce8' }}>
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10 sm:mb-16">
//             <div className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest"
//               style={{ background: 'linear-gradient(135deg,#e11d48,#f59e0b)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '2px' }}>
//               We're Hiring
//             </div>
//             <h2 className="font-black leading-tight mb-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'Playfair Display',serif", color: '#1e1b4b' }}>
//               Join Our Growing Team
//             </h2>
//             <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#64748b' }}>
//               Be part of India's fastest-growing regulatory consultancy. We offer great work culture, learning opportunities, and competitive compensation.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//             {CAREERS.map(job => (
//               <div key={job.role} className="hover-lift bg-white rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col" style={{ border: '1px solid #e2e8f0' }}>
//                 {job.urgent && (
//                   <div className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full"
//                     style={{ background: '#e11d48', fontFamily: "'Space Grotesk',sans-serif" }}>
//                     URGENT
//                   </div>
//                 )}
//                 <div className="text-white text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-4 w-fit"
//                   style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', fontFamily: "'Space Grotesk',sans-serif" }}>
//                   {job.type}
//                 </div>
//                 <h3 className="font-bold mb-1.5 text-lg sm:text-xl" style={{ fontFamily: "'Playfair Display',serif", color: '#1e1b4b' }}>{job.role}</h3>
//                 <div className="font-semibold text-xs sm:text-sm mb-4" style={{ color: '#7c3aed', fontFamily: "'Space Grotesk',sans-serif" }}>Experience: {job.exp}</div>
//                 <div className="flex-1 space-y-2 mb-5">
//                   {job.skills.map(sk => (
//                     <div key={sk} className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: '#475569' }}>
//                       <span className="font-bold flex-shrink-0" style={{ color: '#10b981' }}>✓</span> {sk}
//                     </div>
//                   ))}
//                 </div>
//                 <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer block text-center py-3 rounded-xl text-sm font-bold text-white"
//                   style={{ background: 'linear-gradient(135deg,#1e1b4b,#3730a3)', fontFamily: "'Space Grotesk',sans-serif", textDecoration: 'none' }}>
//                   Apply Now →
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ CTA BANNER ══════════ */}
//       <section className="animate-gradient-fast py-16 sm:py-24 px-4 sm:px-8 text-center relative overflow-hidden"
//         style={{ background: 'linear-gradient(135deg,#f59e0b 0%,#e11d48 50%,#7c3aed 100%)' }}>
//         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
//         <div className="relative z-10 max-w-2xl mx-auto">
//           <h2 className="font-black text-white mb-4 leading-tight text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'Playfair Display',serif" }}>
//             Ready to Get Your<br />Product Certified?
//           </h2>
//           <p className="text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
//             Speak with our certification experts today. Free 30-minute consultation for all new clients. No commitment required.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer py-3.5 sm:py-4 px-8 rounded-xl font-bold text-sm sm:text-base text-center"
//               style={{ background: '#fff', color: '#3730a3', fontFamily: "'Space Grotesk',sans-serif", textDecoration: 'none' }}>
//               Email Us Now
//             </a>
//             <a href="tel:+917217698176" className="btn-shimmer py-3.5 sm:py-4 px-8 rounded-xl font-bold text-sm sm:text-base text-center text-white"
//               style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk',sans-serif", textDecoration: 'none' }}>
//               📞 +91 72176 98176
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ══════════ FOOTER ══════════ */}
//       <footer className="px-4 sm:px-8 pt-12 sm:pt-20" style={{ background: '#0f0d2e', color: 'rgba(255,255,255,0.6)' }}>
//         <div className="max-w-6xl mx-auto">

//           {/* Top grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-16 border-b border-white/10">
//             {/* Brand — full width on mobile */}
//             <div className="col-span-2 lg:col-span-1">
//               <div className="text-xl sm:text-2xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
//                 Power<span style={{ color: '#f59e0b' }}>India</span> <span style={{ color: '#a78bfa' }}>Services</span>
//               </div>
//               <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
//                 India's most trusted regulatory certification consultancy. We help manufacturers and importers navigate complex compliance requirements with ease.
//               </p>
//               <div className="flex gap-3">
//                 {['📧', '📞', '💼', '🐦'].map((icon, i) => (
//                   <div key={i} className="w-9 h-9 rounded-lg flex items-center justify-center text-base cursor-pointer hover:opacity-80 transition-opacity"
//                     style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
//                     {icon}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Services */}
//             <div>
//               <div className="text-xs font-bold text-white uppercase tracking-widest mb-5" style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px' }}>Services</div>
//               {['BIS-CRS', 'BIS-ISI', 'WPC-ETA', 'EPR Compliance', 'CDSCO', 'LMPC', 'ISO', 'BEE Rating'].map(s => (
//                 <div key={s} className="mb-2.5">
//                   <a href="#services" className="text-xs sm:text-sm hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{s}</a>
//                 </div>
//               ))}
//             </div>

//             {/* Company */}
//             <div>
//               <div className="text-xs font-bold text-white uppercase tracking-widest mb-5" style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px' }}>Company</div>
//               {['About Us', 'Process', 'Why Choose Us', 'Testimonials', 'Careers', 'Privacy Policy', 'Terms of Service'].map(s => (
//                 <div key={s} className="mb-2.5">
//                   <a href="#" className="text-xs sm:text-sm hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{s}</a>
//                 </div>
//               ))}
//             </div>

//             {/* Contact */}
//             <div>
//               <div className="text-xs font-bold text-white uppercase tracking-widest mb-5" style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '1.5px' }}>Contact</div>
//               <div className="mb-4 text-xs sm:text-sm">
//                 <div className="font-semibold mb-1" style={{ color: '#f59e0b' }}>Email</div>
//                 <a href="mailto:anand@powerindiaservices.com" className="hover:text-white transition-colors break-all" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>anand@powerindiaservices.com</a>
//               </div>
//               <div className="mb-4 text-xs sm:text-sm">
//                 <div className="font-semibold mb-1" style={{ color: '#f59e0b' }}>Phone</div>
//                 <a href="tel:+917217698176" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+91 72176 98176</a>
//               </div>
//               <div className="mb-5 text-xs sm:text-sm">
//                 <div className="font-semibold mb-1" style={{ color: '#f59e0b' }}>Office</div>
//                 <span style={{ color: 'rgba(255,255,255,0.6)' }}>New Delhi, India</span>
//               </div>
//               <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
//                 <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: '#10b981' }} />
//                 <span className="text-xs font-medium" style={{ color: '#6ee7b7' }}>Mon–Sat, 9am–7pm IST</span>
//               </div>
//             </div>
//           </div>

//           {/* Cert pills */}
//           <div className="py-6 border-b border-white/10 flex flex-wrap gap-2 items-center">
//             <span className="text-xs uppercase tracking-wider mr-2" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>Certifications:</span>
//             {CERTS.map(c => (
//               <span key={c.name} className="px-3 py-1 rounded-full text-xs"
//                 style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontFamily: "'Space Grotesk',sans-serif" }}>
//                 {c.name}
//               </span>
//             ))}
//           </div>

//           {/* Bottom bar */}
//           <div className="py-5 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
//             <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
//               © 2026 Power India Services. All rights reserved. | CIN: U74900DL2015PTC123456
//             </span>
//             <div className="flex gap-4 sm:gap-5">
//               {['Privacy Policy', 'Terms', 'Sitemap'].map(l => (
//                 <a key={l} href="#" className="text-xs hover:text-white/60 transition-colors" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   )
// }


// "use client"
// import Head from 'next/head'
// import Link from 'next/link'
// import { useState, useEffect, useRef } from 'react'

// const CERTS = [
//   { name: 'BIS-CRS' }, { name: 'BIS-ISI' }, { name: 'WPC-ETA' }, { name: 'EPR' },
//   { name: 'LMPC' }, { name: 'CDSCO' }, { name: 'ISO' }, { name: 'BEE' },
// ]

// const SERVICES = [
//   { icon: '🛡️', title: 'BIS-CRS Registration', desc: 'Mandatory certification for electronics & IT products. Testing coordination, document preparation, and end-to-end portal filing with BIS.', tags: ['Electronics', 'IT Products', 'Mandatory'], color: '#3730a3' },
//   { icon: '⭐', title: 'BIS-ISI Mark', desc: 'Indian Standards quality mark for domestic manufacturers. Factory audit preparation, lab coordination, and license issuance.', tags: ['Manufacturing', 'Quality Mark', 'Domestic'], color: '#7c3aed' },
//   { icon: '📡', title: 'WPC-ETA Approval', desc: 'Wireless Planning & Coordination Wing approvals for RF devices including Wi-Fi, Bluetooth, Zigbee, GPS and all wireless products.', tags: ['Wi-Fi', 'Bluetooth', 'RF Devices'], color: '#0d9488' },
//   { icon: '♻️', title: 'EPR Compliance', desc: 'Extended Producer Responsibility filing for plastic packaging, e-waste, and battery categories. Registration, annual targets, and compliance reports.', tags: ['E-Waste', 'Plastics', 'Battery'], color: '#e11d48' },
//   { icon: '💊', title: 'CDSCO Registration', desc: 'Central Drugs Standard Control Organisation approvals for medical devices, diagnostics, and healthcare products. Import license & registration.', tags: ['Medical Devices', 'Diagnostics', 'Healthcare'], color: '#f59e0b' },
//   { icon: '⚖️', title: 'LMPC Registration', desc: 'Legal Metrology Packaged Commodities compliance for importers and manufacturers. Label approvals and Registration Certificate for pre-packed goods.', tags: ['Packaged Goods', 'Importers', 'Labelling'], color: '#3730a3' },
//   { icon: '📋', title: 'ISO Certification', desc: 'ISO 9001 Quality Management, ISO 14001 Environment, ISO 45001 Safety and other sector-specific standards. Gap analysis, implementation & audit.', tags: ['ISO 9001', 'ISO 14001', 'Management'], color: '#7c3aed' },
//   { icon: '⚡', title: 'BEE Star Rating', desc: 'Bureau of Energy Efficiency star label registration for appliances. Mandatory for ACs, refrigerators, fans, pumps, and other energy products.', tags: ['Energy', 'Appliances', 'Star Label'], color: '#0d9488' },
//   { icon: '🌐', title: 'TEC Certification', desc: 'Telecommunication Engineering Centre approvals for telecom equipment. Mandatory for all telecom products sold or used in India.', tags: ['Telecom', 'Equipment', 'Mandatory'], color: '#e11d48' },
// ]

// const STEPS = [
//   { num: '01', icon: '🎯', title: 'Free Consultation', desc: 'We assess your product category, applicable regulations, and design a certification roadmap with timeline and cost estimates.' },
//   { num: '02', icon: '📁', title: 'Document Collection', desc: 'Our team sends you a detailed checklist and collects all technical documents, test reports, labels, and company documents.' },
//   { num: '03', icon: '🔬', title: 'Lab Coordination', desc: 'We coordinate with NABL-accredited labs for product testing, manage sample shipping, and resolve any technical queries.' },
//   { num: '04', icon: '📤', title: 'Application Filing', desc: 'All documents are reviewed, formatted and filed on the appropriate government portals. We track and respond to all queries.' },
//   { num: '05', icon: '🏭', title: 'Audit Support', desc: 'For certifications requiring factory inspections, we provide on-site preparation support and accompany during the audit.' },
//   { num: '06', icon: '🏆', title: 'Certificate Delivery', desc: 'Once approved, we deliver your certificates digitally. We also set up renewal reminders so nothing ever lapses.' },
// ]

// const WHY = [
//   { icon: '👤', title: 'Dedicated Case Manager', desc: 'A single point of contact manages your entire application. No confusion, no chasing multiple people.' },
//   { icon: '📊', title: 'Real-time Dashboard', desc: 'Log in anytime to track your application status, view documents, and see upcoming deadlines.' },
//   { icon: '🔒', title: 'Secure Document Vault', desc: 'All certificates stored securely in our cloud vault with version history and access controls.' },
//   { icon: '🔔', title: 'Smart Renewal Alerts', desc: 'Automated reminders 90, 60, and 30 days before renewal due dates. Never let a certificate lapse.' },
//   { icon: '⚡', title: 'Fast Turnaround', desc: 'Our in-house expertise reduces application time by up to 40% versus industry average.' },
//   { icon: '💰', title: 'Transparent Pricing', desc: 'Fixed professional fees quoted upfront. No surprise charges. Government fees at actual cost.' },
//   { icon: '🌍', title: 'PAN India Service', desc: 'Serving manufacturers and importers across India — Delhi, Mumbai, Bangalore, Chennai and beyond.' },
//   { icon: '📞', title: '24/7 Query Support', desc: 'WhatsApp and email support round the clock. Our team responds within 2 hours, guaranteed.' },
// ]

// const CLIENTS = [
//   { sector: 'Consumer Electronics', count: '120+ clients', icon: '📱' },
//   { sector: 'Medical Devices', count: '85+ clients', icon: '🏥' },
//   { sector: 'FMCG & Packaging', count: '95+ clients', icon: '📦' },
//   { sector: 'Telecom & Wireless', count: '70+ clients', icon: '📡' },
//   { sector: 'Automotive Parts', count: '45+ clients', icon: '🚗' },
//   { sector: 'Industrial Equipment', count: '60+ clients', icon: '⚙️' },
// ]

// const TESTIMONIALS = [
//   { name: 'Rajesh Kumar', company: 'TechCorp Electronics Pvt Ltd', city: 'Delhi', text: 'Power India Services got our BIS-CRS done in 45 days flat. Their team handled everything — testing, filing, query responses. We just provided the product and documents.', rating: 5 },
//   { name: 'Priya Mehta', company: 'MedEquip Imports', city: 'Mumbai', text: 'CDSCO registration seemed impossible until we approached Power India Services. Their expertise in medical device regulations is unmatched. Highly recommended.', rating: 5 },
//   { name: 'Arun Nair', company: 'GreenPack Solutions', city: 'Bangalore', text: 'EPR compliance was a nightmare for us. Their team simplified the entire process, got our registration done, and now manages our annual filings too.', rating: 5 },
// ]

// const FAQS = [
//   { q: 'How long does BIS-CRS certification take?', a: 'BIS-CRS typically takes 30–60 days depending on the product category and lab availability. Some products with existing test reports can be faster.' },
//   { q: 'Do you handle international product certifications?', a: 'We specialize in Indian regulatory certifications. For products requiring CE, FCC or other international marks, we can connect you with our global partners.' },
//   { q: 'What is the difference between BIS-CRS and BIS-ISI?', a: 'BIS-CRS is for electronics and IT products sold in India. BIS-ISI is for Indian manufacturers of goods like steel, cement, and packaged commodities.' },
//   { q: 'Can you handle multiple certifications simultaneously?', a: 'Yes, this is one of our key strengths. We regularly manage BIS + WPC + EPR for the same client, reducing overall time and coordination effort significantly.' },
//   { q: 'Do you offer post-certification support?', a: 'Absolutely. We manage renewals, annual surveillance, factory re-inspections, and any regulatory updates that affect your existing certifications.' },
//   { q: 'What documents are needed to start?', a: 'Typically: company registration documents, product brochure/datasheet, authorized Indian representative details, and product samples for testing.' },
// ]

// const CAREERS = [
//   { role: 'Senior Certification Manager', type: 'Full-time · Delhi / Remote', exp: '3–5 years', skills: ['BIS experience', 'WPC filings', 'Client handling', 'Government portals'], urgent: true },
//   { role: 'Regulatory Affairs Executive', type: 'Full-time · Delhi', exp: '1–3 years', skills: ['EPR compliance', 'CDSCO filings', 'Documentation', 'MS Office'], urgent: false },
//   { role: 'Business Development Executive', type: 'Full-time · Pan India', exp: '2–4 years', skills: ['B2B sales', 'Regulatory knowledge', 'Lead generation', 'CRM tools'], urgent: false },
// ]

// // Stat Counter
// function StatCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
//   const [count, setCount] = useState(0)
//   const ref = useRef<HTMLSpanElement>(null)
//   const started = useRef(false)
//   useEffect(() => {
//     const el = ref.current
//     if (!el) return
//     let timer: ReturnType<typeof setInterval>
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting && !started.current) {
//         started.current = true
//         let s = 0
//         const step = end / (2000 / 16)
//         timer = setInterval(() => {
//           s += step
//           if (s >= end) { setCount(end); clearInterval(timer) }
//           else setCount(Math.floor(s))
//         }, 16)
//       }
//     }, { threshold: 0.5 })
//     obs.observe(el)
//     return () => { obs.disconnect(); clearInterval(timer) }
//   }, [end])
//   return <span ref={ref}>{count}{suffix}</span>
// }

// // FAQ Item
// function FaqItem({ q, a }: { q: string; a: string }) {
//   const [open, setOpen] = useState(false)
//   return (
//     <div style={{ border: `1px solid ${open ? '#7c3aed' : '#e2e8f0'}`, borderRadius: 16, overflow: 'hidden', marginBottom: 12, boxShadow: open ? '0 8px 24px rgba(124,58,237,0.12)' : 'none', transition: 'box-shadow 0.3s' }}>
//       <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '18px 22px', textAlign: 'left', background: open ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#fff', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}>
//         <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, color: open ? '#fff' : '#1e293b', lineHeight: 1.4 }}>{q}</span>
//         <span style={{ fontSize: 22, color: open ? '#fcd34d' : '#7c3aed', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0, lineHeight: 1 }}>+</span>
//       </button>
//       {open && <div style={{ padding: '16px 22px', background: '#f8fafc', fontSize: 14, color: '#475569', lineHeight: 1.75 }}>{a}</div>}
//     </div>
//   )
// }

// export default function Home() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [activeTestimonial, setActiveTestimonial] = useState(0)

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', fn)
//     return () => window.removeEventListener('scroll', fn)
//   }, [])

//   useEffect(() => {
//     const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500)
//     return () => clearInterval(t)
//   }, [])

//   const NAV = ['Services', 'Process', 'Why Us', 'Testimonials', 'Careers', 'FAQ']

//   return (
//     <>
//       <Head>
//         <title>Power India Services | India's #1 Certification & Compliance Consultancy</title>
//         <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE — End-to-end regulatory certification consultants in India." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
//         <style>{`
//           *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//           html { scroll-behavior: smooth; }
//           body { font-family: 'Inter', sans-serif; background: #fefce8; color: #1e293b; overflow-x: hidden; }
//           a { text-decoration: none; }

//           @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
//           @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
//           @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
//           @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }

//           .anim-grad { animation: gradShift 8s ease infinite; background-size: 300% 300%; }
//           .anim-grad-fast { animation: gradShift 6s ease infinite; background-size: 200% 200%; }
//           .anim-float { animation: float 4s ease-in-out infinite; }
//           .anim-fadeup { animation: fadeUp 0.7s ease both; }
//           .pulse-dot { animation: pulseDot 1.5s ease-in-out infinite; }

//           .grad-text {
//             background: linear-gradient(135deg,#f59e0b,#e11d48,#7c3aed);
//             background-size: 200% auto;
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             background-clip: text;
//             animation: gradShift 4s ease infinite;
//           }

//           .card {
//             background: #fff;
//             border: 1px solid #e2e8f0;
//             border-radius: 16px;
//             transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
//           }
//           .card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 20px 48px rgba(55,48,163,0.13);
//             border-color: #a78bfa;
//           }

//           .btn-shine {
//             position: relative; overflow: hidden;
//             transition: transform 0.2s, box-shadow 0.2s;
//             display: inline-flex; align-items: center; justify-content: center;
//           }
//           .btn-shine::after {
//             content: ''; position: absolute; top: 0; left: -100%;
//             width: 60%; height: 100%;
//             background: linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
//             transition: left 0.5s;
//           }
//           .btn-shine:hover::after { left: 150%; }
//           .btn-shine:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.2); }

//           /* ── Responsive Grid Utilities ── */
//           .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
//           .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
//           .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
//           .grid-footer { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }

//           /* ── MOBILE RESPONSIVE ── */
//           @media (max-width: 1024px) {
//             .nav-links { display: none !important; }
//             .hamburger { display: flex !important; }
//             .hero-grid { grid-template-columns: 1fr !important; }
//             .hero-card { display: none !important; }
//             .why-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
//             .why-cards { grid-template-columns: 1fr 1fr !important; }
//             .grid-footer { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
//             .footer-brand { grid-column: 1 / -1 !important; }
//           }

//           @media (max-width: 768px) {
//             .grid-3 { grid-template-columns: 1fr !important; }
//             .grid-4 { grid-template-columns: 1fr 1fr !important; }
//             .grid-2 { grid-template-columns: 1fr !important; }
//             .stats-grid { grid-template-columns: 1fr 1fr !important; }
//             .grid-footer { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
//             .why-cards { grid-template-columns: 1fr !important; }
//             .hero-h1 { font-size: 36px !important; }
//             .section-h2 { font-size: 28px !important; }
//             .cta-h2 { font-size: 30px !important; }
//             .careers-grid { grid-template-columns: 1fr !important; }
//             .clients-grid { grid-template-columns: 1fr !important; }
//           }

//           @media (max-width: 480px) {
//             .hero-h1 { font-size: 30px !important; }
//             .section-h2 { font-size: 24px !important; }
//             .hero-btns { flex-direction: column !important; }
//             .cta-btns { flex-direction: column !important; }
//             .stats-grid { grid-template-columns: 1fr 1fr !important; }
//             .footer-bottom { flex-direction: column !important; gap: 12px !important; text-align: center; }
//           }
//         `}</style>
//       </Head>

//       {/* ══════ NAVBAR ══════ */}
//       <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 24px', background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid #e2e8f0' : 'none', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s ease' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>

//           {/* Logo */}
//           <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: scrolled ? '#1e1b4b' : '#fff', flexShrink: 0 }}>
//             Power<span style={{ color: '#f59e0b' }}>India</span><span style={{ color: scrolled ? '#7c3aed' : '#a78bfa' }}> Services</span>
//           </div>

//           {/* Desktop Nav */}
//           <div className="nav-links" style={{ display: 'flex', gap: 28 }}>
//             {NAV.map(l => (
//               <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{ fontSize: 13, fontWeight: 500, color: scrolled ? '#475569' : 'rgba(255,255,255,0.85)', fontFamily: "'Space Grotesk',sans-serif", transition: 'color 0.2s' }}>{l}</a>
//             ))}
//           </div>

//           {/* Right side */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//             <Link href="/login" className="btn-shine" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: scrolled ? '#fff' : '#1e1b4b', background: scrolled ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#f59e0b', padding: '10px 22px', borderRadius: 10, boxShadow: '0 4px 14px rgba(55,48,163,0.2)' }}>
//               Log In →
//             </Link>

//             {/* Hamburger */}
//             <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
//               style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
//               {menuOpen
//                 ? <svg width={24} height={24} fill="none" stroke={scrolled ? '#1e293b' : '#fff'} strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
//                 : <svg width={24} height={24} fill="none" stroke={scrolled ? '#1e293b' : '#fff'} strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
//               }
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
//             {NAV.map(l => (
//               <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)}
//                 style={{ fontSize: 14, fontWeight: 600, color: '#334155', padding: '12px 0', borderBottom: '1px solid #f1f5f9', fontFamily: "'Space Grotesk',sans-serif" }}>{l}</a>
//             ))}
//             <Link href="/login" onClick={() => setMenuOpen(false)}
//               style={{ marginTop: 12, textAlign: 'center', background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
//               Log In →
//             </Link>
//           </div>
//         )}
//       </nav>

//       {/* ══════ HERO ══════ */}
//       <section className="anim-grad" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg,#1e1b4b 0%,#3730a3 40%,#7c3aed 70%,#0d9488 100%)', position: 'relative', overflow: 'hidden', padding: '100px 24px 80px' }}>
//         <div style={{ position: 'absolute', top: '8%', right: '4%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(245,158,11,0.12)', filter: 'blur(60px)', animation: 'float 6s ease-in-out infinite', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', bottom: '8%', left: '4%', width: 280, height: 280, borderRadius: '50%', background: 'rgba(225,29,72,0.1)', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite reverse', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

//         <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
//           <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'center' }}>

//             {/* Left */}
//             <div className="anim-fadeup" style={{ textAlign: 'left' }}>
//               <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 100, padding: '8px 20px', fontSize: 11, color: '#fcd34d', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20, fontFamily: "'Space Grotesk',sans-serif" }}>
//                 <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
//                 India's #1 Certification Consultancy
//               </div>

//               <h1 className="hero-h1" style={{ fontFamily: "'Playfair Display',serif", fontSize: 54, fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: 18 }}>
//                 Regulatory{' '}<span className="grad-text">Compliance</span><br />
//                 Made <em style={{ fontStyle: 'italic', color: '#fcd34d' }}>Effortless</em>
//               </h1>

//               <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: 32, maxWidth: 520 }}>
//                 India's most trusted certification consultancy. We handle BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE and 20+ regulatory approvals — end-to-end, on time, every time.
//               </p>

//               <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
//                 <a href="#services" className="btn-shine" style={{ background: 'linear-gradient(135deg,#f59e0b,#e11d48)', color: '#fff', padding: '14px 30px', borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
//                   Explore Services ↓
//                 </a>
//                 <a href="mailto:anand@powerindiaservices.com" className="btn-shine" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 30px', borderRadius: 10, fontSize: 15, fontWeight: 700, border: '1.5px solid rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk',sans-serif" }}>
//                   Free Consultation
//                 </a>
//               </div>

//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                 {CERTS.map(c => (
//                   <span key={c.name} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>{c.name}</span>
//                 ))}
//               </div>
//             </div>

//             {/* Floating Card */}
//             <div className="hero-card anim-float" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24, padding: 36, boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
//               <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#fcd34d', fontWeight: 700, marginBottom: 6 }}>Why clients choose us</div>
//               <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>Trusted by 500+ companies across India</p>
//               {[{ label: 'Application Success Rate', val: 98, color: '#10b981' }, { label: 'Clients Retained', val: 94, color: '#f59e0b' }, { label: 'Faster Than Industry Avg', val: 40, color: '#7c3aed', suffix: '%' }].map(s => (
//                 <div key={s.label} style={{ marginBottom: 18 }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
//                     <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{s.label}</span>
//                     <span style={{ fontSize: 13, color: s.color, fontWeight: 700 }}>{s.val}{s.suffix || '%'}</span>
//                   </div>
//                   <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
//                     <div style={{ width: `${s.val}%`, height: '100%', background: s.color, borderRadius: 100 }} />
//                   </div>
//                 </div>
//               ))}
//               <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
//                 {[['500+', 'Certs Done'], ['8+', 'Cert Types'], ['10+', 'Years Exp'], ['100%', 'Transparent']].map(([n, l]) => (
//                   <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 12 }}>
//                     <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: '#fcd34d' }}>{n}</div>
//                     <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{l}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════ STATS ══════ */}
//       <div style={{ background: '#1e1b4b', padding: '0 24px' }}>
//         <div className="stats-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
//           {[{ end: 500, suffix: '+', label: 'Certifications Delivered' }, { end: 98, suffix: '%', label: 'Success Rate' }, { end: 350, suffix: '+', label: 'Happy Clients' }, { end: 10, suffix: '+', label: 'Years of Expertise' }, { end: 20, suffix: '+', label: 'Cert Categories' }].map(s => (
//             <div key={s.label} style={{ textAlign: 'center', padding: '28px 12px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
//               <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: '#f59e0b' }}>
//                 <StatCounter end={s.end} suffix={s.suffix} />
//               </div>
//               <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ══════ SERVICES ══════ */}
//       <section id="services" style={{ padding: '80px 24px', background: '#fefce8' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: 56 }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 18px', borderRadius: 100, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif" }}>Our Services</div>
//             <h2 className="section-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: '#1e1b4b', marginBottom: 14, lineHeight: 1.2 }}>
//               Every Certification,<br /><span className="grad-text">We Handle It All</span>
//             </h2>
//             <p style={{ fontSize: 16, color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>From testing coordination to government portal filing — complete process management with zero hassle.</p>
//           </div>
//           <div className="grid-3">
//             {SERVICES.map(s => (
//               <div key={s.title} className="card" style={{ overflow: 'hidden', position: 'relative' }}>
//                 <div style={{ height: 3, background: `linear-gradient(90deg,${s.color},${s.color}88)` }} />
//                 <div style={{ padding: '24px 22px' }}>
//                   <div style={{ fontSize: 30, marginBottom: 14 }}>{s.icon}</div>
//                   <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: '#1e1b4b', marginBottom: 8 }}>{s.title}</h3>
//                   <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75, marginBottom: 14 }}>{s.desc}</p>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
//                     {s.tags.map(t => <span key={t} style={{ background: `${s.color}12`, color: s.color, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════ INDUSTRIES ══════ */}
//       <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg,#1e1b4b,#3730a3)' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: 48 }}>
//             <h2 className="section-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 10 }}>Industries We Serve</h2>
//             <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15 }}>Trusted by companies across sectors throughout India</p>
//           </div>
//           <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
//             {CLIENTS.map(c => (
//               <div key={c.sector} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'center', transition: 'transform 0.3s,box-shadow 0.3s' }}>
//                 <div style={{ fontSize: 36, flexShrink: 0 }}>{c.icon}</div>
//                 <div>
//                   <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, color: '#fff' }}>{c.sector}</div>
//                   <div style={{ fontSize: 13, color: '#fcd34d', marginTop: 2 }}>{c.count}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════ PROCESS ══════ */}
//       <section id="process" style={{ padding: '80px 24px', background: '#f8fafc' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: 56 }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#0d9488,#3730a3)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 18px', borderRadius: 100, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif" }}>Our Process</div>
//             <h2 className="section-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: '#1e1b4b', marginBottom: 14 }}>
//               6 Steps to <span className="grad-text">Certification Success</span>
//             </h2>
//             <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>A proven, transparent workflow that keeps you informed at every stage.</p>
//           </div>
//           <div className="grid-3">
//             {STEPS.map(s => (
//               <div key={s.num} className="card" style={{ padding: '26px 22px', position: 'relative', overflow: 'hidden' }}>
//                 <div style={{ position: 'absolute', top: 16, right: 18, fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>{s.num}</div>
//                 <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
//                 <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: '#1e1b4b', marginBottom: 8 }}>{s.title}</h3>
//                 <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75 }}>{s.desc}</p>
//                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#3730a3,#7c3aed)' }} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════ WHY US ══════ */}
//       <section id="why-us" style={{ padding: '80px 24px', background: '#fefce8' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto' }}>
//           <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 56, alignItems: 'start' }}>
//             <div style={{ textAlign: 'left' }}>
//               <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#e11d48,#f59e0b)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 18px', borderRadius: 100, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif" }}>Why Choose Us</div>
//               <h2 className="section-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 900, color: '#1e1b4b', marginBottom: 16, lineHeight: 1.2 }}>
//                 We Don't Just File —<br /><span className="grad-text">We Deliver Results</span>
//               </h2>
//               <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8, marginBottom: 28 }}>Our process-first approach, deep regulatory expertise, and client-centric model sets us apart from every other consultancy in India.</p>
//               <a href="mailto:anand@powerindiaservices.com" className="btn-shine" style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
//                 Get Started Today →
//               </a>
//             </div>
//             <div className="why-cards grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//               {WHY.map(w => (
//                 <div key={w.title} className="card" style={{ padding: '18px 16px' }}>
//                   <div style={{ fontSize: 22, marginBottom: 10 }}>{w.icon}</div>
//                   <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: '#1e1b4b', marginBottom: 5 }}>{w.title}</h4>
//                   <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.65 }}>{w.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════ TESTIMONIALS ══════ */}
//       <section id="testimonials" style={{ padding: '80px 24px', background: 'linear-gradient(135deg,#7c3aed,#3730a3,#1e1b4b)', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
//         <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
//           <div style={{ textAlign: 'center', marginBottom: 48 }}>
//             <h2 className="section-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 900, color: '#fff', marginBottom: 10 }}>What Our Clients Say</h2>
//             <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Real results, real businesses</p>
//           </div>
//           <div style={{ position: 'relative', minHeight: 280 }}>
//             {TESTIMONIALS.map((t, i) => (
//               <div key={t.name} style={{ position: 'absolute', inset: 0, transition: 'opacity 0.7s,transform 0.7s', opacity: i === activeTestimonial ? 1 : 0, transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(18px)', pointerEvents: i === activeTestimonial ? 'auto' : 'none' }}>
//                 <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '36px 32px' }}>
//                   <div style={{ fontSize: 32, color: '#fcd34d', marginBottom: 16, fontFamily: 'serif' }}>"</div>
//                   <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 22 }}>{t.text}</p>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
//                     <div>
//                       <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: '#fcd34d' }}>{t.name}</div>
//                       <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{t.company} · {t.city}</div>
//                     </div>
//                     <div>{[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: 18 }}>★</span>)}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 300 }}>
//             {TESTIMONIALS.map((_, i) => (
//               <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 28 : 8, height: 8, borderRadius: 100, border: 'none', cursor: 'pointer', background: i === activeTestimonial ? '#f59e0b' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════ FAQ ══════ */}
//       <section id="faq" style={{ padding: '80px 24px', background: '#f8fafc' }}>
//         <div style={{ maxWidth: 740, margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: 48 }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#0d9488,#3730a3)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 18px', borderRadius: 100, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif" }}>FAQ</div>
//             <h2 className="section-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 900, color: '#1e1b4b', marginBottom: 10 }}>Frequently Asked Questions</h2>
//             <p style={{ fontSize: 15, color: '#64748b' }}>Can't find your answer? Email us at <a href="mailto:anand@powerindiaservices.com" style={{ color: '#7c3aed' }}>anand@powerindiaservices.com</a></p>
//           </div>
//           {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
//         </div>
//       </section>

//       {/* ══════ CAREERS ══════ */}
//       <section id="careers" style={{ padding: '80px 24px', background: '#fefce8' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: 56 }}>
//             <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#e11d48,#f59e0b)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 18px', borderRadius: 100, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif" }}>We're Hiring</div>
//             <h2 className="section-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: '#1e1b4b', marginBottom: 14 }}>Join Our Growing Team</h2>
//             <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>Be part of India's fastest-growing regulatory consultancy. Great culture, learning opportunities, and competitive pay.</p>
//           </div>
//           <div className="careers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
//             {CAREERS.map(job => (
//               <div key={job.role} className="card" style={{ padding: '28px 26px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//                 {job.urgent && <div style={{ position: 'absolute', top: 16, right: 16, background: '#e11d48', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, fontFamily: "'Space Grotesk',sans-serif" }}>URGENT</div>}
//                 <div style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 100, display: 'inline-block', marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif", width: 'fit-content' }}>{job.type}</div>
//                 <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#1e1b4b', marginBottom: 6 }}>{job.role}</h3>
//                 <div style={{ fontSize: 13, color: '#7c3aed', fontWeight: 600, marginBottom: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Experience: {job.exp}</div>
//                 <div style={{ flex: 1, marginBottom: 22 }}>
//                   {job.skills.map(sk => (
//                     <div key={sk} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, color: '#475569' }}>
//                       <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {sk}
//                     </div>
//                   ))}
//                 </div>
//                 <a href="mailto:anand@powerindiaservices.com" className="btn-shine" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#1e1b4b,#3730a3)', color: '#fff', padding: 13, borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
//                   Apply Now →
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════ CTA ══════ */}
//       <section className="anim-grad-fast" style={{ padding: '80px 24px', textAlign: 'center', background: 'linear-gradient(135deg,#f59e0b 0%,#e11d48 50%,#7c3aed 100%)', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
//         <div style={{ position: 'relative', zIndex: 2, maxWidth: 680, margin: '0 auto' }}>
//           <h2 className="cta-h2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 14, lineHeight: 1.15 }}>
//             Ready to Get Your<br />Product Certified?
//           </h2>
//           <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 36, lineHeight: 1.75 }}>
//             Speak with our certification experts today. Free 30-minute consultation for all new clients. No commitment required.
//           </p>
//           <div className="cta-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//             <a href="mailto:anand@powerindiaservices.com" className="btn-shine" style={{ background: '#fff', color: '#3730a3', padding: '15px 34px', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>Email Us Now</a>
//             <a href="tel:+917217698176" className="btn-shine" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '15px 34px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: '2px solid rgba(255,255,255,0.4)', fontFamily: "'Space Grotesk',sans-serif" }}>📞 +91 72176 98176</a>
//           </div>
//         </div>
//       </section>

//       {/* ══════ FOOTER ══════ */}
//       <footer style={{ background: '#0f0d2e', padding: '72px 24px 0' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto' }}>
//           <div className="grid-footer" style={{ paddingBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

//             {/* Brand */}
//             <div className="footer-brand">
//               <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 14 }}>
//                 Power<span style={{ color: '#f59e0b' }}>India</span> <span style={{ color: '#a78bfa' }}>Services</span>
//               </div>
//               <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 22, maxWidth: 280, color: 'rgba(255,255,255,0.55)' }}>
//                 India's most trusted regulatory certification consultancy. We help manufacturers and importers navigate complex compliance requirements.
//               </p>
//               <div style={{ display: 'flex', gap: 10 }}>
//                 {['📧', '📞', '💼', '🐦'].map((ic, i) => (
//                   <div key={i} style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>{ic}</div>
//                 ))}
//               </div>
//             </div>

//             {/* Services */}
//             <div>
//               <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 18 }}>Services</div>
//               {['BIS-CRS', 'BIS-ISI', 'WPC-ETA', 'EPR Compliance', 'CDSCO', 'LMPC', 'ISO', 'BEE Rating'].map(s => (
//                 <div key={s} style={{ marginBottom: 10 }}>
//                   <a href="#services" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{s}</a>
//                 </div>
//               ))}
//             </div>

//             {/* Company */}
//             <div>
//               <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 18 }}>Company</div>
//               {['About Us', 'Process', 'Why Choose Us', 'Testimonials', 'Careers', 'Privacy Policy', 'Terms of Service'].map(s => (
//                 <div key={s} style={{ marginBottom: 10 }}>
//                   <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{s}</a>
//                 </div>
//               ))}
//             </div>

//             {/* Contact */}
//             <div>
//               <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 18 }}>Contact</div>
//               <div style={{ marginBottom: 14 }}>
//                 <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: 12, marginBottom: 4 }}>Email</div>
//                 <a href="mailto:anand@powerindiaservices.com" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', wordBreak: 'break-all' }}>anand@powerindiaservices.com</a>
//               </div>
//               <div style={{ marginBottom: 14 }}>
//                 <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: 12, marginBottom: 4 }}>Phone</div>
//                 <a href="tel:+917217698176" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+91 72176 98176</a>
//               </div>
//               <div style={{ marginBottom: 18 }}>
//                 <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: 12, marginBottom: 4 }}>Office</div>
//                 <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>New Delhi, India</span>
//               </div>
//               <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
//                 <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', flexShrink: 0, animation: 'pulseDot 1.5s infinite' }} />
//                 <span style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 500 }}>Mon–Sat, 9am–7pm IST</span>
//               </div>
//             </div>
//           </div>

//           {/* Cert pills */}
//           <div style={{ padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
//             <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: 6 }}>Certifications:</span>
//             {CERTS.map(c => (
//               <span key={c.name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '4px 14px', fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk',sans-serif" }}>{c.name}</span>
//             ))}
//           </div>

//           {/* Bottom */}
//           <div className="footer-bottom" style={{ padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
//             <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2026 Power India Services. All rights reserved. | CIN: U74900DL2015PTC123456</span>
//             <div style={{ display: 'flex', gap: 20 }}>
//               {['Privacy Policy', 'Terms', 'Sitemap'].map(l => (
//                 <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   )
// }

"use client"
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

/* ─── DATA ─────────────────────────────────────────────────────── */
const CERTS = ['BIS-CRS','BIS-ISI','WPC-ETA','EPR','LMPC','CDSCO','ISO','BEE']

const SERVICES = [
  { icon:'🛡️', title:'BIS-CRS Registration', desc:'Mandatory certification for electronics & IT products. Testing coordination, document preparation, and end-to-end portal filing with BIS.', tags:['Electronics','IT Products','Mandatory'], color:'#3730a3' },
  { icon:'⭐', title:'BIS-ISI Mark', desc:'Indian Standards quality mark for domestic manufacturers. Factory audit preparation, lab coordination, and license issuance.', tags:['Manufacturing','Quality Mark','Domestic'], color:'#7c3aed' },
  { icon:'📡', title:'WPC-ETA Approval', desc:'Wireless Planning & Coordination Wing approvals for RF devices including Wi-Fi, Bluetooth, Zigbee, GPS and all wireless products.', tags:['Wi-Fi','Bluetooth','RF Devices'], color:'#0d9488' },
  { icon:'♻️', title:'EPR Compliance', desc:'Extended Producer Responsibility filing for plastic packaging, e-waste, and battery categories. Registration, annual targets, and compliance reports.', tags:['E-Waste','Plastics','Battery'], color:'#e11d48' },
  { icon:'💊', title:'CDSCO Registration', desc:'Central Drugs Standard Control Organisation approvals for medical devices, diagnostics, and healthcare products. Import license & registration.', tags:['Medical Devices','Diagnostics','Healthcare'], color:'#f59e0b' },
  { icon:'⚖️', title:'LMPC Registration', desc:'Legal Metrology Packaged Commodities compliance for importers and manufacturers. Label approvals and Registration Certificate for pre-packed goods.', tags:['Packaged Goods','Importers','Labelling'], color:'#3730a3' },
  { icon:'📋', title:'ISO Certification', desc:'ISO 9001 Quality Management, ISO 14001 Environment, ISO 45001 Safety and other sector-specific standards. Gap analysis, implementation & audit.', tags:['ISO 9001','ISO 14001','Management'], color:'#7c3aed' },
  { icon:'⚡', title:'BEE Star Rating', desc:'Bureau of Energy Efficiency star label registration for appliances. Mandatory for ACs, refrigerators, fans, pumps, and other energy products.', tags:['Energy','Appliances','Star Label'], color:'#0d9488' },
  { icon:'🌐', title:'TEC Certification', desc:'Telecommunication Engineering Centre approvals for telecom equipment. Mandatory for all telecom products sold or used in India.', tags:['Telecom','Equipment','Mandatory'], color:'#e11d48' },
]

const STEPS = [
  { num:'01', icon:'🎯', title:'Free Consultation', desc:'We assess your product category, applicable regulations, and design a certification roadmap with timeline and cost estimates.' },
  { num:'02', icon:'📁', title:'Document Collection', desc:'Our team sends you a detailed checklist and collects all technical documents, test reports, labels, and company documents.' },
  { num:'03', icon:'🔬', title:'Lab Coordination', desc:'We coordinate with NABL-accredited labs for product testing, manage sample shipping, and resolve any technical queries.' },
  { num:'04', icon:'📤', title:'Application Filing', desc:'All documents are reviewed, formatted and filed on the appropriate government portals. We track and respond to all queries.' },
  { num:'05', icon:'🏭', title:'Audit Support', desc:'For certifications requiring factory inspections, we provide on-site preparation support and accompany during the audit.' },
  { num:'06', icon:'🏆', title:'Certificate Delivery', desc:'Once approved, we deliver your certificates digitally. We also set up renewal reminders so nothing ever lapses.' },
]

const WHY = [
  { icon:'👤', title:'Dedicated Case Manager', desc:'A single point of contact manages your entire application. No confusion, no chasing multiple people.' },
  { icon:'📊', title:'Real-time Dashboard', desc:'Log in anytime to track your application status, view documents, and see upcoming deadlines.' },
  { icon:'🔒', title:'Secure Document Vault', desc:'All certificates stored securely in our cloud vault with version history and access controls.' },
  { icon:'🔔', title:'Smart Renewal Alerts', desc:'Automated reminders 90, 60, and 30 days before renewal due dates. Never let a certificate lapse.' },
  { icon:'⚡', title:'Fast Turnaround', desc:'Our in-house expertise reduces application time by up to 40% versus industry average.' },
  { icon:'💰', title:'Transparent Pricing', desc:'Fixed professional fees quoted upfront. No surprise charges. Government fees at actual cost.' },
  { icon:'🌍', title:'PAN India Service', desc:'Serving manufacturers and importers across India — Delhi, Mumbai, Bangalore, Chennai and beyond.' },
  { icon:'📞', title:'24/7 Query Support', desc:'WhatsApp and email support round the clock. Our team responds within 2 hours, guaranteed.' },
]

const CLIENTS = [
  { sector:'Consumer Electronics', count:'120+ clients', icon:'📱' },
  { sector:'Medical Devices', count:'85+ clients', icon:'🏥' },
  { sector:'FMCG & Packaging', count:'95+ clients', icon:'📦' },
  { sector:'Telecom & Wireless', count:'70+ clients', icon:'📡' },
  { sector:'Automotive Parts', count:'45+ clients', icon:'🚗' },
  { sector:'Industrial Equipment', count:'60+ clients', icon:'⚙️' },
]

const TESTIMONIALS = [
  { name:'Rajesh Kumar', company:'TechCorp Electronics Pvt Ltd', city:'Delhi', text:'Power India Services got our BIS-CRS done in 45 days flat. Their team handled everything — testing, filing, query responses. We just provided the product and documents.', rating:5 },
  { name:'Priya Mehta', company:'MedEquip Imports', city:'Mumbai', text:'CDSCO registration seemed impossible until we approached Power India Services. Their expertise in medical device regulations is unmatched. Highly recommended.', rating:5 },
  { name:'Arun Nair', company:'GreenPack Solutions', city:'Bangalore', text:'EPR compliance was a nightmare for us. Their team simplified the entire process, got our registration done, and now manages our annual filings too.', rating:5 },
]

const FAQS = [
  { q:'How long does BIS-CRS certification take?', a:'BIS-CRS typically takes 30–60 days depending on the product category and lab availability. Some products with existing test reports can be faster.' },
  { q:'Do you handle international product certifications?', a:'We specialize in Indian regulatory certifications. For products requiring CE, FCC or other international marks, we can connect you with our global partners.' },
  { q:'What is the difference between BIS-CRS and BIS-ISI?', a:'BIS-CRS is for electronics and IT products sold in India. BIS-ISI is for Indian manufacturers of goods like steel, cement, and packaged commodities.' },
  { q:'Can you handle multiple certifications simultaneously?', a:'Yes, this is one of our key strengths. We regularly manage BIS + WPC + EPR for the same client, reducing overall time and coordination effort significantly.' },
  { q:'Do you offer post-certification support?', a:'Absolutely. We manage renewals, annual surveillance, factory re-inspections, and any regulatory updates that affect your existing certifications.' },
  { q:'What documents are needed to start?', a:'Typically: company registration documents, product brochure/datasheet, authorized Indian representative details, and product samples for testing.' },
]

const CAREERS = [
  { role:'Senior Certification Manager', type:'Full-time · Delhi / Remote', exp:'3–5 years', skills:['BIS experience','WPC filings','Client handling','Government portals'], urgent:true },
  { role:'Regulatory Affairs Executive', type:'Full-time · Delhi', exp:'1–3 years', skills:['EPR compliance','CDSCO filings','Documentation','MS Office'], urgent:false },
  { role:'Business Development Executive', type:'Full-time · Pan India', exp:'2–4 years', skills:['B2B sales','Regulatory knowledge','Lead generation','CRM tools'], urgent:false },
]

/* ─── HOOK ──────────────────────────────────────────────────────── */
function useWidth() {
  const [w, setW] = useState(1200)
  useEffect(() => {
    const update = () => setW(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return w
}

/* ─── STAT COUNTER ──────────────────────────────────────────────── */
function StatCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let timer: ReturnType<typeof setInterval>
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; let s = 0; const step = end / (2000 / 16)
        timer = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(timer) } else setCount(Math.floor(s)) }, 16)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => { obs.disconnect(); clearInterval(timer) }
  }, [end])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── FAQ ITEM ──────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: `1px solid ${open ? '#7c3aed' : '#e2e8f0'}`, borderRadius: 14, overflow: 'hidden', marginBottom: 10, boxShadow: open ? '0 6px 20px rgba(124,58,237,0.1)' : 'none', transition: 'box-shadow 0.3s' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '15px 18px', textAlign: 'left', background: open ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#fff', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: open ? '#fff' : '#1e293b', lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 20, color: open ? '#fcd34d' : '#7c3aed', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>+</span>
      </button>
      {open && <div style={{ padding: '14px 18px', background: '#f8fafc', fontSize: 13, color: '#475569', lineHeight: 1.75 }}>{a}</div>}
    </div>
  )
}

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function Home() {
  const w = useWidth()
  const isMobile = w <= 480
  const isTablet = w <= 768
  const isLaptop = w <= 1024

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(t)
  }, [])

  const NAV = ['Services','Process','Why Us','Testimonials','Careers','FAQ']
  const px = isMobile ? '16px' : isTablet ? '20px' : '28px'
  const sectionPy = isMobile ? '52px' : isTablet ? '60px' : '80px'

  /* ── grid helpers ── */
  const g3 = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3,1fr)'
  const g2 = isMobile ? '1fr' : '1fr 1fr'
  const gFooter = isTablet ? '1fr 1fr' : '2fr 1fr 1fr 1fr'

  /* ── font helpers ── */
  const h1Size = isMobile ? 28 : isTablet ? 36 : isLaptop ? 44 : 52
  const h2Size = isMobile ? 22 : isTablet ? 28 : 36
  const ctaH2 = isMobile ? 24 : isTablet ? 30 : 40

  return (
    <>
      <Head>
        <title>Power India Services | India's #1 Certification & Compliance Consultancy</title>
        <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE — End-to-end regulatory certification consultants in India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          html{scroll-behavior:smooth}
          body{font-family:'Inter',sans-serif;background:#fefce8;color:#1e293b;overflow-x:hidden}
          a{text-decoration:none}
          @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
          @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
          @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
          @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
          .agrad{animation:gradShift 8s ease infinite;background-size:300% 300%}
          .agradf{animation:gradShift 6s ease infinite;background-size:200% 200%}
          .afloat{animation:float 4s ease-in-out infinite}
          .afadeup{animation:fadeUp 0.7s ease both}
          .apulse{animation:pulse 1.5s ease-in-out infinite}
          .gtext{background:linear-gradient(135deg,#f59e0b,#e11d48,#7c3aed);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 4s ease infinite}
          .card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;transition:transform .3s,box-shadow .3s,border-color .3s}
          .card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(55,48,163,.12);border-color:#a78bfa}
          .bshine{position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;display:inline-flex;align-items:center;justify-content:center}
          .bshine::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);transition:left .5s}
          .bshine:hover::after{left:150%}
          .bshine:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.18)}
        `}</style>
      </Head>

      {/* ══ NAVBAR ══ */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, padding:`0 ${px}`, background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(18px)' : 'none', borderBottom: scrolled ? '1px solid #e2e8f0' : 'none', boxShadow: scrolled ? '0 2px 18px rgba(0,0,0,.06)' : 'none', transition:'all .3s' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize: isMobile ? 17 : 20, fontWeight:900, color: scrolled ? '#1e1b4b' : '#fff', flexShrink:0 }}>
            Power <span style={{ color:'#f59e0b' }}>India</span> <span style={{ color: scrolled ? '#7c3aed' : '#a78bfa' }}> Services</span>
          </div>

          {/* Desktop links */}
          {!isLaptop && (
            <div style={{ display:'flex', gap:24 }}>
              {NAV.map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} style={{ fontSize:13, fontWeight:500, color: scrolled ? '#475569' : 'rgba(255,255,255,0.85)', fontFamily:"'Space Grotesk',sans-serif" }}>{l}</a>
              ))}
            </div>
          )}

          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <Link href="/login" className="bshine" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:700, color: scrolled ? '#fff' : '#1e1b4b', background: scrolled ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#f59e0b', padding:'9px 18px', borderRadius:9, boxShadow:'0 4px 12px rgba(55,48,163,.2)' }}>
              Log In →
            </Link>
            {isLaptop && (
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', cursor:'pointer', padding:6, display:'flex', alignItems:'center' }}>
                <svg width={24} height={24} fill="none" stroke={scrolled ? '#1e293b' : '#fff'} strokeWidth={2} viewBox="0 0 24 24">
                  {menuOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && isLaptop && (
          <div style={{ background:'#fff', borderTop:'1px solid #f1f5f9', padding:`10px ${px} 16px`, display:'flex', flexDirection:'column', gap:2, boxShadow:'0 8px 24px rgba(0,0,0,.09)' }}>
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} onClick={() => setMenuOpen(false)}
                style={{ fontSize:14, fontWeight:600, color:'#334155', padding:'11px 0', borderBottom:'1px solid #f1f5f9', fontFamily:"'Space Grotesk',sans-serif" }}>{l}</a>
            ))}
            <Link href="/login" onClick={() => setMenuOpen(false)}
              style={{ marginTop:10, textAlign:'center', background:'linear-gradient(135deg,#3730a3,#7c3aed)', color:'#fff', padding:'12px', borderRadius:9, fontSize:14, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>
              Log In →
            </Link>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section className="agrad" style={{ minHeight:'100vh', display:'flex', alignItems:'center', background:'linear-gradient(135deg,#1e1b4b 0%,#3730a3 40%,#7c3aed 70%,#0d9488 100%)', position:'relative', overflow:'hidden', padding:`100px ${px} 72px` }}>
        <div style={{ position:'absolute', top:'8%', right:'4%', width:isTablet ? 160 : 280, height:isTablet ? 160 : 280, borderRadius:'50%', background:'rgba(245,158,11,.12)', filter:'blur(60px)', animation:'float 6s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'8%', left:'4%', width:isTablet ? 120 : 220, height:isTablet ? 120 : 220, borderRadius:'50%', background:'rgba(225,29,72,.1)', filter:'blur(60px)', animation:'float 8s ease-in-out infinite reverse', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:1100, margin:'0 auto', width:'100%' }}>
          <div style={{ display:'grid', gridTemplateColumns: isTablet ? '1fr' : isLaptop ? '1fr 340px' : '1fr 400px', gap: isTablet ? 28 : 52, alignItems:'center' }}>

            {/* Left */}
            <div className="afadeup" style={{ textAlign: isTablet ? 'center' : 'left', display:'flex', flexDirection:'column', alignItems: isTablet ? 'center' : 'flex-start' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(245,158,11,.15)', border:'1px solid rgba(245,158,11,.4)', borderRadius:100, padding:'7px 16px', fontSize:11, color:'#fcd34d', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:700, marginBottom:18, fontFamily:"'Space Grotesk',sans-serif" }}>
                <span className="apulse" style={{ width:7, height:7, borderRadius:'50%', background:'#f59e0b', display:'inline-block' }} />
                India's #1 Certification Consultancy
              </div>

              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:h1Size, fontWeight:900, lineHeight:1.12, color:'#fff', marginBottom:16 }}>
                Regulatory{' '}<span className="gtext">Compliance</span><br />
                Made <em style={{ fontStyle:'italic', color:'#fcd34d' }}>Effortless</em>
              </h1>

              <p style={{ fontSize: isMobile ? 14 : 15, color:'rgba(255,255,255,.72)', lineHeight:1.8, marginBottom:26, maxWidth:480 }}>
                India's most trusted certification consultancy. We handle BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE and 20+ regulatory approvals — end-to-end, on time, every time.
              </p>

              <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:28, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row' }}>
                <a href="#services" className="bshine" style={{ background:'linear-gradient(135deg,#f59e0b,#e11d48)', color:'#fff', padding:'13px 26px', borderRadius:10, fontSize:14, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif", textAlign:'center' }}>
                  Explore Services ↓
                </a>
                <a href="mailto:anand@powerindiaservices.com" className="bshine" style={{ background:'rgba(255,255,255,.1)', color:'#fff', padding:'13px 26px', borderRadius:10, fontSize:14, fontWeight:700, border:'1.5px solid rgba(255,255,255,.3)', fontFamily:"'Space Grotesk',sans-serif", textAlign:'center' }}>
                  Free Consultation
                </a>
              </div>

              <div style={{ display:'flex', gap:7, flexWrap:'wrap', justifyContent: isTablet ? 'center' : 'flex-start' }}>
                {CERTS.map(c => (
                  <span key={c} style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)', borderRadius:100, padding:'5px 12px', fontSize:11, color:'#fff', fontFamily:"'Space Grotesk',sans-serif", fontWeight:500 }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Floating Card — hidden on mobile, shown on tablet+ */}
            {!isMobile && (
              <div className="afloat" style={{ background:'rgba(255,255,255,.08)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,.15)', borderRadius:22, padding: isTablet ? 22 : 28, boxShadow:'0 36px 72px rgba(0,0,0,.28)', width:'100%' }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:'#fcd34d', fontWeight:700, marginBottom:4 }}>Why clients choose us</div>
                <p style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginBottom:18 }}>Trusted by 500+ companies across India</p>
                {[{ label:'Application Success Rate', val:98, color:'#10b981' }, { label:'Clients Retained', val:94, color:'#f59e0b' }, { label:'Faster Than Industry Avg', val:40, color:'#7c3aed', suffix:'%' }].map(s => (
                  <div key={s.label} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:12, color:'rgba(255,255,255,.75)', fontWeight:500 }}>{s.label}</span>
                      <span style={{ fontSize:12, color:s.color, fontWeight:700 }}>{s.val}{s.suffix||'%'}</span>
                    </div>
                    <div style={{ background:'rgba(255,255,255,.1)', borderRadius:100, height:5, overflow:'hidden' }}>
                      <div style={{ width:`${s.val}%`, height:'100%', background:s.color, borderRadius:100 }} />
                    </div>
                  </div>
                ))}
                <div style={{ borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {[['500+','Certs Done'],['8+','Cert Types'],['10+','Years Exp'],['100%','Transparent']].map(([n,l]) => (
                    <div key={l} style={{ textAlign:'center', background:'rgba(255,255,255,.06)', borderRadius:9, padding:9 }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:900, color:'#fcd34d' }}>{n}</div>
                      <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div style={{ background:'#1e1b4b', padding:`0 ${px}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(3,1fr)' : 'repeat(5,1fr)', borderLeft:'1px solid rgba(255,255,255,.08)' }}>
          {[{ end:500, suffix:'+', label:'Certifications Delivered' }, { end:98, suffix:'%', label:'Success Rate' }, { end:350, suffix:'+', label:'Happy Clients' }, { end:10, suffix:'+', label:'Years Expertise' }, { end:20, suffix:'+', label:'Cert Categories' }].map((s, i) => (
            <div key={s.label} style={{ textAlign:'center', padding: isMobile ? '18px 8px' : '24px 10px', borderRight:'1px solid rgba(255,255,255,.08)', display: (isMobile && i >= 4) ? 'none' : 'block' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize: isMobile ? 22 : 26, fontWeight:900, color:'#f59e0b' }}>
                <StatCounter end={s.end} suffix={s.suffix} />
              </div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,.4)', marginTop:3, fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding:`${sectionPy} ${px}`, background:'#fefce8' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom: isMobile ? 32 : 44 }}>
            <div style={{ display:'inline-block', background:'linear-gradient(135deg,#3730a3,#7c3aed)', color:'#fff', fontSize:11, fontWeight:700, padding:'5px 14px', borderRadius:100, letterSpacing:'2px', textTransform:'uppercase', marginBottom:12, fontFamily:"'Space Grotesk',sans-serif" }}>Our Services</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:h2Size, fontWeight:900, color:'#1e1b4b', marginBottom:10, lineHeight:1.2 }}>
              Every Certification,<br /><span className="gtext">We Handle It All</span>
            </h2>
            <p style={{ fontSize: isMobile ? 13 : 15, color:'#64748b', maxWidth:480, margin:'0 auto', lineHeight:1.75 }}>From testing coordination to government portal filing — complete process management with zero hassle.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:g3, gap: isMobile ? 12 : 16 }}>
            {SERVICES.map(s => (
              <div key={s.title} className="card" style={{ overflow:'hidden', position:'relative' }}>
                <div style={{ height:3, background:`linear-gradient(90deg,${s.color},${s.color}88)` }} />
                <div style={{ padding: isMobile ? '16px 14px' : '20px 18px' }}>
                  <div style={{ fontSize:24, marginBottom:10 }}>{s.icon}</div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, color:'#1e1b4b', marginBottom:6 }}>{s.title}</h3>
                  <p style={{ fontSize:12, color:'#64748b', lineHeight:1.7, marginBottom:10 }}>{s.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {s.tags.map(t => <span key={t} style={{ background:`${s.color}12`, color:s.color, fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:100, fontFamily:"'Space Grotesk',sans-serif" }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ══ */}
      <section style={{ padding:`${sectionPy} ${px}`, background:'linear-gradient(135deg,#1e1b4b,#3730a3)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom: isMobile ? 28 : 40 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:h2Size, fontWeight:900, color:'#fff', marginBottom:8 }}>Industries We Serve</h2>
            <p style={{ color:'rgba(255,255,255,.55)', fontSize:14 }}>Trusted by companies across sectors throughout India</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:g3, gap: isMobile ? 10 : 14 }}>
            {CLIENTS.map(c => (
              <div key={c.sector} style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', borderRadius:13, padding: isMobile ? '14px' : '18px', display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ fontSize:28, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: isMobile ? 13 : 14, fontWeight:600, color:'#fff' }}>{c.sector}</div>
                  <div style={{ fontSize:12, color:'#fcd34d', marginTop:2 }}>{c.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section id="process" style={{ padding:`${sectionPy} ${px}`, background:'#f8fafc' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom: isMobile ? 32 : 44 }}>
            <div style={{ display:'inline-block', background:'linear-gradient(135deg,#0d9488,#3730a3)', color:'#fff', fontSize:11, fontWeight:700, padding:'5px 14px', borderRadius:100, letterSpacing:'2px', textTransform:'uppercase', marginBottom:12, fontFamily:"'Space Grotesk',sans-serif" }}>Our Process</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:h2Size, fontWeight:900, color:'#1e1b4b', marginBottom:10 }}>
              6 Steps to <span className="gtext">Certification Success</span>
            </h2>
            <p style={{ fontSize: isMobile ? 13 : 15, color:'#64748b', maxWidth:460, margin:'0 auto', lineHeight:1.75 }}>A proven, transparent workflow that keeps you informed at every stage.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:g3, gap: isMobile ? 12 : 16 }}>
            {STEPS.map(s => (
              <div key={s.num} className="card" style={{ padding: isMobile ? '18px 15px' : '22px 18px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:12, right:14, fontFamily:"'Playfair Display',serif", fontSize:38, fontWeight:900, color:'#f1f5f9', lineHeight:1 }}>{s.num}</div>
                <div style={{ fontSize:24, marginBottom:10 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, color:'#1e1b4b', marginBottom:6 }}>{s.title}</h3>
                <p style={{ fontSize:12, color:'#64748b', lineHeight:1.7 }}>{s.desc}</p>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#3730a3,#7c3aed)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section id="why-us" style={{ padding:`${sectionPy} ${px}`, background:'#fefce8' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns: isTablet ? '1fr' : '300px 1fr', gap: isTablet ? 28 : 52, alignItems:'start' }}>
            <div style={{ textAlign: isTablet ? 'center' : 'left', display:'flex', flexDirection:'column', alignItems: isTablet ? 'center' : 'flex-start' }}>
              <div style={{ display:'inline-block', background:'linear-gradient(135deg,#e11d48,#f59e0b)', color:'#fff', fontSize:11, fontWeight:700, padding:'5px 14px', borderRadius:100, letterSpacing:'2px', textTransform:'uppercase', marginBottom:12, fontFamily:"'Space Grotesk',sans-serif" }}>Why Choose Us</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize: isTablet ? h2Size : 34, fontWeight:900, color:'#1e1b4b', marginBottom:12, lineHeight:1.2 }}>
                We Don't Just File —<br /><span className="gtext">We Deliver Results</span>
              </h2>
              <p style={{ fontSize: isMobile ? 13 : 14, color:'#64748b', lineHeight:1.8, marginBottom:22 }}>Our process-first approach, deep regulatory expertise, and client-centric model sets us apart from every other consultancy in India.</p>
              <a href="mailto:anand@powerindiaservices.com" className="bshine" style={{ background:'linear-gradient(135deg,#3730a3,#7c3aed)', color:'#fff', padding:'12px 24px', borderRadius:10, fontSize:14, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif", width:'fit-content' }}>
                Get Started Today →
              </a>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:g2, gap: isMobile ? 10 : 12 }}>
              {WHY.map(w => (
                <div key={w.title} className="card" style={{ padding: isMobile ? '14px 12px' : '16px 14px' }}>
                  <div style={{ fontSize:20, marginBottom:8 }}>{w.icon}</div>
                  <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:700, color:'#1e1b4b', marginBottom:4 }}>{w.title}</h4>
                  <p style={{ fontSize:12, color:'#64748b', lineHeight:1.6 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section id="testimonials" style={{ padding:`${sectionPy} ${px}`, background:'linear-gradient(135deg,#7c3aed,#3730a3,#1e1b4b)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
        <div style={{ maxWidth:740, margin:'0 auto', position:'relative', zIndex:2 }}>
          <div style={{ textAlign:'center', marginBottom: isMobile ? 28 : 40 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:h2Size, fontWeight:900, color:'#fff', marginBottom:8 }}>What Our Clients Say</h2>
            <p style={{ color:'rgba(255,255,255,.5)', fontSize:14 }}>Real results, real businesses</p>
          </div>
          <div style={{ position:'relative', minHeight: isMobile ? 320 : 260 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} style={{ position:'absolute', inset:0, transition:'opacity .7s,transform .7s', opacity: i === activeTestimonial ? 1 : 0, transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(16px)', pointerEvents: i === activeTestimonial ? 'auto' : 'none' }}>
                <div style={{ background:'rgba(255,255,255,.08)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.15)', borderRadius:17, padding: isMobile ? '20px 16px' : '26px 22px' }}>
                  <div style={{ fontSize:26, color:'#fcd34d', marginBottom:10, fontFamily:'serif' }}>"</div>
                  <p style={{ fontSize: isMobile ? 13 : 15, color:'rgba(255,255,255,.9)', lineHeight:1.8, fontStyle:'italic', marginBottom:16 }}>{t.text}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
                    <div>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, color:'#fcd34d' }}>{t.name}</div>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,.55)' }}>{t.company} · {t.city}</div>
                    </div>
                    <div>{[...Array(t.rating)].map((_,j) => <span key={j} style={{ color:'#f59e0b', fontSize:15 }}>★</span>)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:10, marginTop: isMobile ? 340 : 280 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 26 : 8, height:8, borderRadius:100, border:'none', cursor:'pointer', background: i === activeTestimonial ? '#f59e0b' : 'rgba(255,255,255,.3)', transition:'all .3s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding:`${sectionPy} ${px}`, background:'#f8fafc' }}>
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom: isMobile ? 28 : 40 }}>
            <div style={{ display:'inline-block', background:'linear-gradient(135deg,#0d9488,#3730a3)', color:'#fff', fontSize:11, fontWeight:700, padding:'5px 14px', borderRadius:100, letterSpacing:'2px', textTransform:'uppercase', marginBottom:12, fontFamily:"'Space Grotesk',sans-serif" }}>FAQ</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:h2Size, fontWeight:900, color:'#1e1b4b', marginBottom:8 }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: isMobile ? 13 : 14, color:'#64748b' }}>Can't find your answer? Email us at <a href="mailto:anand@powerindiaservices.com" style={{ color:'#7c3aed' }}>anand@powerindiaservices.com</a></p>
          </div>
          {FAQS.map((f,i) => <FaqItem key={i} {...f} />)}
        </div>
      </section>

      {/* ══ CAREERS ══ */}
      <section id="careers" style={{ padding:`${sectionPy} ${px}`, background:'#fefce8' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom: isMobile ? 32 : 44 }}>
            <div style={{ display:'inline-block', background:'linear-gradient(135deg,#e11d48,#f59e0b)', color:'#fff', fontSize:11, fontWeight:700, padding:'5px 14px', borderRadius:100, letterSpacing:'2px', textTransform:'uppercase', marginBottom:12, fontFamily:"'Space Grotesk',sans-serif" }}>We're Hiring</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:h2Size, fontWeight:900, color:'#1e1b4b', marginBottom:10 }}>Join Our Growing Team</h2>
            <p style={{ fontSize: isMobile ? 13 : 15, color:'#64748b', maxWidth:460, margin:'0 auto', lineHeight:1.75 }}>Be part of India's fastest-growing regulatory consultancy. Great culture, learning, and competitive pay.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:g3, gap: isMobile ? 12 : 18 }}>
            {CAREERS.map(job => (
              <div key={job.role} className="card" style={{ padding: isMobile ? '18px 15px' : '22px 18px', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
                {job.urgent && <div style={{ position:'absolute', top:13, right:13, background:'#e11d48', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:100, fontFamily:"'Space Grotesk',sans-serif" }}>URGENT</div>}
                <div style={{ background:'linear-gradient(135deg,#3730a3,#7c3aed)', color:'#fff', fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:100, display:'inline-block', marginBottom:12, fontFamily:"'Space Grotesk',sans-serif", width:'fit-content' }}>{job.type}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:'#1e1b4b', marginBottom:4 }}>{job.role}</h3>
                <div style={{ fontSize:12, color:'#7c3aed', fontWeight:600, marginBottom:14, fontFamily:"'Space Grotesk',sans-serif" }}>Experience: {job.exp}</div>
                <div style={{ flex:1, marginBottom:16 }}>
                  {job.skills.map(sk => (
                    <div key={sk} style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6, fontSize:13, color:'#475569' }}>
                      <span style={{ color:'#10b981', fontWeight:700 }}>✓</span> {sk}
                    </div>
                  ))}
                </div>
                <a href="mailto:anand@powerindiaservices.com" className="bshine" style={{ display:'block', textAlign:'center', background:'linear-gradient(135deg,#1e1b4b,#3730a3)', color:'#fff', padding:11, borderRadius:9, fontSize:13, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif" }}>
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="agradf" style={{ padding:`${sectionPy} ${px}`, textAlign:'center', background:'linear-gradient(135deg,#f59e0b 0%,#e11d48 50%,#7c3aed 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
        <div style={{ position:'relative', zIndex:2, maxWidth:620, margin:'0 auto' }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:ctaH2, fontWeight:900, color:'#fff', marginBottom:12, lineHeight:1.15 }}>
            Ready to Get Your<br />Product Certified?
          </h2>
          <p style={{ fontSize: isMobile ? 13 : 15, color:'rgba(255,255,255,.85)', marginBottom:28, lineHeight:1.75 }}>
            Speak with our certification experts today. Free 30-minute consultation for all new clients. No commitment required.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', flexDirection: isMobile ? 'column' : 'row', alignItems:'center' }}>
            <a href="mailto:anand@powerindiaservices.com" className="bshine" style={{ background:'#fff', color:'#3730a3', padding:'13px 28px', borderRadius:11, fontSize:14, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif", width: isMobile ? '100%' : 'auto', maxWidth:300 }}>Email Us Now</a>
            <a href="tel:+917217698176" className="bshine" style={{ background:'rgba(255,255,255,.15)', color:'#fff', padding:'13px 28px', borderRadius:11, fontSize:14, fontWeight:700, border:'2px solid rgba(255,255,255,.4)', fontFamily:"'Space Grotesk',sans-serif", width: isMobile ? '100%' : 'auto', maxWidth:300 }}>📞 +91 72176 98176</a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:'#0f0d2e', padding:`${sectionPy} ${px} 0` }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:gFooter, gap: isTablet ? 24 : 44, paddingBottom: isMobile ? 36 : 48, borderBottom:'1px solid rgba(255,255,255,.08)' }}>

            {/* Brand — full width on tablet */}
            <div style={{ gridColumn: isTablet ? '1 / -1' : 'auto' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:'#fff', marginBottom:12 }}>
                Power<span style={{ color:'#f59e0b' }}>India</span> <span style={{ color:'#a78bfa' }}>Services</span>
              </div>
              <p style={{ fontSize:13, lineHeight:1.8, marginBottom:16, maxWidth:280, color:'rgba(255,255,255,.55)' }}>
                India's most trusted regulatory certification consultancy. We help manufacturers and importers navigate complex compliance requirements.
              </p>
              <div style={{ display:'flex', gap:8 }}>
                {['📧','📞','💼','🐦'].map((ic,i) => (
                  <div key={i} style={{ width:32, height:32, background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.1)', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, cursor:'pointer' }}>{ic}</div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:14 }}>Services</div>
              {['BIS-CRS','BIS-ISI','WPC-ETA','EPR Compliance','CDSCO','LMPC','ISO','BEE Rating'].map(s => (
                <div key={s} style={{ marginBottom:8 }}><a href="#services" style={{ fontSize:12, color:'rgba(255,255,255,.5)' }}>{s}</a></div>
              ))}
            </div>

            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:14 }}>Company</div>
              {['About Us','Process','Why Choose Us','Testimonials','Careers','Privacy Policy','Terms of Service'].map(s => (
                <div key={s} style={{ marginBottom:8 }}><a href="#" style={{ fontSize:12, color:'rgba(255,255,255,.5)' }}>{s}</a></div>
              ))}
            </div>

            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:14 }}>Contact</div>
              <div style={{ marginBottom:12 }}>
                <div style={{ color:'#f59e0b', fontWeight:600, fontSize:11, marginBottom:3 }}>Email</div>
                <a href="mailto:anand@powerindiaservices.com" style={{ fontSize:12, color:'rgba(255,255,255,.6)', wordBreak:'break-all' }}>anand@powerindiaservices.com</a>
              </div>
              <div style={{ marginBottom:12 }}>
                <div style={{ color:'#f59e0b', fontWeight:600, fontSize:11, marginBottom:3 }}>Phone</div>
                <a href="tel:+917217698176" style={{ fontSize:12, color:'rgba(255,255,255,.6)' }}>+91 72176 98176</a>
              </div>
              <div style={{ marginBottom:16 }}>
                <div style={{ color:'#f59e0b', fontWeight:600, fontSize:11, marginBottom:3 }}>Office</div>
                <span style={{ fontSize:12, color:'rgba(255,255,255,.6)' }}>New Delhi, India</span>
              </div>
              <div style={{ background:'rgba(16,185,129,.15)', border:'1px solid rgba(16,185,129,.3)', borderRadius:9, padding:'8px 12px', display:'flex', alignItems:'center', gap:7 }}>
                <span style={{ width:7, height:7, background:'#10b981', borderRadius:'50%', flexShrink:0, animation:'pulse 1.5s infinite' }} />
                <span style={{ fontSize:11, color:'#6ee7b7', fontWeight:500 }}>Mon–Sat, 9am–7pm IST</span>
              </div>
            </div>
          </div>

          {/* Cert pills */}
          <div style={{ padding:'20px 0', borderBottom:'1px solid rgba(255,255,255,.08)', display:'flex', flexWrap:'wrap', gap:7, alignItems:'center' }}>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'1px', marginRight:4 }}>Certifications:</span>
            {CERTS.map(c => (
              <span key={c} style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', borderRadius:100, padding:'3px 11px', fontSize:11, color:'rgba(255,255,255,.55)', fontFamily:"'Space Grotesk',sans-serif" }}>{c}</span>
            ))}
          </div>

          {/* Bottom */}
          <div style={{ padding:'18px 0', display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems: isMobile ? 'center' : 'center', gap:10, textAlign: isMobile ? 'center' : 'left' }}>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.25)' }}>© 2026 Power India Services. All rights reserved. | CIN: U74900DL2015PTC123456</span>
            <div style={{ display:'flex', gap:16 }}>
              {['Privacy Policy','Terms','Sitemap'].map(l => (
                <a key={l} href="#" style={{ fontSize:11, color:'rgba(255,255,255,.3)' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}