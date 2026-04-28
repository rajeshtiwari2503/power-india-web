//  "use client"
//  import { useState } from 'react'
// import Head from 'next/head'
// import { useRouter } from 'next/navigation'

// // ─── DATA ───────────────────────────────────────────────────────────────────

// const CERTS = ['BIS-CRS', 'BIS-ISI', 'WPC-ETA', 'EPR', 'LMPC', 'CDSCO', 'ISO', 'BEE']

// const SERVICES = [
//   {
//     title: 'BIS-CRS Registration',
//     desc: 'Mandatory certification for electronics. Testing, documentation & portal filing end-to-end.',
//   },
//   {
//     title: 'BIS-ISI Mark',
//     desc: 'Quality mark for Indian standards. Factory audit, lab testing & license issuance.',
//   },
//   {
//     title: 'WPC-ETA',
//     desc: 'Wireless device approvals. Covers Wi-Fi, Bluetooth, ZigBee, and all RF products.',
//   },
//   {
//     title: 'EPR Compliance',
//     desc: 'Extended Producer Responsibility for plastic, e-waste & battery categories.',
//   },
//   {
//     title: 'CDSCO / LMPC',
//     desc: 'Medical device approvals and Legal Metrology registration for importers.',
//   },
//   {
//     title: 'ISO Certification',
//     desc: 'ISO 9001, 14001 and sector-specific standards. We prepare, audit & certify.',
//   },
// ]

// const STEPS = [
//   { num: '01', title: 'Free Consultation', desc: 'We assess your product & identify exact certifications needed.' },
//   { num: '02', title: 'Document Prep', desc: 'Our team collects, verifies & prepares all application documents.' },
//   { num: '03', title: 'Application Filing', desc: 'We file on government portals and coordinate with labs & auditors.' },
//   { num: '04', title: 'Certificate Delivery', desc: 'You receive the certificate. We track renewals so nothing lapses.' },
// ]

// const WHY = [
//   { title: 'Dedicated Case Manager', desc: 'One point of contact for your entire certification journey.' },
//   { title: 'Real-time Status Updates', desc: 'Track your application progress at every stage.' },
//   { title: 'Secure Document Vault', desc: 'All certificates safely stored in cloud with version control.' },
//   { title: 'Renewal Management', desc: 'Auto-reminders so you never miss a certificate deadline.' },
//   { title: 'Multi-certification Support', desc: 'Need BIS + EPR + WPC together? We manage all simultaneously.' },
//   { title: 'Transparent Pricing', desc: 'Clear fees and timelines — no hidden charges ever.' },
// ]

// // ─── LOGIN MODAL ─────────────────────────────────────────────────────────────

// // function LoginModal({ onClose, onSwitch }) {
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [loading, setLoading] = useState(false)

// //   const handleSubmit = (e) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setTimeout(() => { setLoading(false); alert('Login API yahan connect karein!') }, 1000)
// //   }

// //   return (
// //     <div
// //       onClick={(e) => e.target === e.currentTarget && onClose()}
// //       style={{
// //         position: 'fixed', inset: 0, zIndex: 999,
// //         background: 'rgba(10,22,40,0.65)',
// //         display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
// //       }}
// //     >
// //       <div style={{
// //         background: '#fff', borderRadius: '16px', padding: '40px 36px',
// //         width: '100%', maxWidth: '420px', position: 'relative',
// //       }}>
// //         <button onClick={onClose} style={{
// //           position: 'absolute', top: '14px', right: '18px',
// //           background: 'none', border: 'none', fontSize: '18px',
// //           color: '#aaa', cursor: 'pointer', lineHeight: 1,
// //         }}>✕</button>

// //         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
// //           <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', color: '#0a1628', marginBottom: '4px' }}>
// //             Power<span style={{ color: '#d85a30' }}>India</span> Services
// //           </p>
// //           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#0a1628', marginBottom: '4px' }}>
// //             Welcome back
// //           </h2>
// //           <p style={{ fontSize: '13px', color: '#7a8090' }}>Log in to your compliance dashboard</p>
// //         </div>

// //         <form onSubmit={handleSubmit}>
// //           {[
// //             { label: 'Email Address', type: 'email', val: email, set: setEmail, ph: 'you@company.com' },
// //             { label: 'Password', type: 'password', val: password, set: setPassword, ph: 'Enter your password' },
// //           ].map(({ label, type, val, set, ph }) => (
// //             <div key={label} style={{ marginBottom: '16px' }}>
// //               <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#4a5060', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
// //                 {label}
// //               </label>
// //               <input
// //                 type={type} required value={val}
// //                 onChange={(e) => set(e.target.value)} placeholder={ph}
// //                 style={{
// //                   width: '100%', padding: '10px 14px',
// //                   border: '1px solid #ddd8d0', borderRadius: '8px',
// //                   fontSize: '14px', color: '#0a1628', outline: 'none',
// //                   fontFamily: "'DM Sans', sans-serif",
// //                 }}
// //               />
// //             </div>
// //           ))}
// //           <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '16px' }}>
// //             <a href="#" style={{ fontSize: '12px', color: '#d85a30' }}>Forgot password?</a>
// //           </div>
// //           <button type="submit" disabled={loading} style={{
// //             width: '100%', background: '#d85a30', color: '#fff',
// //             padding: '12px', borderRadius: '8px', border: 'none',
// //             fontSize: '14px', fontWeight: 500, cursor: 'pointer',
// //             fontFamily: "'DM Sans', sans-serif",
// //             opacity: loading ? 0.6 : 1,
// //           }}>
// //             {loading ? 'Logging in...' : 'Log In'}
// //           </button>
// //         </form>

// //         <p style={{ textAlign: 'center', fontSize: '13px', color: '#7a8090', marginTop: '20px' }}>
// //           Don&apos;t have an account?{' '}
// //           <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#d85a30', fontWeight: 500, cursor: 'pointer', fontSize: '13px' }}>
// //             Sign up free
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// // ─── SIGNUP MODAL ─────────────────────────────────────────────────────────────

