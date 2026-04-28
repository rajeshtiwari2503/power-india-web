 "use client"
 import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'

// ─── DATA ───────────────────────────────────────────────────────────────────

const CERTS = ['BIS-CRS', 'BIS-ISI', 'WPC-ETA', 'EPR', 'LMPC', 'CDSCO', 'ISO', 'BEE']

const SERVICES = [
  {
    title: 'BIS-CRS Registration',
    desc: 'Mandatory certification for electronics. Testing, documentation & portal filing end-to-end.',
  },
  {
    title: 'BIS-ISI Mark',
    desc: 'Quality mark for Indian standards. Factory audit, lab testing & license issuance.',
  },
  {
    title: 'WPC-ETA',
    desc: 'Wireless device approvals. Covers Wi-Fi, Bluetooth, ZigBee, and all RF products.',
  },
  {
    title: 'EPR Compliance',
    desc: 'Extended Producer Responsibility for plastic, e-waste & battery categories.',
  },
  {
    title: 'CDSCO / LMPC',
    desc: 'Medical device approvals and Legal Metrology registration for importers.',
  },
  {
    title: 'ISO Certification',
    desc: 'ISO 9001, 14001 and sector-specific standards. We prepare, audit & certify.',
  },
]

const STEPS = [
  { num: '01', title: 'Free Consultation', desc: 'We assess your product & identify exact certifications needed.' },
  { num: '02', title: 'Document Prep', desc: 'Our team collects, verifies & prepares all application documents.' },
  { num: '03', title: 'Application Filing', desc: 'We file on government portals and coordinate with labs & auditors.' },
  { num: '04', title: 'Certificate Delivery', desc: 'You receive the certificate. We track renewals so nothing lapses.' },
]

const WHY = [
  { title: 'Dedicated Case Manager', desc: 'One point of contact for your entire certification journey.' },
  { title: 'Real-time Status Updates', desc: 'Track your application progress at every stage.' },
  { title: 'Secure Document Vault', desc: 'All certificates safely stored in cloud with version control.' },
  { title: 'Renewal Management', desc: 'Auto-reminders so you never miss a certificate deadline.' },
  { title: 'Multi-certification Support', desc: 'Need BIS + EPR + WPC together? We manage all simultaneously.' },
  { title: 'Transparent Pricing', desc: 'Clear fees and timelines — no hidden charges ever.' },
]

// ─── LOGIN MODAL ─────────────────────────────────────────────────────────────

// function LoginModal({ onClose, onSwitch }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setTimeout(() => { setLoading(false); alert('Login API yahan connect karein!') }, 1000)
//   }

