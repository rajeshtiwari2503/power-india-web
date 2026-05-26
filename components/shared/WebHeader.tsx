//  'use client'
// import { useState, useEffect } from 'react'
// import Link from 'next/link'
 
// import { NAV_ITEMS } from '@/lib/navData'
// import Logo from '../ui/Logo'

// const Chevron = () => (
//   <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//     <path d="M6 9l6 6 6-6" />
//   </svg>
// )

// const PhoneIcon = () => (
//   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
//   </svg>
// )

// export default function Header() {
//   const [mobileOpen, setMobileOpen]     = useState(false)
//   const [expanded, setExpanded]         = useState<string | null>(null)
//   const [scrolled, setScrolled]         = useState(false)

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 50)
//     window.addEventListener('scroll', fn)
//     return () => window.removeEventListener('scroll', fn)
//   }, [])

//   return (
//     <>
//       {/* ═══ TOP BAR ═══ */}
//       <div className="bg-gray-900 text-gray-300 text-xs py-1.5">
//         <div className="max-w-[1260px] mx-auto px-5 flex items-center justify-between flex-wrap gap-2">
//           {/* left */}
//           <div className="flex items-center gap-4">
//             <a href="mailto:info@powerindiaservices.com"
//               className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors">
//               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//               </svg>
//               info@powerindiaservices.com
//             </a>
//             <a href="tel:+919999000000"
//               className="flex items-center gap-1.5 text-brand-yellow font-bold hover:text-white transition-colors">
//               <PhoneIcon /> +91 9999-000-000
//             </a>
//             <span className="hidden md:inline text-gray-600">|</span>
//             <a href="#" className="hidden md:inline text-gray-400 hover:text-brand-yellow transition-colors">
//               Company Profile
//             </a>
//           </div>
//           {/* right */}
//           <div className="flex items-center gap-2">
//             <div className="hidden sm:flex gap-1.5">
//               {['f', 'ig', '𝕏', 'in'].map(s => (
//                 <a key={s} href="#"
//                   className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[11px] font-bold hover:bg-brand-orange transition-colors">
//                   {s}
//                 </a>
//               ))}
//             </div>
//             <a href="https://wa.me/919999000000" target="_blank" rel="noreferrer"
//               className="bg-green-500 text-white px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1">
//               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//               </svg>
//               WhatsApp
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* ═══ MAIN NAV ═══ */}
//       <nav className={`bg-white border-b border-gray-100 sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-nav' : 'shadow-sm'}`}>
//         <div className="max-w-[1260px] mx-auto px-5 h-[68px] flex items-center gap-3">
//           <Logo />

//           {/* search — desktop */}
//           <div className="hidden lg:flex relative flex-1 max-w-xs mx-3">
//             <input type="text" placeholder="Search services…"
//               className="w-full py-2 pl-3 pr-9 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-brand-orange focus:bg-white transition-colors font-inter" />
//             <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
//               fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
//             </svg>
//           </div>

//           {/* ─ Desktop nav links ─ */}
//           <div className="hidden lg:flex items-center flex-1">
//             {NAV_ITEMS.map(item => (
//               <div key={item.label} className="nav-item relative group">
//                 {item.href ? (
//                   <Link href={item.href}
//                     className="flex items-center gap-1 px-3 py-2 text-[13.5px] font-semibold text-brand-navy hover:text-brand-orange rounded-md transition-colors whitespace-nowrap font-inter">
//                     {item.label}
//                   </Link>
//                 ) : (
//                   <button className="flex items-center gap-1 px-3 py-2 text-[13.5px] font-semibold text-brand-navy hover:text-brand-orange rounded-md transition-colors whitespace-nowrap font-inter bg-transparent border-0 cursor-pointer">
//                     {item.label} <Chevron />
//                   </button>
//                 )}