// // function SignupModal({ onClose, onSwitch }) {
// //   const [form, setForm] = useState({ name: '', company: '', email: '', mobile: '', password: '' })
// //   const [loading, setLoading] = useState(false)

// //   const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
// //   const handleSubmit = (e) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setTimeout(() => { setLoading(false); alert('Signup API yahan connect karein!') }, 1000)
// //   }

// //   const fields = [
// //     { name: 'name', label: 'Full Name', type: 'text', ph: 'Rahul Sharma' },
// //     { name: 'company', label: 'Company Name', type: 'text', ph: 'ABC Electronics Pvt Ltd' },
// //     { name: 'email', label: 'Email Address', type: 'email', ph: 'you@company.com' },
// //     { name: 'mobile', label: 'Mobile Number', type: 'tel', ph: '+91 98765 43210' },
// //     { name: 'password', label: 'Password', type: 'password', ph: 'Create a strong password' },
// //   ]

// //   return (
// //     <div
// //       onClick={(e) => e.target === e.currentTarget && onClose()}
// //       style={{
// //         position: 'fixed', inset: 0, zIndex: 999,
// //         background: 'rgba(10,22,40,0.65)',
// //         display: 'flex', alignItems: 'center', justifyContent: 'center',
// //         padding: '16px', overflowY: 'auto',
// //       }}
// //     >
// //       <div style={{
// //         background: '#fff', borderRadius: '16px', padding: '40px 36px',
// //         width: '100%', maxWidth: '420px', position: 'relative', margin: 'auto',
// //       }}>
// //         <button onClick={onClose} style={{
// //           position: 'absolute', top: '14px', right: '18px',
// //           background: 'none', border: 'none', fontSize: '18px',
// //           color: '#aaa', cursor: 'pointer', lineHeight: 1,
// //         }}>✕</button>

// //         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
// //           <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', color: '#0a1628', marginBottom: '4px' }}>
// //             Power<span style={{ color: '#d85a30' }}>India</span> Services
// //           </p>
// //           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#0a1628', marginBottom: '4px' }}>
// //             Create Account
// //           </h2>
// //           <p style={{ fontSize: '13px', color: '#7a8090' }}>Start managing your certifications today</p>
// //         </div>

// //         <form onSubmit={handleSubmit}>
// //           {fields.map(({ name, label, type, ph }) => (
// //             <div key={name} style={{ marginBottom: '14px' }}>
// //               <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#4a5060', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
// //                 {label}
// //               </label>
// //               <input
// //                 type={type} name={name} required
// //                 value={form[name]} onChange={change} placeholder={ph}
// //                 style={{
// //                   width: '100%', padding: '10px 14px',
// //                   border: '1px solid #ddd8d0', borderRadius: '8px',
// //                   fontSize: '14px', color: '#0a1628', outline: 'none',
// //                   fontFamily: "'DM Sans', sans-serif",
// //                 }}
// //               />
// //             </div>
// //           ))}
// //           <button type="submit" disabled={loading} style={{
// //             width: '100%', background: '#c8a84b', color: '#0a1628',
// //             padding: '12px', borderRadius: '8px', border: 'none',
// //             fontSize: '14px', fontWeight: 500, cursor: 'pointer',
// //             fontFamily: "'DM Sans', sans-serif", marginTop: '8px',
// //             opacity: loading ? 0.6 : 1,
// //           }}>
// //             {loading ? 'Creating account...' : 'Create Account'}
// //           </button>
// //         </form>

// //         <p style={{ textAlign: 'center', fontSize: '13px', color: '#7a8090', marginTop: '20px' }}>
// //           Already have an account?{' '}
// //           <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#d85a30', fontWeight: 500, cursor: 'pointer', fontSize: '13px' }}>
// //             Log in
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────

// export default function Home() {
//   const [modal, setModal] = useState(null) // 'login' | 'signup' | null
// const router=useRouter()
//   return (
//     <>
//       <Head>
//         <title>Power India Services | Certification & Compliance Consultancy</title>
//         <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO certification experts in India." />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
//         <style>{`
//           * { box-sizing: border-box; margin: 0; padding: 0; }
//           body { font-family: 'DM Sans', sans-serif; background: #faf8f3; color: #0a1628; }
//           a { text-decoration: none; }
//           input:focus { border-color: #c8a84b !important; box-shadow: 0 0 0 3px rgba(200,168,75,0.15); }
//         `}</style>
//       </Head>

//       {/* ── NAVBAR ── */}
//       <nav style={{ background: '#fff', borderBottom: '1px solid #e8e4dc', position: 'sticky', top: 0, zIndex: 100, padding: '0 32px' }}>
//         <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', gap: '16px' }}>
//           <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#0a1628', whiteSpace: 'nowrap' }}>
//             Power <span style={{ color: '#d85a30' }}>India</span> Services
//           </div>
//           <div style={{ display: 'flex', gap: '28px', flex: 1, justifyContent: 'center' }}>
//             {['Services', 'Process', 'Why Us', 'Careers'].map((l) => (
//               <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '13px', color: '#5a6072' }}>{l}</a>
//             ))}
//           </div>
//           <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//             <button
//               onClick={() => router.push("/login")}
//               style={{ fontSize: '13px', fontWeight: 500, color: '#0a1628', padding: '8px 20px', borderRadius: '6px', border: '1.5px solid #d0ccc2', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
//             >
//               Log In
//             </button>
//             {/* <button
//               onClick={() => setModal('signup')}
//               style={{ fontSize: '13px', fontWeight: 500, color: '#fff', padding: '8px 20px', borderRadius: '6px', border: 'none', background: '#d85a30', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
//             >
//               Sign Up
//             </button> */}
//           </div>
//         </div>
//       </nav>

