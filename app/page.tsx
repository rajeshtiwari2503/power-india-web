"use client"
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

/* ─── DATA ─────────────────────────────────────────────────────── */
const CERTS = ["BIS-CRS", "BIS-ISI", "WPC-ETA", "EPR", "LMPC", "CDSCO", "ISO", "BEE"]

const SERVICES = [
  { icon: "🛡️", title: "BIS-CRS Registration", desc: "End-to-end BIS certification for electronics & IT products sold in India.", tags: ["Electronics", "Mandatory"], color: "#3730a3", from: "from-[#3730a3]" },
  { icon: "⭐", title: "BIS-ISI Mark", desc: "Quality mark for Indian manufacturers. Factory audit, lab testing & license.", tags: ["Manufacturing", "Quality"], color: "#7c3aed", from: "from-[#7c3aed]" },
  { icon: "📡", title: "WPC-ETA Approval", desc: "Wireless approvals for Wi-Fi, Bluetooth, Zigbee, GPS & RF devices.", tags: ["Wireless", "RF"], color: "#0d9488", from: "from-[#0d9488]" },
  { icon: "♻️", title: "EPR Compliance", desc: "Plastic, e-waste & battery compliance filing & annual targets.", tags: ["E-Waste", "Recycling"], color: "#e11d48", from: "from-[#e11d48]" },
  { icon: "💊", title: "CDSCO Registration", desc: "Medical device approvals & import licenses from CDSCO.", tags: ["Medical", "Healthcare"], color: "#f59e0b", from: "from-[#f59e0b]" },
  { icon: "⚖️", title: "LMPC Registration", desc: "Packaged commodity labeling & Legal Metrology compliance.", tags: ["Import", "Labeling"], color: "#3730a3", from: "from-[#3730a3]" },
  { icon: "📋", title: "ISO Certification", desc: "ISO 9001, 14001, 45001 implementation, gap analysis & third-party audit.", tags: ["Quality", "Management"], color: "#7c3aed", from: "from-[#7c3aed]" },
  { icon: "⚡", title: "BEE Star Rating", desc: "Energy efficiency star label for ACs, refrigerators & appliances.", tags: ["Energy", "Appliances"], color: "#0d9488", from: "from-[#0d9488]" },
  { icon: "🌐", title: "TEC Certification", desc: "Telecom Equipment Centre approvals for all telecom products.", tags: ["Telecom", "Mandatory"], color: "#e11d48", from: "from-[#e11d48]" },
]

const STEPS = [
  { num: "01", icon: "🎯", title: "Consultation", desc: "We analyze your product category & map the exact certifications required." },
  { num: "02", icon: "📁", title: "Documentation", desc: "Collect all required technical documents, test reports & company papers." },
  { num: "03", icon: "🔬", title: "Lab Testing", desc: "Coordination with NABL-accredited labs for product testing." },
  { num: "04", icon: "📤", title: "Filing", desc: "Submit applications on government portals & track all queries." },
  { num: "05", icon: "🏭", title: "Audit Support", desc: "On-site preparation & support during factory inspection." },
  { num: "06", icon: "🏆", title: "Certification", desc: "Final certificate delivery & renewal reminders set up." },
]

const WHY = [
  { icon: "👤", title: "Dedicated Manager", desc: "Single point of contact for your entire certification journey." },
  { icon: "⚡", title: "40% Faster", desc: "Our expertise reduces application time vs industry average." },
  { icon: "💰", title: "Transparent Pricing", desc: "Fixed fees quoted upfront. No hidden charges. Ever." },
  { icon: "🔒", title: "Secure Vault", desc: "All your documents stored securely with version control." },
  { icon: "🔔", title: "Renewal Alerts", desc: "Auto-reminders so you never miss a certificate deadline." },
  { icon: "🌍", title: "PAN India", desc: "Serving manufacturers across Delhi, Mumbai, Bangalore & beyond." },
]

const CLIENTS = [
  { sector: "Consumer Electronics", count: "120+", icon: "📱" },
  { sector: "Medical Devices", count: "85+", icon: "🏥" },
  { sector: "FMCG & Packaging", count: "95+", icon: "📦" },
  { sector: "Telecom & Wireless", count: "70+", icon: "📡" },
  { sector: "Automotive Parts", count: "45+", icon: "🚗" },
  { sector: "Industrial Equipment", count: "60+", icon: "⚙️" },
]