//   return (
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       style={{
//         position: 'fixed', inset: 0, zIndex: 999,
//         background: 'rgba(10,22,40,0.65)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
//       }}
//     >
//       <div style={{
//         background: '#fff', borderRadius: '16px', padding: '40px 36px',
//         width: '100%', maxWidth: '420px', position: 'relative',
//       }}>
//         <button onClick={onClose} style={{
//           position: 'absolute', top: '14px', right: '18px',
//           background: 'none', border: 'none', fontSize: '18px',
//           color: '#aaa', cursor: 'pointer', lineHeight: 1,
//         }}>✕</button>

//         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//           <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', color: '#0a1628', marginBottom: '4px' }}>
//             Power<span style={{ color: '#d85a30' }}>India</span> Services
//           </p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#0a1628', marginBottom: '4px' }}>
//             Welcome back
//           </h2>
//           <p style={{ fontSize: '13px', color: '#7a8090' }}>Log in to your compliance dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {[
//             { label: 'Email Address', type: 'email', val: email, set: setEmail, ph: 'you@company.com' },
//             { label: 'Password', type: 'password', val: password, set: setPassword, ph: 'Enter your password' },
//           ].map(({ label, type, val, set, ph }) => (
//             <div key={label} style={{ marginBottom: '16px' }}>
//               <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#4a5060', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
//                 {label}
//               </label>
//               <input
//                 type={type} required value={val}
//                 onChange={(e) => set(e.target.value)} placeholder={ph}
//                 style={{
//                   width: '100%', padding: '10px 14px',
//                   border: '1px solid #ddd8d0', borderRadius: '8px',
//                   fontSize: '14px', color: '#0a1628', outline: 'none',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               />
//             </div>
//           ))}
//           <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '16px' }}>
//             <a href="#" style={{ fontSize: '12px', color: '#d85a30' }}>Forgot password?</a>
//           </div>
//           <button type="submit" disabled={loading} style={{
//             width: '100%', background: '#d85a30', color: '#fff',
//             padding: '12px', borderRadius: '8px', border: 'none',
//             fontSize: '14px', fontWeight: 500, cursor: 'pointer',
//             fontFamily: "'DM Sans', sans-serif",
//             opacity: loading ? 0.6 : 1,
//           }}>
//             {loading ? 'Logging in...' : 'Log In'}
//           </button>
//         </form>

//         <p style={{ textAlign: 'center', fontSize: '13px', color: '#7a8090', marginTop: '20px' }}>
//           Don&apos;t have an account?{' '}
//           <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#d85a30', fontWeight: 500, cursor: 'pointer', fontSize: '13px' }}>
//             Sign up free
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }

// ─── SIGNUP MODAL ─────────────────────────────────────────────────────────────

// function SignupModal({ onClose, onSwitch }) {
//   const [form, setForm] = useState({ name: '', company: '', email: '', mobile: '', password: '' })
//   const [loading, setLoading] = useState(false)

//   const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setTimeout(() => { setLoading(false); alert('Signup API yahan connect karein!') }, 1000)
//   }

//   const fields = [
//     { name: 'name', label: 'Full Name', type: 'text', ph: 'Rahul Sharma' },
//     { name: 'company', label: 'Company Name', type: 'text', ph: 'ABC Electronics Pvt Ltd' },
//     { name: 'email', label: 'Email Address', type: 'email', ph: 'you@company.com' },
//     { name: 'mobile', label: 'Mobile Number', type: 'tel', ph: '+91 98765 43210' },
//     { name: 'password', label: 'Password', type: 'password', ph: 'Create a strong password' },
//   ]

//   return (
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       style={{
//         position: 'fixed', inset: 0, zIndex: 999,
//         background: 'rgba(10,22,40,0.65)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         padding: '16px', overflowY: 'auto',
//       }}
//     >
//       <div style={{
//         background: '#fff', borderRadius: '16px', padding: '40px 36px',
//         width: '100%', maxWidth: '420px', position: 'relative', margin: 'auto',
//       }}>
//         <button onClick={onClose} style={{
//           position: 'absolute', top: '14px', right: '18px',
//           background: 'none', border: 'none', fontSize: '18px',
//           color: '#aaa', cursor: 'pointer', lineHeight: 1,
//         }}>✕</button>

//         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//           <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', color: '#0a1628', marginBottom: '4px' }}>
//             Power<span style={{ color: '#d85a30' }}>India</span> Services
//           </p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#0a1628', marginBottom: '4px' }}>
//             Create Account
//           </h2>
//           <p style={{ fontSize: '13px', color: '#7a8090' }}>Start managing your certifications today</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {fields.map(({ name, label, type, ph }) => (
//             <div key={name} style={{ marginBottom: '14px' }}>
//               <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#4a5060', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
//                 {label}
//               </label>
//               <input
//                 type={type} name={name} required
//                 value={form[name]} onChange={change} placeholder={ph}
//                 style={{
//                   width: '100%', padding: '10px 14px',
//                   border: '1px solid #ddd8d0', borderRadius: '8px',
//                   fontSize: '14px', color: '#0a1628', outline: 'none',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               />
//             </div>
//           ))}
//           <button type="submit" disabled={loading} style={{
//             width: '100%', background: '#c8a84b', color: '#0a1628',
//             padding: '12px', borderRadius: '8px', border: 'none',
//             fontSize: '14px', fontWeight: 500, cursor: 'pointer',
//             fontFamily: "'DM Sans', sans-serif", marginTop: '8px',
//             opacity: loading ? 0.6 : 1,
//           }}>
//             {loading ? 'Creating account...' : 'Create Account'}
//           </button>
//         </form>

//         <p style={{ textAlign: 'center', fontSize: '13px', color: '#7a8090', marginTop: '20px' }}>
//           Already have an account?{' '}
//           <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#d85a30', fontWeight: 500, cursor: 'pointer', fontSize: '13px' }}>
//             Log in
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const [modal, setModal] = useState(null) // 'login' | 'signup' | null
const router=useRouter()
  return (
    <>
      <Head>
        <title>Power India Services | Certification & Compliance Consultancy</title>
        <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO certification experts in India." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'DM Sans', sans-serif; background: #faf8f3; color: #0a1628; }
          a { text-decoration: none; }
          input:focus { border-color: #c8a84b !important; box-shadow: 0 0 0 3px rgba(200,168,75,0.15); }
        `}</style>
      </Head>

      {/* ── NAVBAR ── */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e8e4dc', position: 'sticky', top: 0, zIndex: 100, padding: '0 32px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', gap: '16px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#0a1628', whiteSpace: 'nowrap' }}>
            Power <span style={{ color: '#d85a30' }}>India</span> Services
          </div>
          <div style={{ display: 'flex', gap: '28px', flex: 1, justifyContent: 'center' }}>
            {['Services', 'Process', 'Why Us', 'Careers'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '13px', color: '#5a6072' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => router.push("/login")}
              style={{ fontSize: '13px', fontWeight: 500, color: '#0a1628', padding: '8px 20px', borderRadius: '6px', border: '1.5px solid #d0ccc2', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
            >
              Log In
            </button>
            {/* <button
              onClick={() => setModal('signup')}
              style={{ fontSize: '13px', fontWeight: 500, color: '#fff', padding: '8px 20px', borderRadius: '6px', border: 'none', background: '#d85a30', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
            >
              Sign Up
            </button> */}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: '#0a1628', position: 'relative', overflow: 'hidden', minHeight: '520px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1024px', margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'center', width: '100%' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,168,75,0.12)', border: '1px solid rgba(200,168,75,0.35)', borderRadius: '20px', padding: '6px 16px', fontSize: '11px', color: '#e8c96a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
              India&apos;s Certification Experts
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '46px', fontWeight: 900, lineHeight: 1.15, color: '#fff', marginBottom: '16px' }}>
              Compliance &amp;<br /><span style={{ color: '#e8c96a' }}>Certification</span><br />Made Simple
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: '32px', maxWidth: '460px' }}>
              End-to-end regulatory consulting for BIS, WPC, EPR, LMPC, CDSCO, ISO and more. We help manufacturers &amp; importers navigate India&apos;s complex certification landscape.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="mailto:anand@powerindiaservices.com" style={{ background: '#c8a84b', color: '#0a1628', padding: '13px 28px', borderRadius: '7px', fontSize: '14px', fontWeight: 500 }}>
                Get Free Consultation
              </a>
              <a href="#services" style={{ background: 'transparent', color: '#fff', padding: '13px 28px', borderRadius: '7px', fontSize: '14px', fontWeight: 500, border: '1.5px solid rgba(255,255,255,0.3)' }}>
                Learn More
              </a>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(200,168,75,0.25)', borderRadius: '14px', padding: '28px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#e8c96a', marginBottom: '18px' }}>Certifications We Handle</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {CERTS.map((c) => (
                <div key={c} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '7px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: '#c8a84b', padding: '20px 32px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[['500+', 'Certifications Done'], ['8+', 'Cert Types'], ['100%', 'Client Focus'], ['PAN India', 'Service Coverage']].map(([num, label], i) => (
            <div key={label} style={{ textAlign: 'center', padding: '4px 0', borderRight: i < 3 ? '1px solid rgba(10,22,40,0.2)' : 'none' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, color: '#0a1628' }}>{num}</div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.7px', color: 'rgba(10,22,40,0.6)', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '72px 32px', background: '#faf8f3' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#d85a30', fontWeight: 500, marginBottom: '10px' }}>Our Services</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#0a1628', marginBottom: '8px' }}>Regulatory Approvals We Specialize In</h2>
          <p style={{ fontSize: '15px', color: '#5a6072', lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px' }}>
            From document preparation to final certificate — we manage the complete process for you.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {SERVICES.map((s) => (
              <div key={s.title} style={{ background: '#fff', border: '0.5px solid #e2ddd4', borderRadius: '12px', padding: '22px 18px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(200,168,75,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="18" height="18" fill="none" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#0a1628', marginBottom: '6px' }}>{s.title}</h3>
                <p style={{ fontSize: '12px', color: '#7a8090', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: '72px 32px', background: '#0a1628' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#e8c96a', fontWeight: 500, marginBottom: '10px' }}>Our Process</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>How We Work</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '48px', maxWidth: '480px' }}>
            A streamlined 4-step process from enquiry to certificate delivery.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#c8a84b', color: '#0a1628', fontWeight: 500, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{s.num}</div>
                <h3 style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-us" style={{ padding: '72px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#d85a30', fontWeight: 500, marginBottom: '10px' }}>Why Choose Us</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#0a1628', marginBottom: '8px' }}>Built for Compliance,<br />Driven by Results</h2>
          <p style={{ fontSize: '15px', color: '#5a6072', lineHeight: 1.7, marginBottom: '40px', maxWidth: '480px' }}>
            We are a process-driven consultancy — not just a filing service.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
            {WHY.map((w) => (
              <div key={w.title} style={{ border: '0.5px solid #e5e2da', borderRadius: '10px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c8a84b', marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#0a1628', marginBottom: '4px' }}>{w.title}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.65 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREERS ── */}
      <section id="careers" style={{ padding: '72px 32px', background: '#faf8f3' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#d85a30', fontWeight: 500, marginBottom: '10px' }}>We&apos;re Hiring</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#0a1628', marginBottom: '8px' }}>Join Our Growing Team</h2>
          <p style={{ fontSize: '15px', color: '#5a6072', lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px' }}>
            Power India Services is expanding. We are looking for dynamic professionals to join our Compliance &amp; Certification team.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { role: 'Project Coordinator', type: 'Certification Projects', points: ['Manage end-to-end BIS, BEE & CDSCO projects', 'Coordinate with clients for documentation', 'Track application progress & timelines', 'Liaise with labs & regulatory authorities'] },
              { role: 'Operations Executive', type: 'Regulatory Compliance', points: ['Documentation preparation & verification', 'Maintain client records & data', 'Follow-up with clients & internal teams', 'Assist in compliance and process execution'] },
            ].map((job) => (
              <div key={job.role} style={{ background: '#fff', border: '0.5px solid #e2ddd4', borderRadius: '14px', padding: '28px' }}>
                <div style={{ display: 'inline-block', background: 'rgba(200,168,75,0.12)', color: '#85600a', fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', marginBottom: '14px', letterSpacing: '0.3px' }}>
                  {job.type}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#0a1628', marginBottom: '16px' }}>{job.role}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {job.points.map((p) => (
                    <li key={p} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#5a6072', lineHeight: 1.5 }}>
                      <span style={{ color: '#c8a84b', fontWeight: 700, flexShrink: 0 }}>→</span> {p}
                    </li>
                  ))}
                </ul>
                <a href="mailto:anand@powerindiaservices.com" style={{ display: 'inline-block', background: '#0a1628', color: '#fff', padding: '10px 22px', borderRadius: '7px', fontSize: '13px', fontWeight: 500 }}>
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#d85a30', padding: '64px 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Ready to Get Certified?</h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Speak with our experts today. Free consultation for all new clients.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:anand@powerindiaservices.com" style={{ background: '#fff', color: '#d85a30', padding: '13px 30px', borderRadius: '7px', fontSize: '14px', fontWeight: 500 }}>
            Email Us Now
          </a>
          <a href="tel:+917217698176" style={{ background: 'transparent', color: '#fff', padding: '13px 30px', borderRadius: '7px', fontSize: '14px', fontWeight: 500, border: '1.5px solid rgba(255,255,255,0.5)' }}>
            +91 72176 98176
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1628', padding: '36px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#e8c96a', marginBottom: '8px' }}>
          Power India Services
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' }}>
          India&apos;s trusted partner for BIS, WPC, EPR, LMPC, CDSCO &amp; ISO certifications
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
          <a href="mailto:anand@powerindiaservices.com" style={{ color: 'rgba(255,255,255,0.6)' }}>anand@powerindiaservices.com</a>
          &nbsp;|&nbsp;
          <a href="tel:+917217698176" style={{ color: 'rgba(255,255,255,0.6)' }}>+91 72176 98176</a>
        </p>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '20px' }}>
          © 2026 Power India Services. All rights reserved.
        </p>
      </footer>

      {/* ── MODALS ── */}
      {/* {modal === 'login' && (
        <LoginModal onClose={() => setModal(null)} onSwitch={() => setModal('signup')} />
      )}
      {modal === 'signup' && (
        <SignupModal onClose={() => setModal(null)} onSwitch={() => setModal('login')} />
      )} */}
    </>
  )
}