//                 {/* Simple dropdown */}
//                 {item.dropdown && (
//                   <div className="drop-panel absolute top-full left-0 pt-2 z-50 opacity-0 invisible translate-y-2 transition-all duration-200">
//                     <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[220px]">
//                       {item.dropdown.map(d => (
//                         <Link key={d.label} href={d.href}
//                           className="flex items-center gap-2 px-4 py-2.5 text-[13.5px] text-gray-700 font-medium hover:bg-orange-50 hover:text-brand-orange transition-all">
//                           <span className="text-brand-orange text-xs">✔</span>{d.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Mega menu */}
//                 {item.mega && (
//                   <div className="drop-panel fixed left-1/2 -translate-x-1/2 pt-2 z-50 opacity-0 invisible translate-y-2 transition-all duration-200">
//                     <div className={`bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 grid gap-0 min-w-[700px]`}
//                       style={{ gridTemplateColumns: `repeat(${item.mega.length}, 1fr)` }}>
//                       {item.mega.map((col, ci) => (
//                         <div key={col.heading}
//                           className={`${ci > 0 ? 'pl-5 border-l border-gray-100' : ''} ${ci < item.mega!.length - 1 ? 'pr-5' : ''}`}>
//                           <p className="text-[11px] font-bold text-brand-orange uppercase tracking-wider mb-3 pb-2 border-b border-orange-100">
//                             {col.heading}
//                           </p>
//                           {col.links.map(l => (
//                             <Link key={l.label} href={l.href}
//                               className="flex items-center gap-2 py-1.5 text-[13.5px] text-gray-700 font-medium border-b border-gray-50 hover:text-brand-orange hover:pl-1 transition-all">
//                               <svg className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                                 <path d="M20 12H4M14 6l6 6-6 6" />
//                               </svg>
//                               {l.label}
//                             </Link>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* CTA + Hamburger */}
//           <div className="flex items-center gap-2 ml-auto">
//             <a href="tel:+919999000000"
//               className="flex items-center gap-1.5 bg-brand-orange hover:bg-brand-navyDk text-white font-bold text-[13.5px] px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 font-poppins">
//               <PhoneIcon />
//               <span className="hidden sm:inline">Get Expert Help</span>
//               <span className="sm:hidden">Call</span>
//             </a>
//             <button onClick={() => setMobileOpen(p => !p)}
//               className="lg:hidden border border-gray-200 rounded-lg p-2 text-brand-navy flex-shrink-0">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 {mobileOpen
//                   ? <path d="M18 6L6 18M6 6l12 12" />
//                   : <path d="M3 12h18M3 6h18M3 18h18" />}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* ─ Mobile menu ─ */}
//         <div className={`${mobileOpen ? 'acc-open' : 'acc-close'} bg-white border-t border-gray-100 lg:hidden`}>
//           <div className="max-w-[1260px] mx-auto px-5 py-3 pb-5">
//             {NAV_ITEMS.map(item => (
//               <div key={item.label} className="border-b border-gray-50">
//                 {item.href ? (
//                   <Link href={item.href}
//                     onClick={() => setMobileOpen(false)}
//                     className="block py-3 font-semibold text-[15px] text-brand-navy">
//                     {item.label}
//                   </Link>
//                 ) : (
//                   <button onClick={() => setExpanded(expanded === item.label ? null : item.label)}
//                     className="w-full flex justify-between items-center py-3 font-semibold text-[15px] text-brand-navy bg-transparent border-0 cursor-pointer font-inter">
//                     {item.label}
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${expanded === item.label ? 'rotate-180' : ''}`}
//                       fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                       <path d="M6 9l6 6 6-6" />
//                     </svg>
//                   </button>
//                 )}
//                 <div className={expanded === item.label ? 'acc-open' : 'acc-close'}>
//                   <div className="pl-3 pb-3">
//                     {item.dropdown?.map(d => (
//                       <Link key={d.label} href={d.href}
//                         onClick={() => setMobileOpen(false)}
//                         className="block py-1.5 text-sm text-gray-500 border-b border-gray-50 hover:text-brand-orange">
//                         › {d.label}
//                       </Link>
//                     ))}
//                     {item.mega?.map(col => (
//                       <div key={col.heading} className="mb-2">
//                         <p className="text-[10px] font-bold text-brand-orange uppercase tracking-wider mt-3 mb-1.5">{col.heading}</p>
//                         {col.links.map(l => (
//                           <Link key={l.label} href={l.href}
//                             onClick={() => setMobileOpen(false)}
//                             className="block py-1.5 text-sm text-gray-500 hover:text-brand-orange">
//                             › {l.label}
//                           </Link>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/navData'
import Logo from '../ui/Logo'

const Chevron = () => (
  <svg
    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const PhoneIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
)

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* TOP BAR */}
      <div className="hidden md:block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 h-11 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-5 text-[13px] text-slate-300">

            <a
              href="mailto:info@powerindiaservices.com"
              className="flex items-center gap-2 hover:text-orange-400 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.2l-8 5.2-8-5.2V6l8 5 8-5v1.2z" />
              </svg>

              info@powerindiaservices.com
            </a>

            <div className="w-px h-4 bg-white/10" />

            <a
              href="tel:+919999000000"
              className="flex items-center gap-2 font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              <PhoneIcon />
              +91 9999-000-000
            </a>

            <div className="w-px h-4 bg-white/10" />

            <span className="text-slate-400">
              Mon – Sat • 9:00 AM – 7:00 PM
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">
              {['f', 'ig', '𝕏', 'in'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[11px] font-bold text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                >
                  {s}
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/919999000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 px-4 py-2 text-[12px] font-bold text-white transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>

              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5">

          <div className="h-[78px] flex items-center justify-between gap-6">

            {/* LOGO */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* SEARCH */}
            {/* <div className="hidden xl:flex relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-5 pr-12 text-[14px] outline-none transition-all duration-300 focus:border-orange-400 focus:bg-white focus:shadow-lg"
              />

              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div> */}

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1">

              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 rounded-xl px-4 py-3 text-[14px] font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button className="flex items-center gap-1 rounded-xl px-4 py-3 text-[14px] font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 bg-transparent border-0">
                      {item.label}
                      <Chevron />
                    </button>
                  )}

                  {/* DROPDOWN */}
                  {item.dropdown && (
                    <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-50">

                      <div className="w-[260px] rounded-3xl border border-slate-100 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                        {item.dropdown.map((d) => (
                          <Link
                            key={d.label}
                            href={d.href}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300"
                          >
                            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center text-xs font-bold">
                              →
                            </div>

                            {d.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* MEGA MENU */}
                  {item.mega && (
                    <div className="fixed left-1/2 top-[92px] -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-50">

                      <div
                        className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]"
                        style={{
                          width: '1000px',
                        }}
                      >
                        <div
                          className="grid gap-8"
                          style={{
                            gridTemplateColumns: `repeat(${item.mega.length},1fr)`,
                          }}
                        >
                          {item.mega.map((col) => (
                            <div key={col.heading}>

                              <div className="mb-5">
                                <h4 className="text-[12px] font-black uppercase tracking-[2px] text-orange-500">
                                  {col.heading}
                                </h4>

                                <div className="mt-3 h-[2px] w-14 rounded-full bg-gradient-to-r from-orange-500 to-transparent" />
                              </div>

                              <div className="space-y-2">
                                {col.links.map((l) => (
                                  <Link
                                    key={l.label}
                                    href={l.href}
                                    className="group/item flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-orange-50 transition-all duration-300"
                                  >
                                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center transition-all duration-300 group-hover/item:translate-x-1">
                                      →
                                    </div>

                                    <span className="text-[14px] font-medium text-slate-700 group-hover/item:text-orange-500">
                                      {l.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">

              <a
                href="tel:+919999000000"
                className="hidden sm:flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-[14px] font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:scale-105"
              >
                <PhoneIcon />
                {/* Get Expert Help */}
              </a>

              {/* MOBILE BTN */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="lg:hidden w-11 h-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  {mobileOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen
              ? 'max-h-[900px] border-t border-slate-100'
              : 'max-h-0'
          }`}
        >
          <div className="bg-white px-5 py-5">

            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="border-b border-slate-100 py-1"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-[15px] font-semibold text-slate-700"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setExpanded(
                          expanded === item.label ? null : item.label
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-[15px] font-semibold text-slate-700"
                    >
                      {item.label}

                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          expanded === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expanded === item.label
                          ? 'max-h-[900px] pb-4'
                          : 'max-h-0'
                      }`}
                    >
                      {item.dropdown?.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-orange-50 hover:text-orange-500"
                        >
                          → {d.label}
                        </Link>
                      ))}

                      {item.mega?.map((col) => (
                        <div key={col.heading} className="mt-4">

                          <p className="mb-3 text-[11px] font-black uppercase tracking-[2px] text-orange-500">
                            {col.heading}
                          </p>

                          {col.links.map((l) => (
                            <Link
                              key={l.label}
                              href={l.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-orange-50 hover:text-orange-500"
                            >
                              → {l.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}