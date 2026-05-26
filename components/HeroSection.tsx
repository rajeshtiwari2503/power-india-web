//  'use client'

// import ContactForm from "./ui/Contactform"

 

// const CATS = [
//   { icon: '⚡', label: 'New\nConnections' },
//   { icon: '☀️', label: 'Solar\nEnergy' },
//   { icon: '🏭', label: 'Industrial\nPower' },
//   { icon: '📊', label: 'Energy\nAudit' },
//   { icon: '📋', label: 'Billing &\nCompliance' },
//   { icon: '🔧', label: 'Maintenance\nAMC' },
//   { icon: '🔋', label: 'Green\nEnergy' },
//   { icon: '🔌', label: 'Load\nEnhancement' },
// ]

// const STATS = [
//   { icon: '😊', num: '5K+',   label: 'Happy Clients' },
//   { icon: '🏆', num: '50+',   label: 'Professional Services' },
//   { icon: '⭐', num: '600+',  label: '5-Star Reviews' },
//   { icon: '💬', num: '10K+',  label: 'Questions Solved' },
// ]

// export default function HeroSection() {
//   return (
//     <section className="bg-gradient-to-br from-gray-900 via-[#1a2455] to-[#0f1635] relative overflow-hidden">
//       {/* decorative blobs */}
//       <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-brand-orange opacity-[0.06] pointer-events-none" />
//       <div className="absolute -bottom-16 left-[8%] w-72 h-72 rounded-full bg-brand-yellow opacity-[0.05] pointer-events-none" />

//       {/* main grid */}
//       <div className="max-w-[1260px] mx-auto px-5 pt-14 pb-0 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-10 items-start">

//         {/* ── LEFT ── */}
//         <div>
//           <h1 className="font-poppins font-extrabold text-4xl md:text-5xl text-white leading-[1.1] mb-4">
//             One-Stop{' '}
//             <span className="text-brand-orange">Power & Utility</span>
//             <br className="hidden sm:block" />
//             {' '}Solution for India
//           </h1>
//           <p className="text-base text-white/70 leading-relaxed mb-7 max-w-lg">
//             Startup or an established business, you&apos;ll find Power India Services fast, affordable and hassle-free for all your electricity and utility needs.
//           </p>

//           {/* category pills */}
//           <div className="flex flex-wrap gap-2.5 mb-8">
//             {CATS.map(c => (
//               <div key={c.label}
//                 className="flex flex-col items-center gap-1.5 bg-white/[0.07] border border-white/10 hover:bg-brand-orange/20 hover:border-brand-orange rounded-xl px-4 py-3 cursor-pointer transition-all min-w-[80px] text-center group">
//                 <span className="text-2xl">{c.icon}</span>
//                 <span className="text-[10.5px] text-white/70 font-semibold leading-tight group-hover:text-white whitespace-pre-line">
//                   {c.label}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* trust badges */}
//           <div className="flex flex-wrap gap-4 pb-10">
//             {['Google 4.9★ Rated', 'Pan India Service', '100% Compliant', '15+ Years Exp.'].map(t => (
//               <span key={t} className="flex items-center gap-1.5 text-xs text-white/60 font-semibold">
//                 <span className="text-brand-yellow">✓</span> {t}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* ── RIGHT — sticky form ── */}
//         <div className="bg-white rounded-2xl p-6 shadow-2xl lg:sticky lg:top-20 self-start mb-0 lg:-mb-6">
//           <h3 className="font-poppins font-bold text-[18px] text-brand-navy mb-1">Get Expert Assistance</h3>
//           <p className="text-xs text-gray-400 mb-4">Free consultation • No hidden charges • Fast processing</p>
//           <ContactForm />
//         </div>
//       </div>