const TESTIMONIALS = [
  { name: "Rajesh Kumar", company: "TechCorp Electronics Pvt Ltd", city: "Delhi", text: "Power India Services got our BIS-CRS done in 45 days flat. Their team handled everything — testing, filing, query responses. We just provided the product and documents.", rating: 5 },
  { name: "Priya Mehta", company: "MedEquip Imports", city: "Mumbai", text: "CDSCO registration seemed impossible until we approached Power India Services. Their expertise in medical device regulations is unmatched. Highly recommended.", rating: 5 },
  { name: "Arun Nair", company: "GreenPack Solutions", city: "Bangalore", text: "EPR compliance was a nightmare for us. Their team simplified the entire process, got our registration done, and now manages our annual filings too.", rating: 5 },
]

const FAQS = [
  { q: "How long does BIS-CRS certification take?", a: "BIS-CRS typically takes 30–60 days depending on the product category and lab availability. Some products with existing test reports can be faster." },
  { q: "Do you handle international product certifications?", a: "We specialize in Indian regulatory certifications. For CE, FCC or other marks, we connect you with our global partners." },
  { q: "What is the difference between BIS-CRS and BIS-ISI?", a: "BIS-CRS is for electronics and IT products sold in India. BIS-ISI is for Indian manufacturers of goods like steel, cement, and packaged commodities." },
  { q: "Can you handle multiple certifications simultaneously?", a: "Yes! We regularly manage BIS + WPC + EPR for the same client, reducing overall time and coordination effort significantly." },
  { q: "Do you offer post-certification support?", a: "Absolutely. We manage renewals, annual surveillance, factory re-inspections, and any regulatory updates affecting your certifications." },
  { q: "What documents are needed to start?", a: "Company registration, product brochure/datasheet, authorized Indian representative details, and product samples for testing." },
]

const CAREERS = [
  { role: "Senior Certification Manager", type: "Full-time · Delhi / Remote", exp: "3–5 years", skills: ["BIS experience", "WPC filings", "Client handling", "Government portals"], urgent: true },
  { role: "Regulatory Affairs Executive", type: "Full-time · Delhi", exp: "1–3 years", skills: ["EPR compliance", "CDSCO filings", "Documentation", "MS Office"], urgent: false },
  { role: "Business Development Executive", type: "Full-time · Pan India", exp: "2–4 years", skills: ["B2B sales", "Regulatory knowledge", "Lead generation", "CRM tools"], urgent: false },
]