//       {/* ── HERO ── */}
//       <section style={{ background: '#0a1628', position: 'relative', overflow: 'hidden', minHeight: '520px', display: 'flex', alignItems: 'center' }}>
//         <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
//         <div style={{ position: 'relative', zIndex: 2, maxWidth: '1024px', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'center', width: '100%' }}>
//           <div>
//             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,168,75,0.12)', border: '1px solid rgba(200,168,75,0.35)', borderRadius: '20px', padding: '6px 16px', fontSize: '11px', color: '#e8c96a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
//               India&apos;s Certification Experts
//             </div>
//             <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '46px', fontWeight: 900, lineHeight: 1.15, color: '#fff', marginBottom: '16px' }}>
//               Compliance &amp;<br /><span style={{ color: '#e8c96a' }}>Certification</span><br />Made Simple
//             </h1>
//             <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: '32px', maxWidth: '460px' }}>
//               End-to-end regulatory consulting for BIS, WPC, EPR, LMPC, CDSCO, ISO and more. We help manufacturers &amp; importers navigate India&apos;s complex certification landscape.
//             </p>
//             <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
//               <a href="mailto:anand@powerindiaservices.com" style={{ background: '#c8a84b', color: '#0a1628', padding: '13px 28px', borderRadius: '7px', fontSize: '14px', fontWeight: 500 }}>
//                 Get Free Consultation
//               </a>
//               <a href="#services" style={{ background: 'transparent', color: '#fff', padding: '13px 28px', borderRadius: '7px', fontSize: '14px', fontWeight: 500, border: '1.5px solid rgba(255,255,255,0.3)' }}>
//                 Learn More
//               </a>
//             </div>
//           </div>
//           <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(200,168,75,0.25)', borderRadius: '14px', padding: '28px' }}>
//             <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#e8c96a', marginBottom: '18px' }}>Certifications We Handle</h3>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//               {CERTS.map((c) => (
//                 <div key={c} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '7px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
//                   {c}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── STATS ── */}
//       <div style={{ background: '#c8a84b', padding: '20px 32px' }}>
//         <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
//           {[['500+', 'Certifications Done'], ['8+', 'Cert Types'], ['100%', 'Client Focus'], ['PAN India', 'Service Coverage']].map(([num, label], i) => (
//             <div key={label} style={{ textAlign: 'center', padding: '4px 0', borderRight: i < 3 ? '1px solid rgba(10,22,40,0.2)' : 'none' }}>
//               <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, color: '#0a1628' }}>{num}</div>
//               <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.7px', color: 'rgba(10,22,40,0.6)', marginTop: '2px' }}>{label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── SERVICES ── */}
//       <section id="services" style={{ padding: '72px 32px', background: '#faf8f3' }}>
//         <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
//           <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#d85a30', fontWeight: 500, marginBottom: '10px' }}>Our Services</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#0a1628', marginBottom: '8px' }}>Regulatory Approvals We Specialize In</h2>
//           <p style={{ fontSize: '15px', color: '#5a6072', lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px' }}>
//             From document preparation to final certificate — we manage the complete process for you.
//           </p>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
//             {SERVICES.map((s) => (
//               <div key={s.title} style={{ background: '#fff', border: '0.5px solid #e2ddd4', borderRadius: '12px', padding: '22px 18px' }}>
//                 <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(200,168,75,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
//                   <svg width="18" height="18" fill="none" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
//                     <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#0a1628', marginBottom: '6px' }}>{s.title}</h3>
//                 <p style={{ fontSize: '12px', color: '#7a8090', lineHeight: 1.65 }}>{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── PROCESS ── */}
//       <section id="process" style={{ padding: '72px 32px', background: '#0a1628' }}>
//         <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
//           <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#e8c96a', fontWeight: 500, marginBottom: '10px' }}>Our Process</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>How We Work</h2>
//           <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '48px', maxWidth: '480px' }}>
//             A streamlined 4-step process from enquiry to certificate delivery.
//           </p>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
//             {STEPS.map((s) => (
//               <div key={s.num} style={{ textAlign: 'center' }}>
//                 <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#c8a84b', color: '#0a1628', fontWeight: 500, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{s.num}</div>
//                 <h3 style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>{s.title}</h3>
//                 <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── WHY US ── */}
//       <section id="why-us" style={{ padding: '72px 32px', background: '#fff' }}>
//         <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
//           <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#d85a30', fontWeight: 500, marginBottom: '10px' }}>Why Choose Us</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#0a1628', marginBottom: '8px' }}>Built for Compliance,<br />Driven by Results</h2>
//           <p style={{ fontSize: '15px', color: '#5a6072', lineHeight: 1.7, marginBottom: '40px', maxWidth: '480px' }}>
//             We are a process-driven consultancy — not just a filing service.
//           </p>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
//             {WHY.map((w) => (
//               <div key={w.title} style={{ border: '0.5px solid #e5e2da', borderRadius: '10px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
//                 <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c8a84b', marginTop: '5px', flexShrink: 0 }} />
//                 <div>
//                   <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#0a1628', marginBottom: '4px' }}>{w.title}</h3>
//                   <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.65 }}>{w.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CAREERS ── */}
//       <section id="careers" style={{ padding: '72px 32px', background: '#faf8f3' }}>
//         <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
//           <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#d85a30', fontWeight: 500, marginBottom: '10px' }}>We&apos;re Hiring</p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#0a1628', marginBottom: '8px' }}>Join Our Growing Team</h2>
//           <p style={{ fontSize: '15px', color: '#5a6072', lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px' }}>
//             Power India Services is expanding. We are looking for dynamic professionals to join our Compliance &amp; Certification team.
//           </p>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//             {[
//               { role: 'Project Coordinator', type: 'Certification Projects', points: ['Manage end-to-end BIS, BEE & CDSCO projects', 'Coordinate with clients for documentation', 'Track application progress & timelines', 'Liaise with labs & regulatory authorities'] },
//               { role: 'Operations Executive', type: 'Regulatory Compliance', points: ['Documentation preparation & verification', 'Maintain client records & data', 'Follow-up with clients & internal teams', 'Assist in compliance and process execution'] },
//             ].map((job) => (
//               <div key={job.role} style={{ background: '#fff', border: '0.5px solid #e2ddd4', borderRadius: '14px', padding: '28px' }}>
//                 <div style={{ display: 'inline-block', background: 'rgba(200,168,75,0.12)', color: '#85600a', fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', marginBottom: '14px', letterSpacing: '0.3px' }}>
//                   {job.type}
//                 </div>
//                 <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#0a1628', marginBottom: '16px' }}>{job.role}</h3>
//                 <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
//                   {job.points.map((p) => (
//                     <li key={p} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#5a6072', lineHeight: 1.5 }}>
//                       <span style={{ color: '#c8a84b', fontWeight: 700, flexShrink: 0 }}>→</span> {p}
//                     </li>
//                   ))}
//                 </ul>
//                 <a href="mailto:anand@powerindiaservices.com" style={{ display: 'inline-block', background: '#0a1628', color: '#fff', padding: '10px 22px', borderRadius: '7px', fontSize: '13px', fontWeight: 500 }}>
//                   Apply Now
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section style={{ background: '#d85a30', padding: '64px 32px', textAlign: 'center' }}>
//         <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Ready to Get Certified?</h2>
//         <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
//           Speak with our experts today. Free consultation for all new clients.
//         </p>
//         <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
//           <a href="mailto:anand@powerindiaservices.com" style={{ background: '#fff', color: '#d85a30', padding: '13px 30px', borderRadius: '7px', fontSize: '14px', fontWeight: 500 }}>
//             Email Us Now
//           </a>
//           <a href="tel:+917217698176" style={{ background: 'transparent', color: '#fff', padding: '13px 30px', borderRadius: '7px', fontSize: '14px', fontWeight: 500, border: '1.5px solid rgba(255,255,255,0.5)' }}>
//             +91 72176 98176
//           </a>
//         </div>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer style={{ background: '#0a1628', padding: '36px 32px', textAlign: 'center' }}>
//         <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#e8c96a', marginBottom: '8px' }}>
//           Power India Services
//         </div>
//         <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' }}>
//           India&apos;s trusted partner for BIS, WPC, EPR, LMPC, CDSCO &amp; ISO certifications
//         </p>
//         <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
//           <a href="mailto:anand@powerindiaservices.com" style={{ color: 'rgba(255,255,255,0.6)' }}>anand@powerindiaservices.com</a>
//           &nbsp;|&nbsp;
//           <a href="tel:+917217698176" style={{ color: 'rgba(255,255,255,0.6)' }}>+91 72176 98176</a>
//         </p>
//         <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '20px' }}>
//           © 2026 Power India Services. All rights reserved.
//         </p>
//       </footer>