//       {/* STATS BAR */}
//       <div className="bg-white/[0.05] border-t border-white/[0.07] mt-8 lg:mt-0">
//         <div className="max-w-[1260px] mx-auto px-5 grid grid-cols-2 lg:grid-cols-4">
//           {STATS.map((s, i) => (
//             <div key={s.label}
//               className={`flex flex-col items-center py-5 text-center ${i < 3 ? 'border-r border-white/[0.07]' : ''}`}>
//               <span className="text-2xl mb-1">{s.icon}</span>
//               <span className="font-poppins font-extrabold text-3xl text-brand-yellow leading-none">{s.num}</span>
//               <span className="text-[11px] text-white/50 font-medium mt-1">{s.label}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

 
import { motion } from "framer-motion"
import ContactForm from "./ui/Contactform"

// Highlight your real certification services
const CATS = [
  { icon: '🛡️', label: 'BIS\nRegistration' },
  { icon: '📡', label: 'WPC–ETA\nApproval' },
  { icon: '⭐', label: 'BEE Star\nRating' },
  { icon: '📶', label: 'TEC\nCertification' },
  { icon: '♻️', label: 'EPR / Waste\nManagement' },
  { icon: '⚖️', label: 'LMPC / Legal\nMetrology' },
  { icon: '📑', label: 'ISO / CE /\nRoHS' },
  { icon: '🔬', label: 'EMC / EMI /\nNABL Testing' },
]

const STATS = [
  { icon: '😊', num: '5K+', label: 'Happy Clients' },
  { icon: '🏆', num: '50+', label: 'Certification & Lab Services' },
  { icon: '⭐', num: '600+', label: '5-Star Reviews' },
  { icon: '💬', num: '10K+', label: 'Queries Resolved' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc]">
      
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

        <div className="absolute top-[40%] left-[35%] w-[350px] h-[350px] bg-cyan-200/20 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Floating Glow */}
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full border border-orange-200/40 animate-spin-slow" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full border border-blue-200/40 animate-spin-slow-reverse" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 pt-20 pb-12 grid lg:grid-cols-[1fr_420px] gap-14 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-orange-100 shadow-lg shadow-orange-100/40 rounded-full px-5 py-2 mb-6 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-sm font-semibold text-slate-700">
              India’s Trusted Certification Partner
            </span>
          </div>

          {/* heading */}
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] text-slate-900 tracking-tight">
            Compliance &
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Certification Services
            </span>
            <br />
            For Indian Market Entry
          </h1>

          {/* desc */}
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
            Power India Services helps you obtain BIS, WPC, BEE, TEC, ISO,
            EPR/LMPC, RoHS and other Indian approvals end‑to‑end – documentation,
            testing, filing and liaisoning – so you can launch and grow faster.
          </p>

          {/* buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-7 py-4 rounded-2xl font-semibold shadow-xl shadow-orange-300/40 hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Get Certification Roadmap</span>

              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            <a
              href="#services"
              className="bg-white border border-slate-200 text-slate-700 px-7 py-4 rounded-2xl font-semibold hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 transition-all duration-300"
            >
              View All Certifications
            </a>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {CATS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {c.icon}
                  </div>

                  <div className="text-sm font-bold text-slate-700 whitespace-pre-line leading-tight">
                    {c.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust */}
          <div className="flex flex-wrap gap-5 mt-10">
            {[
              'Google 4.9★ Rated',
              'Pan India Service',
              '100% Compliant',
              '15+ Years Experience'
            ].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-white px-4 py-2 rounded-full shadow-md"
              >
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  ✓
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {t}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          {/* glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-yellow-200 blur-3xl opacity-20 scale-105 rounded-[40px]" />

          <div className="relative bg-white/80 backdrop-blur-2xl border border-white rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ⚡ Free Consultation
              </div>

              <h3 className="text-3xl font-black text-slate-900 leading-tight">
                Talk To
                <br />
                Energy Experts
              </h3>

              <p className="text-slate-500 mt-3 leading-7">
                Get instant support from professionals for electricity,
                compliance, solar and industrial utility solutions.
              </p>
            </div>

            <ContactForm />
          </div>
        </motion.div>
      </div>

      {/* STATS */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 pb-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white rounded-[28px] p-7 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="text-4xl mb-3">{s.icon}</div>

                <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {s.num}
                </div>

                <div className="text-slate-500 font-semibold mt-2">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spinReverse 18s linear infinite;
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </section>
  )
}