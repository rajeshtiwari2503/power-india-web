//  import Link from 'next/link'
// import { FOOTER_COLS } from '@/lib/navData'

import Link from "next/link"

// const socials = ['f', 'ig', '𝕏', 'in', 'pt', 'yt']

// export default function Footer() {
//   return (
//     <>
//       {/* CTA strip */}
//       <div className="bg-gradient-to-r from-gray-900 via-brand-navy to-gray-900 py-9 px-5">
//         <div className="max-w-[1260px] mx-auto flex items-center justify-between flex-wrap gap-5">
//           <div>
//             <h3 className="font-poppins font-bold text-2xl text-white mb-1">Ready to Power Your Business?</h3>
//             <p className="text-gray-300 text-sm">Free expert consultation — no hidden charges, fast processing</p>
//           </div>
//           <div className="flex gap-3 flex-wrap">
//             <a href="tel:+919999000000"
//               className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHv text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors">
//               📞 Call: +91 9999-000-000
//             </a>
//             <a href="https://wa.me/919999000000" target="_blank" rel="noreferrer"
//               className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors">
//               💬 WhatsApp Us →
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* gradient bar */}
//       <div className="footer-bar" />

//       {/* Main footer */}
//       <footer className="bg-[#0c1230] text-gray-400 pt-12">
//         <div className="max-w-[1260px] mx-auto px-5">

//           {/* top grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 pb-10 border-b border-white/5">