//       {/* ── MODALS ── */}
//       {/* {modal === 'login' && (
//         <LoginModal onClose={() => setModal(null)} onSwitch={() => setModal('signup')} />
//       )}
//       {modal === 'signup' && (
//         <SignupModal onClose={() => setModal(null)} onSwitch={() => setModal('login')} />
//       )} */}
//     </>
//   )
// }

"use client"
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const CERTS = [
  { name: 'BIS-CRS', color: '#3730a3' },
  { name: 'BIS-ISI', color: '#7c3aed' },
  { name: 'WPC-ETA', color: '#0d9488' },
  { name: 'EPR', color: '#e11d48' },
  { name: 'LMPC', color: '#f59e0b' },
  { name: 'CDSCO', color: '#3730a3' },
  { name: 'ISO', color: '#7c3aed' },
  { name: 'BEE', color: '#0d9488' },
]

const SERVICES = [
  {
    icon: '🛡️',
    title: 'BIS-CRS Registration',
    desc: 'Mandatory certification for electronics & IT products. We handle testing coordination, document preparation, and end-to-end portal filing with BIS.',
    tags: ['Electronics', 'IT Products', 'Mandatory'],
    color: '#3730a3',
  },
  {
    icon: '⭐',
    title: 'BIS-ISI Mark',
    desc: 'Indian Standards quality mark for domestic manufacturers. Full support including factory audit preparation, lab coordination, and license issuance.',
    tags: ['Manufacturing', 'Quality Mark', 'Domestic'],
    color: '#7c3aed',
  },
  {
    icon: '📡',
    title: 'WPC-ETA Approval',
    desc: 'Wireless Planning & Coordination Wing approvals for RF devices including Wi-Fi, Bluetooth, Zigbee, GPS and all wireless communication products.',
    tags: ['Wi-Fi', 'Bluetooth', 'RF Devices'],
    color: '#0d9488',
  },
  {
    icon: '♻️',
    title: 'EPR Compliance',
    desc: 'Extended Producer Responsibility filing for plastic packaging, e-waste, and battery categories. Registration, annual targets, and compliance reports.',
    tags: ['E-Waste', 'Plastics', 'Battery'],
    color: '#e11d48',
  },
  {
    icon: '💊',
    title: 'CDSCO Registration',
    desc: 'Central Drugs Standard Control Organisation approvals for medical devices, diagnostics, and healthcare products. Import license & registration.',
    tags: ['Medical Devices', 'Diagnostics', 'Healthcare'],
    color: '#f59e0b',
  },
  {
    icon: '⚖️',
    title: 'LMPC Registration',
    desc: 'Legal Metrology Packaged Commodities compliance for importers and manufacturers. Label approvals and Registration Certificate for pre-packed goods.',
    tags: ['Packaged Goods', 'Importers', 'Labelling'],
    color: '#3730a3',
  },
  {
    icon: '📋',
    title: 'ISO Certification',
    desc: 'ISO 9001 Quality Management, ISO 14001 Environment, ISO 45001 Safety and other sector-specific standards. Gap analysis, implementation & audit.',
    tags: ['ISO 9001', 'ISO 14001', 'Management'],
    color: '#7c3aed',
  },
  {
    icon: '⚡',
    title: 'BEE Star Rating',
    desc: 'Bureau of Energy Efficiency star label registration for appliances. Mandatory for ACs, refrigerators, fans, pumps, and other energy products.',
    tags: ['Energy', 'Appliances', 'Star Label'],
    color: '#0d9488',
  },
  {
    icon: '🌐',
    title: 'TEC Certification',
    desc: 'Telecommunication Engineering Centre approvals for telecom equipment. Mandatory for all telecom products sold or used in India.',
    tags: ['Telecom', 'Equipment', 'Mandatory'],
    color: '#e11d48',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Free Consultation',
    desc: 'We assess your product category, applicable regulations, and design a certification roadmap with timeline and cost estimates.',
    icon: '🎯',
  },
  {
    num: '02',
    title: 'Document Collection',
    desc: 'Our team sends you a detailed checklist and collects all technical documents, test reports, labels, and company documents.',
    icon: '📁',
  },
  {
    num: '03',
    title: 'Lab Coordination',
    desc: 'We coordinate with NABL-accredited labs for product testing, manage sample shipping, and resolve any technical queries.',
    icon: '🔬',
  },
  {
    num: '04',
    title: 'Application Filing',
    desc: 'All documents are reviewed, formatted and filed on the appropriate government portals. We track and respond to all queries.',
    icon: '📤',
  },
  {
    num: '05',
    title: 'Audit Support',
    desc: 'For certifications requiring factory inspections, we provide on-site preparation support and accompany during the audit.',
    icon: '🏭',
  },
  {
    num: '06',
    title: 'Certificate Delivery',
    desc: 'Once approved, we deliver your certificates digitally. We also set up renewal reminders so nothing ever lapses.',
    icon: '🏆',
  },
]

