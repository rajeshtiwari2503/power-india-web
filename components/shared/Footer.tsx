 


import { FOOTER_COLS } from '@/lib/navData'
import Image from "next/image"
import Link from 'next/link'
import { BsYoutube } from 'react-icons/bs'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
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
                <Link href="/" className="flex items-center flex-shrink-0">
                  <Image
                    src="/pisLogo.png"
                    alt="Power India Services"
                    width={320}
                    height={120}
                    priority
                    className="h-[60px] md:h-[70px] lg:h-[80px] w-auto"
                  />
                </Link>
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
                  href="tel:+917217698176"
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
                      +91 7217698176
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
                     certification@powerindiaservices.com

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
               <div className="flex items-center justify-center gap-2">
                           {[
                             {
                               href: "https://wa.me/917217698176",
                               bg: "bg-[#25D366]",
                               icon: <FaWhatsapp size={14} />,
                             },
             
                             {
                               href: "https://www.indiamart.com/power-india-services/",
                               bg: "bg-white",
                               icon: (
                                 <Image
                                   src="/indiaMartLogo.jpeg"
                                   alt="IndiaMART"
                                   width={20}
                                   height={18}
                                 />
                               ),
                             },
                             {
                               href: "https://www.facebook.com/Powerindiaservices?mibextid=ZbWKwL",
                               bg: "bg-[#1877F2]",
                               icon: <FaFacebookF size={14} />,
                             },
                             {
                               href: "https://www.instagram.com/powerindiaservices",
                               bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
                               icon: <FaInstagram size={14} />,
                             },
                             {
                               href: "https://www.linkedin.com/company/power-india-services",
                               bg: "bg-[#0A66C2]",
                               icon: <FaLinkedinIn size={14} />,
                             },
                             {
                               href: "https://www.youtube.com/@PowerIndiaServices",
                               bg: "bg-[#FF0000]",
                               icon: <BsYoutube size={14} />,
                             },
                           ].map((item, i) => (
                             <Link
                               key={i}
                               href={item.href}
                               target="_blank"
                               className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300`}
                             >
                               {item.icon}
                             </Link>
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