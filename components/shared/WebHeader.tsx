


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/navData'
import Logo from '../ui/Logo'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'
import { BsYoutube } from 'react-icons/bs'
import { MdArtTrack } from 'react-icons/md'
import Image from 'next/image'
import { FiLogIn } from 'react-icons/fi'

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
      {/* <div className="hidden md:block bg-gradient-to-r from-orange-500 to-amber-400 border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 h-11 flex items-center justify-between">

         
          <div className="flex items-center gap-5 text-[13px] text-white">

            <a
              href="mailto: certification@powerindiaservices.com"
              className="flex items-center gap-2  hover:text-[#252b7a] transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.2l-8 5.2-8-5.2V6l8 5 8-5v1.2z" />
              </svg>


              certification@powerindiaservices.com

            </a>

            <div className="w-px h-4 bg-white/10" />

            <a
              href="tel:+917217698176"
              className="flex items-center gap-2 font-semibold text-white hover:text-[#252b7a] transition-colors"
            >
              <PhoneIcon />
              +91 7217698176
            </a>

            
          </div>
          <a
            href="tel:+919818668176"
            className="flex items-center gap-2 font-semibold text-white hover:text-[#252b7a] transition-colors"
          >
            <PhoneIcon />
            +91 9818668176
          </a>
       
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <Link
              href="https://wa.me/917217698176"
              target="_blank"
              className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300"
            >
              <FaWhatsapp size={14} />
            </Link>
           
              <Link
                href="https://www.facebook.com/Powerindiaservices?mibextid=ZbWKwL"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF size={14} />
              </Link>
 
              <Link
                href="https://www.instagram.com/powerindiaservices?igshid=MzNlNGNkZWQ4Mg%3D%3D"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300"
              >
                <FaInstagram size={14} />
              </Link>

              

            
              <Link
                href="https://www.linkedin.com/company/power-india-services/?viewAsMember=true"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300"
              >
                <FaLinkedinIn size={14} />
              </Link>
               <Link
                href="https://www.youtube.com/@PowerIndiaServices"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-[#FF0000] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300"
              >
                <BsYoutube size={14} />
              </Link>
            </div>

        
          
          </div>
        </div>
      </div> */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 border-b border-white/5">

        {/* Mobile */}
        <div className="md:hidden px-3 py-2 text-white">
          <div className="flex flex-col gap-2">

            <a
              href="mailto:certification@powerindiaservices.com"
              className="flex items-center gap-2 text-xs"
            >
              <svg
                className="w-3 h-3 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.2l-8 5.2-8-5.2V6l8 5 8-5v1.2z" />
              </svg>

              <span className="truncate">
                certification@powerindiaservices.com
              </span>
            </a>

            <div className="flex items-center justify-between">
              <a
                href="tel:+917217698176"
                className="flex items-center gap-2 text-xs font-medium"
              >
                <PhoneIcon />
                +91 7217698176
              </a>

              <div className="flex items-center gap-1">
                <Link
                  href="https://wa.me/917217698176"
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center text-white"
                >
                  <FaWhatsapp size={13} />
                </Link>

                <Link
                  href="https://www.indiamart.com/power-india-services/"
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-white"
                >
                  <Image
                    src="/indiaMartLogo.jpeg"
                    alt="IndiaMART"
                    width={20}
                    height={18}
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/Powerindiaservices?mibextid=ZbWKwL"
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white"
                >
                  <FaFacebookF size={13} />
                </Link>

                <Link
                  href="https://www.instagram.com/powerindiaservices"
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white"
                >
                  <FaInstagram size={13} />
                </Link>

                <Link
                  href="https://www.linkedin.com/company/power-india-services"
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white"
                >
                  <FaLinkedinIn size={13} />
                </Link>

                <Link
                  href="https://www.youtube.com/@PowerIndiaServices"
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-[#FF0000] flex items-center justify-center text-white"
                >
                  <BsYoutube size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="max-w-[1280px] mx-auto px-5 h-11 flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-5 text-[13px] text-white">
              <a
                href="mailto:certification@powerindiaservices.com"
                className="flex items-center gap-2 hover:text-[#252b7a] transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.2l-8 5.2-8-5.2V6l8 5 8-5v1.2z" />
                </svg>

                certification@powerindiaservices.com
              </a>

              {/* <div className="w-px h-4 bg-white/20" /> */}


            </div>

            {/* Center */}
            <div className="flex items-center gap-5">
              <a
                href="tel:+917217698176"
                className="flex items-center gap-2 font-semibold text-[13px] text-white hover:text-[#252b7a] transition-colors"
              >
                <PhoneIcon />
                +91 7217698176
              </a>
              <a
                href="tel:+919818668176"
                className="flex items-center gap-2 text-[13px] font-semibold text-white hover:text-[#252b7a] transition-colors"
              >
                <PhoneIcon />
                +91 9818668176
              </a>
            </div>


            {/* Right */}
            <div className="flex items-center gap-2">
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
        </div>

      </div>
      {/* MAIN NAVBAR */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border-b border-slate-100'
          : 'bg-white border-b border-slate-100'
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-5">

          <div className="h-[78px]  flex items-center justify-between gap-6">

            {/* LOGO */}
            <div className="flex  items-center justify-center flex-shrink-0 min-w-fit">
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
              <Link
                href="/login"
                className="
    w-full flex items-center gap-1 justify-center px-2
    cursor-pointer
    rounded-lg
    bg-gradient-to-r
    from-orange-500
    to-amber-400
    py-3
    text-[15px]
    font-bold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:from-[#252b7a]
    hover:to-[#252b7a]
    hover:shadow-xl
    hover:-translate-y-0.5
  ">
                <FiLogIn />
                <span>Sign In</span>
              </Link>


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
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen
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
                        className={`w-4 h-4 transition-transform duration-300 ${expanded === item.label ? 'rotate-180' : ''
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
                      className={`overflow-hidden transition-all duration-300 ${expanded === item.label
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
            <div className="pt-5">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="
    w-full
    cursor-pointer
    rounded-lg
    bg-gradient-to-r
    from-orange-500
    to-amber-400
    py-3
    text-[15px]
    font-bold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:from-[#252b7a]
    hover:to-[#252b7a]
    hover:shadow-xl
    hover:-translate-y-0.5
  "
              >
                <FiLogIn size={18} />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}