//             {/* brand */}
//             <div>
//               <div className="mb-4">
//                 <div className="font-poppins font-extrabold text-2xl leading-tight">
//                   <span className="text-white">Power </span>
//                   <span className="text-brand-orange">India</span>
//                 </div>
//                 <span className="text-[9px] tracking-[2px] text-white/25 uppercase font-semibold">Services</span>
//               </div>
//               <p className="text-sm text-gray-500 leading-relaxed mb-4">
//                 India&apos;s trusted partner for electricity connections, energy audits, solar installations, and all utility management services across 25+ states.
//               </p>
//               <div className="flex flex-col gap-2 mb-5 text-[13px] text-gray-500">
//                 <a href="tel:+919999000000"   className="flex items-center gap-2 hover:text-brand-yellow transition-colors">📞 +91 9999-000-000</a>
//                 <a href="tel:01100000000"      className="flex items-center gap-2 hover:text-brand-yellow transition-colors">📞 011-XXXXXXXX (Landline)</a>
//                 <a href="mailto:info@powerindiaservices.com" className="flex items-center gap-2 hover:text-brand-yellow transition-colors">📧 info@powerindiaservices.com</a>
//                 <span className="flex items-center gap-2">⏰ Mon–Sat, 9:00 AM – 7:00 PM</span>
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {socials.map(s => (
//                   <a key={s} href="#"
//                     className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[12px] font-bold text-gray-400 hover:bg-brand-orange hover:text-white transition-colors">
//                     {s}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* links grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//               {FOOTER_COLS.map(col => (
//                 <div key={col.title}>
//                   <h5 className="font-poppins font-bold text-[13.5px] text-white mb-3 pb-2 border-b-2 border-brand-orange inline-block">
//                     {col.title}
//                   </h5>
//                   <ul className="flex flex-col gap-1.5">
//                     {col.links.map(l => (
//                       <li key={l.label}>
//                         <Link href={l.href}
//                           className="text-[13px] text-gray-500 hover:text-brand-yellow flex items-center gap-1.5 transition-colors">
//                           <span className="text-brand-orange text-sm">›</span>{l.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* trust badges */}
//           <div className="flex items-center gap-6 flex-wrap py-5 border-b border-white/5 text-[13px] font-semibold text-gray-500">
//             {['⚡ Reliable', '💰 Affordable', '✅ Assured Quality', '🔒 SSL Secured', '🇮🇳 Made in India'].map(b => (
//               <span key={b}>{b}</span>
//             ))}
//           </div>

//           {/* bottom */}
//           <div className="flex items-center justify-between flex-wrap gap-3 py-4">
//             <p className="text-[12.5px] text-gray-600">© 2026 Power India Services. All rights reserved.</p>
//             <div className="flex gap-4">
//               {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Sitemap'].map(l => (
//                 <Link key={l} href="#" className="text-[12px] text-gray-600 hover:text-brand-orange transition-colors">{l}</Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Floating buttons */}
//       <a href="https://wa.me/919999000000" target="_blank" rel="noreferrer"
//         className="fab fab-wa fixed bottom-7 right-7 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-fab z-50 hover:scale-110 transition-transform">
//         <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
//           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//         </svg>
//       </a>
//       <a href="tel:+919999000000"
//         className="fixed bottom-24 right-7 w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center shadow-fab z-50 hover:scale-110 transition-transform">
//         <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
//           <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
//         </svg>
//       </a>
//     </>
//   )
// }

  
import { FOOTER_COLS } from '@/lib/navData'

const socials = [
  { label: 'Facebook', icon: 'f' },
  { label: 'Instagram', icon: 'ig' },
  { label: 'X', icon: '𝕏' },
  { label: 'LinkedIn', icon: 'in' },
  { label: 'Pinterest', icon: 'pt' },
  { label: 'YouTube', icon: 'yt' },
]

const trustBadges = [
  '⚡ Fast Processing',
  '✅ 100% Compliance',
  '🛡️ Trusted by Businesses',
  '🔒 Secure Consultation',
  '🇮🇳 PAN India Service',
]

export default function Footer() {
  return (
    <>
      {/* TOP CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 px-5 py-14">

        {/* effects */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="relative z-10 max-w-[1260px] mx-auto rounded-[36px] border border-orange-100 bg-white/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(251,146,60,0.08)] p-8 lg:p-12">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

                <span className="text-[11px] font-bold uppercase tracking-[2px] text-orange-600">
                  PAN India Utility Services
                </span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">
                Ready To Grow
                <br />

                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                  Your Business Faster?
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
                Expert support for electricity approvals, solar solutions,
                compliance certifications, testing labs, WPC approvals,
                trademark registration, and utility consultancy services.
              </p>
            </div>

            {/* buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              <a
                href="tel:+919999000000"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-5 text-sm font-bold text-white shadow-[0_15px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-105"
              >
                📞 Call Now

                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>

              <a
                href="https://wa.me/919999000000"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-8 py-5 text-sm font-bold text-green-700 transition-all duration-300 hover:bg-green-500 hover:text-white hover:border-green-500"
              >
                {/* WhatsApp Icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>

                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer className="relative overflow-hidden bg-[#f8fafc] border-t border-slate-200">

        {/* bg effects */}
        <div className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full bg-orange-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-yellow-100/40 blur-3xl" />

        <div className="relative z-10 max-w-[1260px] mx-auto px-5 pt-20">

          {/* TOP GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 pb-14 border-b border-slate-200">

            {/* BRAND */}
            <div>

              <div className="mb-6">
                <h2 className="text-4xl font-black leading-none text-slate-900">
                  Power{' '}

                  <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                    India
                  </span>
                </h2>

                <div className="mt-2 text-[10px] uppercase tracking-[5px] text-slate-400 font-semibold">
                  SERVICES
                </div>
              </div>

              <p className="text-[15px] leading-8 text-slate-600 mb-8">
                Trusted utility consultancy company delivering electricity
                approvals, WPC certifications, testing services, solar
                consultancy, LMPC registration, RoHS certification, and
                compliance solutions across India.
              </p>

              {/* contact cards */}
              <div className="space-y-4 mb-8">

                <a
                  href="tel:+919999000000"
                  className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                    📞
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Call Us
                    </p>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      +91 9999-000-000
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@powerindiaservices.com"
                  className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                    📧
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Email Support
                    </p>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      info@powerindiaservices.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                    ⏰
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Working Hours
                    </p>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      Mon – Sat • 9 AM – 7 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* socials */}
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-black text-slate-500 shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-400 hover:text-white hover:border-transparent hover:shadow-lg"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {FOOTER_COLS.map((col) => (
                <div key={col.title}>

                  <div className="mb-5">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />

                      <h5 className="text-sm font-black uppercase tracking-wide text-slate-900">
                        {col.title}
                      </h5>
                    </div>

                    <div className="h-[2px] w-14 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                  </div>

                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="group inline-flex items-center gap-2 text-[14px] text-slate-600 transition-all hover:text-orange-500"
                        >
                          <span className="text-orange-500 group-hover:translate-x-1 transition-transform">
                            →
                          </span>

                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-8 border-b border-slate-200">
            {trustBadges.map((b) => (
              <div
                key={b}
                className="rounded-full border border-orange-100 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm"
              >
                {b}
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 py-7">

            <p className="text-sm text-slate-500 text-center lg:text-left">
              © 2026 Power India Services. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                'Privacy Policy',
                'Terms & Conditions',
                'Refund Policy',
                'Sitemap',
              ].map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-sm text-slate-500 hover:text-orange-500 transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
     {/* FLOATING WHATSAPP */}
<a
  href="https://wa.me/919999000000"
  target="_blank"
  rel="noreferrer"
  className="group fixed bottom-7 right-7 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-[0_15px_40px_rgba(34,197,94,0.35)] transition-all duration-300 hover:scale-110"
>
  {/* ping */}
  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />

  {/* whatsapp icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="relative z-10 w-8 h-8 fill-white"
  >
    <path d="M19.11 17.21c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.34-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.28s.98 2.66 1.11 2.84c.13.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.54.57.65.21 1.24.18 1.71.11.52-.08 1.58-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.07-.11-.24-.18-.51-.31z" />
    <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.54.75 5 2.16 7.11L3 29l6.06-2.09A12.9 12.9 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.09 0-4.14-.56-5.93-1.62l-.42-.25-3.6 1.24 1.17-3.51-.27-.44A10.62 10.62 0 015.33 16c0-5.88 4.79-10.67 10.68-10.67 2.85 0 5.53 1.11 7.54 3.12A10.6 10.6 0 0126.68 16c0 5.89-4.79 10.67-10.67 10.67z" />
  </svg>
</a>

{/* FLOATING CALL BUTTON */}
<a
  href="tel:+919999000000"
  className="group fixed bottom-28 right-7 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_15px_40px_rgba(249,115,22,0.35)] transition-all duration-300 hover:scale-110"
>
  {/* ping */}
  <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20" />

  {/* call icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="relative z-10 w-8 h-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="white"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5.25c0-.69.56-1.25 1.25-1.25h2.54c.6 0 1.11.42 1.23 1l.57 2.67c.1.46-.04.94-.37 1.27l-1.38 1.38a15.73 15.73 0 006.36 6.36l1.38-1.38c.33-.33.81-.47 1.27-.37l2.67.57c.58.12 1 .63 1 1.23v2.54c0 .69-.56 1.25-1.25 1.25h-1.5C9.82 21.5 2.5 14.18 2.5 5.75v-.5z"
    />
  </svg>
</a>
    </>
  )
}