/* ─── COMPONENTS ────────────────────────────────────────────────── */
function StatCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let t: ReturnType<typeof setInterval>
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        let s = 0; const step = end / (2000 / 16)
        t = setInterval(() => { s += step; if (s >= end) { setCount(end); clearInterval(t) } else setCount(Math.floor(s)) }, 16)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => { obs.disconnect(); clearInterval(t) }
  }, [end])
  return <span ref={ref}>{count}{suffix}</span>
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-2xl overflow-hidden mb-2.5 transition-shadow duration-300 ${open ? "shadow-[0_6px_20px_rgba(124,58,237,0.12)]" : ""}`}
      style={{ border: `1px solid ${open ? "#7c3aed" : "#e2e8f0"}` }}>
      <button onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center gap-3 px-[18px] py-[15px] text-left border-none cursor-pointer transition-all duration-300 ${open ? "bg-gradient-to-r from-[#3730a3] to-[#7c3aed]" : "bg-white hover:bg-slate-50"}`}>
        <span className={`font-grotesk text-sm font-semibold leading-snug ${open ? "text-white" : "text-slate-800"}`}>{q}</span>
        <span className={`text-xl flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-gold-lt" : "text-violet"}`}>+</span>
      </button>
      {open && <div className="px-[18px] py-[14px] bg-slate-50 text-[13px] text-slate-500 leading-relaxed">{a}</div>}
    </div>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(t)
  }, [])

  const NAV = ["Services", "Process", "Why Us", "Testimonials", "Careers", "FAQ"]

  return (
    <>
      <Head>
        <title>Power India Services | India's #1 Certification & Compliance Consultancy</title>
        <meta name="description" content="BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE — End-to-end regulatory certification consultants in India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">

          {/* Logo */}
          {/* <Link href="/" className={`font-playfair text-lg sm:text-xl font-black flex-shrink-0 transition-colors ${scrolled ? "text-navy" : "text-white"}`}>
            Power <span className="text-gold">India</span>
            <span className={scrolled ? "text-violet" : "text-violet-lt"}> Services</span>
          </Link> */}
          <Link
            href="/"
            className={`font-playfair text-lg sm:text-xl font-black flex-shrink-0 transition-colors ${scrolled ? "text-purple-900" : "text-gray-200"
              }`}
          >
            Power <span className="text-yellow-500"> India </span>
            <span className={scrolled ? "text-purple-700" : "text-purple-300"}>
              Services
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                className={`font-grotesk text-sm font-medium transition-colors hover:text-gold ${scrolled ? "text-slate-600" : "text-white/85"}`}>
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/login"
              className={`btn-shine font-grotesk text-[13px] font-bold px-4 py-2.5 rounded-[9px] transition-all duration-200 hover:-translate-y-0.5 ${scrolled ? "bg-gradient-to-r from-navy-mid to-violet text-white shadow-[0_4px_12px_rgba(55,48,163,0.2)]" : "bg-gold text-navy"}`}>
              Log In →
            </Link>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1.5 rounded-lg flex items-center justify-center">
              <svg width={24} height={24} fill="none" stroke={scrolled ? "#1e293b" : "#fff"} strokeWidth={2} viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-0.5 shadow-xl">
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}
                className="font-grotesk text-sm font-semibold text-slate-700 py-3 border-b border-slate-100 last:border-0">
                {l}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center mt-2 w-full py-3 rounded-[9px] text-sm font-bold text-white bg-gradient-to-r from-navy-mid to-violet"
            >
              Log In →
            </Link>
          </div>
        )}
      </nav>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="animate-grad bg-300 relative min-h-screen flex items-center overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#3730a3 40%,#7c3aed 70%,#0d9488 100%)" }}>

        {/* Blobs */}
        <div className="absolute top-[8%] right-[4%] w-32 sm:w-56 lg:w-72 h-32 sm:h-56 lg:h-72 rounded-full pointer-events-none animate-float-slow"
          style={{ background: "rgba(245,158,11,.12)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[8%] left-[4%] w-24 sm:w-44 lg:w-56 h-24 sm:h-44 lg:h-56 rounded-full pointer-events-none animate-float-rev"
          style={{ background: "rgba(225,29,72,.1)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-14 items-center">

            {/* Left */}
            <div className="animate-fade-up text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/15 text-[11px] font-bold uppercase tracking-widest text-gold-lt font-grotesk mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot inline-block" />
                India's #1 Certification Consultancy
              </div>

              <h1 className="font-playfair font-black text-white leading-[1.12] mb-4
                text-[30px] sm:text-[40px] lg:text-[52px]">
                Regulatory <span className="grad-text">Compliance</span><br />
                Made <em className="not-italic text-gold-lt">Effortless</em>
              </h1>

              <p className="text-white/72 leading-relaxed mb-7 max-w-lg
                text-[14px] sm:text-[15px]">
                India's most trusted certification consultancy. We handle BIS, WPC, EPR, LMPC, CDSCO, ISO, BEE and 20+ regulatory approvals — end-to-end, on time.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto">
                <a
                  href="#services"
                  className="btn-shine inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-rose-500 text-white font-grotesk font-bold text-sm px-6 py-3.5 rounded-[10px] text-center transition-all hover:-translate-y-0.5 hover:shadow-lg border border-white/30"
                >
                  Explore Services ↓
                </a>
                <a href="mailto:anand@powerindiaservices.com"
                  className="btn-shine border border-white/30 bg-white/10 text-white font-grotesk font-bold text-sm px-6 py-3.5 rounded-[10px] text-center transition-all hover:bg-white/20">
                  Free Consultation
                </a>
              </div>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {CERTS.map(c => (
                  <span key={c} className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-[11px] text-white font-grotesk font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero card — hidden on mobile */}
            {/* <div className="hidden sm:block glass rounded-[22px] animate-float p-6 lg:p-7 shadow-[0_36px_72px_rgba(0,0,0,.28)]"> */}
            <div className="  glass rounded-[22px] animate-float p-6 lg:p-7 shadow-[0_36px_72px_rgba(0,0,0,.28)]">
              <p className="font-playfair text-[17px] font-bold text-gold-lt mb-1">Why Clients Choose Us</p>
              <p className="text-[12px] text-white/50 mb-5">Trusted by 500+ companies across India</p>

              {[
                { label: "Application Success Rate", val: 98, color: "#10b981" },
                { label: "Client Retention", val: 94, color: "#f59e0b" },
                { label: "Faster Than Industry Avg", val: 40, color: "#ffffff", suffix: "%" },
              ].map(s => (
                <div key={s.label} className="mb-3.5">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] text-white/75 font-medium">{s.label}</span>
                    <span className="text-[12px] font-bold" style={{ color: s.color }}>{s.val}{s.suffix || "%"}</span>
                  </div>
                  <div className="bg-white/10 rounded-full h-[5px] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.val}%`, background: s.color }} />
                  </div>
                </div>
              ))}

              <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-2.5">
                {[["500+", "Certs Done"], ["8+", "Cert Types"], ["10+", "Years Exp"], ["100%", "Transparent"]].map(([n, l]) => (
                  <div key={l} className="text-center bg-white/6 rounded-[10px] py-2.5">
                    <div className="font-playfair text-[18px] font-black text-gold-lt">{n}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS ══════════════════════ */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-l border-white/8">
          {[
            { end: 500, suffix: "+", label: "Certifications" },
            { end: 98, suffix: "%", label: "Success Rate" },
            { end: 350, suffix: "+", label: "Happy Clients" },
            { end: 10, suffix: "+", label: "Years Exp" },
            { end: 20, suffix: "+", label: "Categories" },
          ].map((s, i) => (
            <div key={s.label}
              className={`text-center py-5 sm:py-6 px-2 border-r border-white/8 ${i >= 4 ? "hidden lg:block" : ""} ${i === 2 ? "hidden sm:block" : ""}`}>
              <div className="font-playfair text-2xl sm:text-3xl font-black text-gold">
                <StatCounter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-[11px] text-white/40 mt-1 font-grotesk">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════ SERVICES ══════════════════════ */}
      <section
        id="services"
        className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-500 via-red-200 to-blue-300"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block bg-gradient-to-r from-navy-mid to-violet text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[2px] mb-3 font-grotesk">
              Our Services
            </span>
            <h2 className="font-playfair font-black text-navy leading-tight mb-3 text-[24px] sm:text-[32px] lg:text-[38px]">
              Every Certification,<br /><span className="grad-text">We Handle It All</span>
            </h2>
            <p className="text-slate-500 text-[13px] sm:text-[15px] max-w-xl mx-auto leading-relaxed">
              End-to-end regulatory certification solutions for Indian & global manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {SERVICES.map(s => (
              <div key={s.title} className="card overflow-hidden relative">
                <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${s.color},${s.color}88)` }} />
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="text-[26px] mb-3">{s.icon}</div>
                  <h3 className="font-grotesk text-[14px] font-bold text-navy mb-1.5">{s.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-1 rounded-full font-grotesk"
                        style={{ background: `${s.color}12`, color: s.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ INDUSTRIES ══════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg,#1e1b4b,#3730a3)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-playfair font-black text-white mb-2 text-[24px] sm:text-[30px] lg:text-[36px]">
              Industries We Serve
            </h2>
            <p className="text-white/55 text-[14px]">Trusted by companies across sectors throughout India</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {CLIENTS.map(c => (
              <div key={c.sector}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-white/12 bg-white/6 hover:bg-white/10 transition-colors">
                <div className="text-[28px] sm:text-[32px] flex-shrink-0">{c.icon}</div>
                <div>
                  <div className="font-grotesk text-[13px] sm:text-[14px] font-semibold text-white">{c.sector}</div>
                  <div className="text-[12px] text-gold-lt mt-0.5">{c.count} Clients</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PROCESS ══════════════════════ */}
      <section id="process" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-600 via-red-200 to-blue-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block bg-gradient-to-r from-teal to-navy-mid text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[2px] mb-3 font-grotesk">
              Our Process
            </span>
            <h2 className="font-playfair font-black text-navy mb-3 text-[24px] sm:text-[32px] lg:text-[38px]">
              6-Step <span className="grad-text">Certification Process</span>
            </h2>
            <p className="text-slate-500 text-[13px] sm:text-[15px] max-w-md mx-auto leading-relaxed">
              Simple, structured & fully transparent workflow that keeps you informed at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {STEPS.map(s => (
              <div key={s.num} className="card p-4 sm:p-5 lg:p-6 relative overflow-hidden">
                <div className="absolute top-3 right-4 font-playfair text-[40px] font-black text-slate-100 leading-none select-none">
                  {s.num}
                </div>
                <div className="text-[24px] mb-2.5">{s.icon}</div>
                <h3 className="font-grotesk text-[14px] font-bold text-navy mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-navy-mid to-violet" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY US ══════════════════════ */}
      <section id="why-us" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-14 items-start">

            {/* Left text */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="inline-block bg-gradient-to-r from-rose to-gold text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[2px] mb-3 font-grotesk">
                Why Choose Us
              </span>
              <h2 className="font-playfair font-black text-navy leading-tight mb-3 text-[24px] sm:text-[30px] lg:text-[36px]">
                We Don't Just File —<br /><span className="grad-text">We Deliver Results</span>
              </h2>
              <p className="text-slate-500 text-[14px] leading-relaxed mb-6 max-w-sm">
                Our process-first approach, deep regulatory expertise, and client-centric model sets us apart from every other consultancy in India.
              </p>
              <a href="mailto:anand@powerindiaservices.com"
                className="btn-shine bg-gradient-to-r from-navy-mid to-violet text-white font-grotesk font-bold text-sm px-6 py-3 rounded-[10px] transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Get Started Today →
              </a>
            </div>

            {/* Why cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WHY.map(w => (
                <div key={w.title} className="card p-4 sm:p-5">
                  <div className="text-[20px] mb-2">{w.icon}</div>
                  <h4 className="font-grotesk text-[13px] font-bold text-navy mb-1">{w.title}</h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section id="testimonials"
        className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#7c3aed,#3730a3,#1e1b4b)" }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-playfair font-black text-white mb-2 text-[24px] sm:text-[32px] lg:text-[36px]">
              What Our Clients Say
            </h2>
            <p className="text-white/50 text-[14px]">Real results, real businesses</p>
          </div>

          <div className="relative min-h-[300px] sm:min-h-[260px]">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name}
                className="absolute inset-0 transition-all duration-700"
                style={{ opacity: i === activeTestimonial ? 1 : 0, transform: i === activeTestimonial ? "translateY(0)" : "translateY(16px)", pointerEvents: i === activeTestimonial ? "auto" : "none" }}>
                <div className="glass rounded-[18px] p-5 sm:p-7">
                  <div className="text-[26px] text-gold-lt mb-3 font-serif">"</div>
                  <p className="text-[13px] sm:text-[15px] text-white/90 leading-relaxed italic mb-4">{t.text}</p>
                  <div className="flex flex-wrap justify-between items-center gap-2.5">
                    <div>
                      <div className="font-grotesk text-[14px] font-bold text-gold-lt">{t.name}</div>
                      <div className="text-[12px] text-white/55">{t.company} · {t.city}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => <span key={j} className="text-gold text-[15px]">★</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-[320px] sm:mt-[280px]">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === activeTestimonial ? "w-7 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <section id="faq" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block bg-gradient-to-r from-teal to-navy-mid text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[2px] mb-3 font-grotesk">
              FAQ
            </span>
            <h2 className="font-playfair font-black text-navy mb-2 text-[24px] sm:text-[32px] lg:text-[36px]">
              Frequently Asked Questions
            </h2>
            <p className="text-[13px] sm:text-[14px] text-slate-500">
              Can't find your answer?{" "}
              <a href="mailto:anand@powerindiaservices.com" className="text-violet hover:underline font-medium">
                anand@powerindiaservices.com
              </a>
            </p>
          </div>
          {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
      </section>

      {/* ══════════════════════ CAREERS ══════════════════════ */}
      <section id="careers" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block bg-gradient-to-r from-rose to-gold text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[2px] mb-3 font-grotesk">
              We're Hiring
            </span>
            <h2 className="font-playfair font-black text-navy mb-3 text-[24px] sm:text-[32px] lg:text-[38px]">
              Join Our Growing Team
            </h2>
            <p className="text-slate-500 text-[13px] sm:text-[15px] max-w-md mx-auto leading-relaxed">
              Great culture, learning opportunities, and competitive pay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CAREERS.map(job => (
              <div key={job.role} className="card p-5 sm:p-6 relative overflow-hidden flex flex-col">
                {job.urgent && (
                  <div className="absolute top-3.5 right-3.5 bg-rose text-white text-[10px] font-bold px-2.5 py-1 rounded-full font-grotesk">
                    URGENT
                  </div>
                )}
                <span className="inline-block bg-gradient-to-r from-navy-mid to-violet text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-3 w-fit font-grotesk">
                  {job.type}
                </span>
                <h3 className="font-playfair text-[18px] font-bold text-navy mb-1">{job.role}</h3>
                <div className="text-[12px] text-violet font-semibold font-grotesk mb-4">Experience: {job.exp}</div>
                <div className="flex-1 space-y-1.5 mb-5">
                  {job.skills.map(sk => (
                    <div key={sk} className="flex items-center gap-2 text-[13px] text-slate-600">
                      <span className="text-emerald-500 font-bold flex-shrink-0">✓</span> {sk}
                    </div>
                  ))}
                </div>
                <a href="mailto:anand@powerindiaservices.com"
                  className="btn-shine block text-center bg-gradient-to-r from-navy to-navy-mid text-white font-grotesk font-bold text-[13px] py-3 rounded-[9px] transition-all hover:-translate-y-0.5">
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA ══════════════════════ */}
      <section className="animate-grad-fast bg-200 relative overflow-hidden py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "linear-gradient(135deg,#f59e0b 0%,#e11d48 50%,#7c3aed 100%)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="font-playfair font-black text-white leading-tight mb-3 text-[26px] sm:text-[34px] lg:text-[42px]">
            Ready to Get Your<br />Product Certified?
          </h2>
          <p className="text-white/85 text-[13px] sm:text-[15px] leading-relaxed mb-8">
            Free 30-minute consultation for all new clients. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="mailto:anand@powerindiaservices.com"
              className="btn-shine w-full sm:w-auto bg-white text-navy-mid font-grotesk font-bold text-sm px-7 py-3.5 rounded-[11px] transition-all hover:-translate-y-0.5 hover:shadow-xl text-center">
              Email Us Now
            </a>
            <a href="tel:+917217698176"
              className="btn-shine w-full sm:w-auto bg-white/15 border-2 border-white/40 text-white font-grotesk font-bold text-sm px-7 py-3.5 rounded-[11px] transition-all hover:bg-white/25 text-center">
              📞 +91 72176 98176
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer className="relative bg-[#070617] text-white overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute -top-36 -left-28 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "rgba(124,58,237,.18)", filter: "blur(140px)" }} />
        <div className="absolute -bottom-36 -right-28 w-[26rem] h-[26rem] rounded-full pointer-events-none"
          style={{ background: "rgba(245,158,11,.08)", filter: "blur(160px)" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">

          {/* Newsletter */}
          <div className="mb-10 sm:mb-14 p-5 sm:p-7 lg:p-8 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-xl
            flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div>
              <h3 className="font-grotesk text-[15px] sm:text-[17px] font-bold text-white mb-1">
                Stay Updated with Compliance Alerts
              </h3>
              <p className="text-[13px] text-white/50">Get BIS, WPC, EPR regulatory updates directly in your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <input value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full lg:w-[240px] px-4 py-3 rounded-[10px] bg-black/40 border border-white/10 text-white text-[13px] font-inter focus:border-violet transition-colors"
              />
              <button className="px-5 py-3 rounded-[10px] bg-gradient-to-r from-violet to-rose text-white font-grotesk font-bold text-[13px] hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-14 border-b border-white/8">

            {/* Brand — full width on mobile */}
            <div className="col-span-2 lg:col-span-1">
              <div className="font-playfair text-[20px] font-black text-white mb-3">
                Power<span className="text-gold">India</span> <span className="text-violet-lt">Services</span>
              </div>
              <p className="text-[13px] text-white/55 leading-relaxed mb-4 max-w-[280px]">
                India's leading regulatory consultancy helping brands achieve certification faster with zero friction.
              </p>
              <div className="flex gap-2">
                {["📧", "📞", "💼", "🐦"].map((ic, i) => (
                  <div key={i} className="w-9 h-9 rounded-[9px] bg-white/7 border border-white/10 flex items-center justify-center text-[15px] cursor-pointer hover:bg-white/12 transition-colors">
                    {ic}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-grotesk text-[11px] font-bold text-white/50 uppercase tracking-[2px] mb-4">Services</h4>
              <div className="space-y-2">
                {["BIS-CRS", "BIS-ISI", "WPC-ETA", "EPR", "CDSCO", "LMPC", "ISO", "BEE"].map(s => (
                  <a key={s} href="#services" className="block text-[13px] text-white/50 hover:text-gold-lt transition-colors">{s}</a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-grotesk text-[11px] font-bold text-white/50 uppercase tracking-[2px] mb-4">Company</h4>
              <div className="space-y-2">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Process", href: "#process" },
                  { label: "Why Choose Us", href: "#why-us" },
                  { label: "Testimonials", href: "#testimonials" },
                  { label: "Careers", href: "#careers" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Service", href: "/terms" },
                ].map(s => (
                  <Link key={s.label} href={s.href} className="block text-[13px] text-white/50 hover:text-violet-lt transition-colors">{s.label}</Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-grotesk text-[11px] font-bold text-white/50 uppercase tracking-[2px] mb-4">Contact</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gold text-[11px] font-semibold mb-0.5">Email</p>
                  <a href="mailto:anand@powerindiaservices.com" className="text-[12px] text-white/60 hover:text-white transition-colors break-all">
                    anand@powerindiaservices.com
                  </a>
                </div>
                <div>
                  <p className="text-gold text-[11px] font-semibold mb-0.5">Phone</p>
                  <a href="tel:+917217698176" className="text-[13px] text-white/60 hover:text-white transition-colors">
                    +91 72176 98176
                  </a>
                </div>
                <div>
                  <p className="text-gold text-[11px] font-semibold mb-0.5">Office</p>
                  <span className="text-[13px] text-white/60">New Delhi, India</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] bg-emerald-500/10 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-[11px] text-emerald-300 font-medium">Mon–Sat, 9am–7pm IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cert pills */}
          <div className="py-5 border-b border-white/8 flex flex-wrap gap-2 items-center">
            <span className="text-[11px] text-white/30 uppercase tracking-wider mr-1">Certifications:</span>
            {CERTS.map(c => (
              <span key={c} className="bg-white/6 border border-white/10 rounded-full px-3 py-1 text-[11px] text-white/55 font-grotesk hover:border-violet/50 hover:text-violet-lt transition-colors cursor-default">
                {c}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <span className="text-[11px] text-white/25">
              © 2026 Power India Services. All rights reserved. | CIN: U74900DL2015PTC123456
            </span>
            <div className="flex gap-5">
              {[{ label: "Privacy", href: "/privacy-policy" }, { label: "Terms", href: "/terms" }, { label: "Sitemap", href: "#" }].map(l => (
                <Link key={l.label} href={l.href} className="text-[11px] text-white/35 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a href="https://wa.me/917217698176" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[999] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-[0_6px_24px_rgba(37,211,102,.4)] hover:scale-110 transition-transform">
        <svg width={26} height={26} viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.523 5.847L.057 23.882a.5.5 0 00.61.61l6.034-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.656-.49-5.189-1.349l-.372-.214-3.862.938.954-3.858-.235-.388A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </>
  )
}