const WHY = [
  { icon: '👤', title: 'Dedicated Case Manager', desc: 'A single point of contact manages your entire application. No confusion, no chasing multiple people.' },
  { icon: '📊', title: 'Real-time Dashboard', desc: 'Log in anytime to track your application status, view documents, and see upcoming deadlines.' },
  { icon: '🔒', title: 'Secure Document Vault', desc: 'All certificates and documents are stored securely in our cloud vault with version history and access controls.' },
  { icon: '🔔', title: 'Smart Renewal Alerts', desc: 'Automated reminders 90, 60, and 30 days before renewal due dates. Never let a certificate lapse again.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Our in-house expertise means fewer back-and-forths. We typically reduce application time by 40%.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'Fixed professional fees quoted upfront. No surprise charges. Government fees always billed at actual cost.' },
  { icon: '🌍', title: 'PAN India Service', desc: 'We serve manufacturers and importers across India — from Delhi to Chennai, Mumbai to Kolkata.' },
  { icon: '📞', title: '24/7 Query Support', desc: 'WhatsApp and email support available round the clock. Our team responds within 2 hours, guaranteed.' },
]

const CLIENTS = [
  { sector: 'Consumer Electronics', count: '120+ clients', icon: '📱' },
  { sector: 'Medical Devices', count: '85+ clients', icon: '🏥' },
  { sector: 'FMCG & Packaging', count: '95+ clients', icon: '📦' },
  { sector: 'Telecom & Wireless', count: '70+ clients', icon: '📡' },
  { sector: 'Automotive Parts', count: '45+ clients', icon: '🚗' },
  { sector: 'Industrial Equipment', count: '60+ clients', icon: '⚙️' },
]

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    company: 'TechCorp Electronics Pvt Ltd',
    city: 'Delhi',
    text: 'Power India Services got our BIS-CRS done in 45 days flat. Their team handled everything — testing, filing, query responses. We just provided the product and documents.',
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    company: 'MedEquip Imports',
    city: 'Mumbai',
    text: 'CDSCO registration seemed impossible until we approached Power India Services. Their expertise in medical device regulations is unmatched. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Arun Nair',
    company: 'GreenPack Solutions',
    city: 'Bangalore',
    text: 'EPR compliance was a nightmare for us. Their team simplified the entire process, got our registration done, and now manages our annual filings too.',
    rating: 5,
  },
]

const FAQS = [
  {
    q: 'How long does BIS-CRS certification take?',
    a: 'BIS-CRS typically takes 30–60 days depending on the product category and lab availability. Some products with existing test reports can be faster.',
  },
  {
    q: 'Do you handle international product certifications?',
    a: 'We specialize in Indian regulatory certifications. For products requiring CE, FCC or other international marks, we can connect you with our global partners.',
  },
  {
    q: 'What is the difference between BIS-CRS and BIS-ISI?',
    a: 'BIS-CRS is for electronics and IT products sold in India. BIS-ISI is for Indian manufacturers of goods like steel, cement, and packaged commodities.',
  },
  {
    q: 'Can you handle multiple certifications simultaneously?',
    a: 'Yes, this is one of our key strengths. We regularly manage BIS + WPC + EPR for the same client, reducing overall time and coordination effort significantly.',
  },
  {
    q: 'Do you offer post-certification support?',
    a: 'Absolutely. We manage renewals, annual surveillance, factory re-inspections, and any regulatory updates that affect your existing certifications.',
  },
  {
    q: 'What documents are needed to start?',
    a: 'Typically: company registration documents, product brochure/datasheet, authorized Indian representative details, and product samples for testing.',
  },
]

const CAREERS = [
  {
    role: 'Senior Certification Manager',
    type: 'Full-time · Delhi / Remote',
    exp: '3–5 years',
    skills: ['BIS experience', 'WPC filings', 'Client handling', 'Government portals'],
    urgent: true,
  },
  {
    role: 'Regulatory Affairs Executive',
    type: 'Full-time · Delhi',
    exp: '1–3 years',
    skills: ['EPR compliance', 'CDSCO filings', 'Documentation', 'MS Office'],
    urgent: false,
  },
  {
    role: 'Business Development Executive',
    type: 'Full-time · Pan India',
    exp: '2–4 years',
    skills: ['B2B sales', 'Regulatory knowledge', 'Lead generation', 'CRM tools'],
    urgent: false,
  },
]

// ─── STAT COUNTER ────────────────────────────────────────────────────────────

// function StatCounter({ end, suffix = '' }) {
//   const [count, setCount] = useState(0)
//   const ref = useRef(null)
//   const started = useRef(false)

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !started.current) {
//         started.current = true
//         let start = 0
//         const duration = 2000
//         const step = end / (duration / 16)
//         const timer = setInterval(() => {
//           start += step
//           if (start >= end) { setCount(end); clearInterval(timer) }
//           else setCount(Math.floor(start))
//         }, 16)
//       }
//     }, { threshold: 0.5 })
//     if (ref.current) observer.observe(ref.current)
//     return () => observer.disconnect()
//   }, [end])

//   return <span ref={ref}>{count}{suffix}</span>
// }

 

interface StatCounterProps {
  end: number;
  suffix?: string;
}

 function StatCounter({ end, suffix = "" }: StatCounterProps) {
  const [count, setCount] = useState<number>(0);

  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const duration = 2000;
          const step = end / (duration / 16);

          timer = setInterval(() => {
            start += step;

            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
// ─── FAQ ITEM ────────────────────────────────────────────────────────────────

// function FaqItem({ q, a, idx }) {
//   const [open, setOpen] = useState(false)
//   return (
//     <div style={{
//       border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden',
//       transition: 'box-shadow 0.3s',
//       boxShadow: open ? '0 8px 24px rgba(55,48,163,0.1)' : 'none',
//       marginBottom: '12px',
//     }}>
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           width: '100%', textAlign: 'left', padding: '20px 24px',
//           background: open ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#fff',
//           border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           transition: 'background 0.3s',
//         }}
//       >
//         <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 600, color: open ? '#fff' : '#1e293b' }}>
//           {q}
//         </span>
//         <span style={{ fontSize: '20px', color: open ? '#fcd34d' : '#7c3aed', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
//       </button>
//       {open && (
//         <div style={{ padding: '18px 24px', background: '#f8fafc', fontSize: '14px', color: '#475569', lineHeight: 1.75 }}>
//           {a}
//         </div>
//       )}
//     </div>
//   )
// }
 

interface FaqItemProps {
  q: string;
  a: string;
  idx?: number;
}

  function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "shadow-lg shadow-indigo-200/50" : ""
      }`}
    >
      {/* QUESTION */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center px-6 py-5 text-left transition-all duration-300 ${
          open
            ? "bg-gradient-to-r from-indigo-700 to-purple-600 text-white"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <span className="text-sm md:text-base font-semibold">
          {q}
        </span>

        <span
          className={`text-xl font-bold transition-transform duration-300 ${
            open ? "rotate-45 text-yellow-300" : "text-purple-600"
          }`}
        >
          +
        </span>
      </button>

      {/* ANSWER */}
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 leading-relaxed">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}
// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <Head>
        <title>Power India Services | India's #1 Certification & Compliance Consultancy</title>
        <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE — End-to-end regulatory certification consultants in India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ══════════════════════════ NAVBAR ══════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 32px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          {/* Logo */}
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 900, color: scrolled ? '#1e1b4b' : '#fff' }}>
            Power<span style={{ color: '#f59e0b' }}>India</span><span style={{ color: scrolled ? '#7c3aed' : '#a78bfa' }}> Services</span>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Services', 'Process', 'Why Us', 'Testimonials', 'Careers', 'FAQ'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{
                fontSize: '13px', fontWeight: 500, color: scrolled ? '#475569' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none', transition: 'color 0.2s',
                fontFamily: "'Space Grotesk',sans-serif",
              }}>{l}</a>
            ))}
          </div>

          {/* Login only */}
          <Link href="/login" style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: '13px', fontWeight: 600,
            color: scrolled ? '#fff' : '#1e1b4b',
            background: scrolled ? 'linear-gradient(135deg,#3730a3,#7c3aed)' : '#f59e0b',
            padding: '10px 24px', borderRadius: '8px',
            textDecoration: 'none', transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px rgba(55,48,163,0.25)',
          }}>
            Log In →
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 40%, #7c3aed 70%, #0d9488 100%)',
        backgroundSize: '300% 300%',
        animation: 'gradient-shift 8s ease infinite',
        position: 'relative', overflow: 'hidden', padding: '120px 32px 80px',
      }}>
        {/* Animated blobs */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(245,158,11,0.12)', filter: 'blur(60px)', animation: 'float 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(225,29,72,0.1)', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(13,148,136,0.1)', filter: 'blur(40px)', animation: 'float 5s ease-in-out infinite 2s' }} />

        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '60px', alignItems: 'center' }}>
          <div className="animate-fade-up">
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '100px', padding: '8px 20px', fontSize: '12px', color: '#fcd34d', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '24px', fontFamily: "'Space Grotesk',sans-serif" }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: 'pulse-ring 1.5s infinite' }} />
              India's #1 Certification Consultancy
            </div>

            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '58px', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: '20px' }}>
              Regulatory{' '}
              <span className="grad-text">Compliance</span>
              <br />Made <em style={{ fontStyle: 'italic', color: '#fcd34d' }}>Effortless</em>
            </h1>

            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '500px' }}>
              India's most trusted certification consultancy. We handle BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE and 20+ regulatory approvals — end-to-end, on time, every time.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a href="#services" className="btn-shimmer" style={{ background: 'linear-gradient(135deg,#f59e0b,#e11d48)', color: '#fff', padding: '15px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", display: 'inline-block' }}>
                Explore Services ↓
              </a>
              <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '15px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk',sans-serif", display: 'inline-block' }}>
                Free Consultation
              </a>
            </div>

            {/* Cert pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {CERTS.map((c, i) => (
                <div key={c.name} className={`animate-fade-up delay-${Math.min(i + 1, 6)}`} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          {/* Floating Card */}
          <div className="animate-float" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', padding: '36px', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#fcd34d', fontWeight: 700, marginBottom: '6px' }}>Why clients choose us</div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Trusted by 500+ companies across India</p>

            {[
              { label: 'Application Success Rate', val: 98, color: '#10b981' },
              { label: 'Clients Retained', val: 94, color: '#f59e0b' },
              { label: 'Faster Than Industry Avg', val: 40, color: '#7c3aed', suffix: '%' },
            ].map((stat) => (
              <div key={stat.label} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{stat.label}</span>
                  <span style={{ fontSize: '13px', color: stat.color, fontWeight: 700 }}>{stat.val}{stat.suffix || '%'}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '100px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${stat.val}%`, height: '100%', background: stat.color, borderRadius: '100px', transition: 'width 2s ease' }} />
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[['500+', 'Certs Done'], ['8+', 'Cert Types'], ['10+', 'Years Exp'], ['100%', 'Transparent']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 900, color: '#fcd34d' }}>{n}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
        </div>
      </section>

      {/* ══════════════════════════ STATS TICKER ══════════════════════════ */}
      <div style={{ background: '#1e1b4b', padding: '0 32px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { end: 500, suffix: '+', label: 'Certifications Delivered' },
            { end: 98, suffix: '%', label: 'Success Rate' },
            { end: 350, suffix: '+', label: 'Happy Clients' },
            { end: 10, suffix: '+', label: 'Years of Expertise' },
            { end: 20, suffix: '+', label: 'Cert Categories' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '28px 16px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '34px', fontWeight: 900, color: '#f59e0b' }}>
                <StatCounter end={s.end} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px', fontWeight: 500, letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════ SERVICES ══════════════════════════ */}
      <section id="services" style={{ padding: '96px 32px', background: '#fefce8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
              Our Services
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900, color: '#1e1b4b', marginBottom: '16px', lineHeight: 1.2 }}>
              Every Certification,<br /><span className="grad-text">We Handle It All</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
              From testing coordination to government portal filing — we manage the complete process with zero hassle for you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`hover-lift animate-fade-up delay-${Math.min((i % 3) + 1, 6)}`} style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', cursor: 'default',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }} />
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '16px', fontWeight: 700, color: '#1e1b4b', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, marginBottom: '16px' }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{ background: `${s.color}12`, color: s.color, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', fontFamily: "'Space Grotesk',sans-serif" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CLIENTS SECTOR ══════════════════════════ */}
      <section style={{ padding: '80px 32px', background: 'linear-gradient(135deg,#1e1b4b,#3730a3)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
              Industries We Serve
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px' }}>Trusted by companies across sectors throughout India</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {CLIENTS.map((c) => (
              <div key={c.sector} className="hover-lift" style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px',
                padding: '24px', display: 'flex', gap: '16px', alignItems: 'center',
              }}>
                <div style={{ fontSize: '36px' }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 600, color: '#fff' }}>{c.sector}</div>
                  <div style={{ fontSize: '13px', color: '#fcd34d', marginTop: '2px' }}>{c.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ PROCESS ══════════════════════════ */}
      <section id="process" style={{ padding: '96px 32px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#0d9488,#3730a3)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
              Our Process
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900, color: '#1e1b4b', marginBottom: '16px' }}>
              6 Steps to <span className="grad-text">Certification Success</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
              A proven, transparent workflow that keeps you informed at every stage.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {STEPS.map((s, i) => (
              <div key={s.num} className="hover-lift" style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900,
                  color: '#f1f5f9', lineHeight: 1,
                }}>{s.num}</div>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '16px', fontWeight: 700, color: '#1e1b4b', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75 }}>{s.desc}</p>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, #3730a3, #7c3aed)`, borderRadius: '0 0 16px 16px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ WHY US ══════════════════════════ */}
      <section id="why-us" style={{ padding: '96px 32px', background: '#fefce8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '360px 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#e11d48,#f59e0b)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
              Why Choose Us
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 900, color: '#1e1b4b', marginBottom: '20px', lineHeight: 1.2 }}>
              We Don't Just File —<br /><span className="grad-text">We Deliver Results</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
              Our process-first approach, deep regulatory expertise, and client-centric model sets us apart from every other consultancy in India.
            </p>
            <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{
              display: 'inline-block', background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff',
              padding: '14px 30px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
              textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif",
            }}>
              Get Started Today →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {WHY.map((w, i) => (
              <div key={w.title} className="hover-lift" style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{w.icon}</div>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#1e1b4b', marginBottom: '6px' }}>{w.title}</h4>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
      <section id="testimonials" style={{ padding: '96px 32px', background: 'linear-gradient(135deg,#7c3aed,#3730a3,#1e1b4b)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
              What Our Clients Say
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Real results, real businesses</p>
          </div>

          <div style={{ position: 'relative', minHeight: '240px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} style={{
                position: 'absolute', inset: 0, transition: 'opacity 0.6s ease, transform 0.6s ease',
                opacity: i === activeTestimonial ? 1 : 0,
                transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: i === activeTestimonial ? 'auto' : 'none',
              }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '40px' }}>
                  <div style={{ fontSize: '32px', color: '#fcd34d', marginBottom: '20px', fontFamily: 'serif' }}>"</div>
                  <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '24px' }}>{t.text}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 700, color: '#fcd34d' }}>{t.name}</div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{t.company} · {t.city}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '270px' }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                width: i === activeTestimonial ? '28px' : '8px', height: '8px',
                borderRadius: '100px', border: 'none', cursor: 'pointer',
                background: i === activeTestimonial ? '#f59e0b' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FAQ ══════════════════════════ */}
      <section id="faq" style={{ padding: '96px 32px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#0d9488,#3730a3)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 900, color: '#1e1b4b', marginBottom: '12px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Can't find your answer? Email us at anand@powerindiaservices.com</p>
          </div>
          {FAQS.map((f, i) => <FaqItem key={i} {...f} idx={i} />)}
        </div>
      </section>

      {/* ══════════════════════════ CAREERS ══════════════════════════ */}
      <section id="careers" style={{ padding: '96px 32px', background: '#fefce8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#e11d48,#f59e0b)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '6px 18px', borderRadius: '100px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: "'Space Grotesk',sans-serif" }}>
              We're Hiring
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '42px', fontWeight: 900, color: '#1e1b4b', marginBottom: '16px' }}>
              Join Our Growing Team
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
              Be part of India's fastest-growing regulatory consultancy. We offer great work culture, learning opportunities, and competitive compensation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {CAREERS.map((job) => (
              <div key={job.role} className="hover-lift" style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '32px',
                position: 'relative', overflow: 'hidden',
              }}>
                {job.urgent && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#e11d48', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', fontFamily: "'Space Grotesk',sans-serif" }}>
                    URGENT
                  </div>
                )}
                <div style={{ background: 'linear-gradient(135deg,#3730a3,#7c3aed)', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px', display: 'inline-block', marginBottom: '18px', fontFamily: "'Space Grotesk',sans-serif" }}>
                  {job.type}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: '#1e1b4b', marginBottom: '8px' }}>{job.role}</h3>
                <div style={{ fontSize: '13px', color: '#7c3aed', fontWeight: 600, marginBottom: '20px' }}>Experience: {job.exp}</div>
                <div style={{ marginBottom: '24px' }}>
                  {job.skills.map((sk) => (
                    <div key={sk} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#475569' }}>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {sk}
                    </div>
                  ))}
                </div>
                <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{
                  display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#1e1b4b,#3730a3)',
                  color: '#fff', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                  textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif",
                }}>
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CTA BANNER ══════════════════════════ */}
      <section style={{
        padding: '96px 32px', textAlign: 'center',
        background: 'linear-gradient(135deg,#f59e0b 0%,#e11d48 50%,#7c3aed 100%)',
        backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', fontWeight: 900, color: '#fff', marginBottom: '16px', lineHeight: 1.15 }}>
            Ready to Get Your<br />Product Certified?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', lineHeight: 1.75 }}>
            Speak with our certification experts today. Free 30-minute consultation for all new clients. No commitment required.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:anand@powerindiaservices.com" className="btn-shimmer" style={{
              background: '#fff', color: '#3730a3', padding: '16px 36px', borderRadius: '12px',
              fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif",
            }}>
              Email Us Now
            </a>
            <a href="tel:+917217698176" className="btn-shimmer" style={{
              background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '16px 36px', borderRadius: '12px',
              fontSize: '15px', fontWeight: 700, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)',
              fontFamily: "'Space Grotesk',sans-serif",
            }}>
              📞 +91 72176 98176
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer style={{ background: '#0f0d2e', color: 'rgba(255,255,255,0.6)', padding: '80px 32px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', paddingBottom: '64px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>
                Power<span style={{ color: '#f59e0b' }}>India</span> <span style={{ color: '#a78bfa' }}>Services</span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '24px', maxWidth: '300px' }}>
                India's most trusted regulatory certification consultancy. We help manufacturers and importers navigate complex compliance requirements with ease.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['📧', '📞', '💼', '🐦'].map((icon, i) => (
                  <div key={i} style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Services</div>
              {['BIS-CRS', 'BIS-ISI', 'WPC-ETA', 'EPR Compliance', 'CDSCO', 'LMPC', 'ISO', 'BEE Rating'].map((s) => (
                <div key={s} style={{ fontSize: '13px', marginBottom: '10px' }}>
                  <a href="#services" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}>{s}</a>
                </div>
              ))}
            </div>

            {/* Company */}
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Company</div>
              {['About Us', 'Process', 'Why Choose Us', 'Testimonials', 'Careers', 'Privacy Policy', 'Terms of Service'].map((s) => (
                <div key={s} style={{ fontSize: '13px', marginBottom: '10px' }}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{s}</a>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Contact</div>
              <div style={{ fontSize: '13px', marginBottom: '14px', lineHeight: 1.6 }}>
                <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>Email</div>
                <a href="mailto:anand@powerindiaservices.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>anand@powerindiaservices.com</a>
              </div>
              <div style={{ fontSize: '13px', marginBottom: '14px' }}>
                <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>Phone</div>
                <a href="tel:+917217698176" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+91 72176 98176</a>
              </div>
              <div style={{ fontSize: '13px', marginBottom: '14px' }}>
                <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>Office</div>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>New Delhi, India</span>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', color: '#6ee7b7', fontWeight: 500 }}>Available Mon–Sat, 9am–7pm</span>
              </div>
            </div>
          </div>

          {/* Certifications we cover */}
          <div style={{ padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '8px' }}>Certifications:</span>
            {CERTS.map((c) => (
              <span key={c.name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '4px 14px', fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: "'Space Grotesk',sans-serif" }}>
                {c.name}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
              © 2026 Power India Services. All rights reserved. | CIN: U74900DL2015PTC123456
            </span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Privacy Policy', 'Terms', 'Sitemap'].map((l) => (
                <a key={l} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}