'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const navData = [
  {
    label: 'New Connections',
    mega: true,
    columns: [
      {
        heading: 'Domestic & Commercial',
        links: [
          { label: 'New Domestic Connection', href: '#' },
          { label: 'Commercial Connection', href: '#' },
          { label: 'Temporary Connection', href: '#' },
          { label: 'Connection on Lease', href: '#' },
          { label: 'Connection Transfer', href: '#' },
          { label: 'Meter Replacement', href: '#' },
        ],
      },
      {
        heading: 'Industrial & HT',
        links: [
          { label: 'HT Industrial Connection', href: '#' },
          { label: 'LT Industrial Connection', href: '#' },
          { label: 'Load Enhancement', href: '#' },
          { label: 'Load Reduction', href: '#' },
          { label: 'Bulk Supply Connection', href: '#' },
          { label: 'EV Charging Station', href: '#' },
        ],
      },
      {
        heading: 'Other Services',
        links: [
          { label: 'Meter Shifting', href: '#' },
          { label: 'Underground Cabling', href: '#' },
          { label: 'Service Line Extension', href: '#' },
          { label: 'Street Light Connection', href: '#' },
          { label: 'Agriculture Connection', href: '#' },
          { label: 'Name Change in Meter', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Solar & Green Energy',
    mega: true,
    columns: [
      {
        heading: 'Solar Installation',
        links: [
          { label: 'Rooftop Solar (Residential)', href: '#' },
          { label: 'Rooftop Solar (Commercial)', href: '#' },
          { label: 'Ground-Mounted Solar', href: '#' },
          { label: 'Solar Water Heater', href: '#' },
          { label: 'Solar Street Light', href: '#' },
        ],
      },
      {
        heading: 'Net Metering & Subsidy',
        links: [
          { label: 'Net Metering Registration', href: '#' },
          { label: 'DISCOM Approval', href: '#' },
          { label: 'PM Surya Ghar Subsidy', href: '#' },
          { label: 'MNRE Registration', href: '#' },
          { label: 'Solar REC Registration', href: '#' },
        ],
      },
      {
        heading: 'Storage & EV',
        links: [
          { label: 'Battery Storage System', href: '#' },
          { label: 'Hybrid Solar System', href: '#' },
          { label: 'EV Charging Setup', href: '#' },
          { label: 'Wind-Solar Hybrid', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Industrial Services',
    mega: true,
    columns: [
      {
        heading: 'Power Setup',
        links: [
          { label: 'Factory Power Setup', href: '#' },
          { label: 'DG Set Installation', href: '#' },
          { label: 'Transformer Installation', href: '#' },
          { label: 'Substation Setup', href: '#' },
          { label: 'Capacitor Bank Setup', href: '#' },
        ],
      },
      {
        heading: 'Audit & Compliance',
        links: [
          { label: 'Energy Audit', href: '#' },
          { label: 'Electrical Safety Audit', href: '#' },
          { label: 'Power Factor Correction', href: '#' },
          { label: 'Tariff Reclassification', href: '#' },
          { label: 'Annual Return Filing', href: '#' },
        ],
      },
      {
        heading: 'Licenses & NOC',
        links: [
          { label: 'Electrical Contractor License', href: '#' },
          { label: 'Wireman License', href: '#' },
          { label: 'Electrical Inspector NOC', href: '#' },
          { label: 'CEA Compliance', href: '#' },
          { label: 'Safety Certificate', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Billing & Compliance',
    dropdown: [
      { label: 'Electricity Bill Dispute', href: '#' },
      { label: 'Bill Correction Request', href: '#' },
      { label: 'Arrear Settlement', href: '#' },
      { label: 'Connection Restoration', href: '#' },
      { label: 'Security Deposit Refund', href: '#' },
      { label: 'NOC from DISCOM', href: '#' },
      { label: 'Tariff Category Change', href: '#' },
      { label: 'Disconnection Appeal', href: '#' },
    ],
  },
  {
    label: 'Maintenance',
    dropdown: [
      { label: 'Electrical Maintenance AMC', href: '#' },
      { label: 'Transformer Maintenance', href: '#' },
      { label: 'DG Set Service', href: '#' },
      { label: 'Solar Panel Cleaning', href: '#' },
      { label: 'Wiring & Rewiring', href: '#' },
      { label: 'Switchgear Maintenance', href: '#' },
      { label: 'UPS & Inverter Service', href: '#' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* TOP BAR */}
      <div style={{ background: '#0f1635', color: '#ccd0e0', fontSize: '13px', padding: '7px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="mailto:info@powerindiaservices.com" style={{ color: '#ccd0e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              info@powerindiaservices.com
            </a>
            <a href="tel:+919999000000" style={{ color: '#ffbe0b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              +91 9999-000-000
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#888da8', fontSize: '12px' }}>Mon–Sat 9AM–7PM</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', label: 'Facebook' },
                { icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', label: 'LinkedIn' },
              ].map((s) => (
                <a key={s.label} href="#" style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccd0e0', textDecoration: 'none' }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={s.icon}/></svg>
                </a>
              ))}
            </div>
            <a href="https://wa.me/919999000000" target="_blank" rel="noreferrer" style={{ background: '#25d366', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav style={{
        background: '#fff',
        boxShadow: scrolled ? '0 4px 20px rgba(26,36,85,0.12)' : '0 2px 8px rgba(26,36,85,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

          {/* LOGO */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '50px', height: '50px' }}>
              <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                <defs>
                  <linearGradient id="swirl1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e85d04"/>
                    <stop offset="100%" stopColor="#ffbe0b"/>
                  </linearGradient>
                </defs>
                <path d="M30 6 C12 6 5 19 5 31 C5 47 18 56 33 56 C43 56 51 49 53 41" stroke="url(#swirl1)" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <path d="M30 6 C50 6 56 23 51 39" stroke="#1a2455" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4"/>
                <circle cx="30" cy="10" r="4" fill="#ffbe0b"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: 1.1 }}>
                <span style={{ color: '#1a2455' }}>P</span>
                <span style={{ color: '#1a2455' }}>OWER </span>
                <span style={{ color: '#e85d04' }}>INDIA</span>
              </div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', color: '#555e7a', textTransform: 'uppercase' }}>SERVICES</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hidden lg:flex">
            {navData.map((item) => (
              <div key={item.label} className="nav-item" style={{ position: 'relative' }}>
                {item.href ? (
                  <Link href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '6px', fontWeight: 600, fontSize: '14px', color: '#1a2455', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e85d04')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#1a2455')}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '6px', fontWeight: 600, fontSize: '14px', color: '#1a2455', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e85d04')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#1a2455')}
                  >
                    {item.label}
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                )}

                {/* Simple dropdown */}
                {item.dropdown && (
                  <div className="dropdown-menu" style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: '#fff', borderRadius: '10px',
                    boxShadow: '0 8px 32px rgba(26,36,85,0.15)',
                    border: '1px solid #e0e4f0',
                    minWidth: '240px', padding: '8px 0', zIndex: 999,
                  }}>
                    {item.dropdown.map((d) => (
                      <Link key={d.label} href={d.href} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 18px', fontSize: '14px', color: '#1a2455',
                        textDecoration: 'none', fontWeight: 500, transition: 'all 0.15s',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff5f0'; (e.currentTarget as HTMLElement).style.color = '#e85d04'; (e.currentTarget as HTMLElement).style.paddingLeft = '24px' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#1a2455'; (e.currentTarget as HTMLElement).style.paddingLeft = '18px' }}
                      >
                        <span style={{ color: '#e85d04', fontWeight: 700 }}>›</span>
                        {d.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega menu */}
                {item.mega && item.columns && (
                  <div className="mega-menu" style={{
                    position: 'fixed', left: '50%', transform: 'translateX(-50%)',
                    top: 'auto', marginTop: '0',
                    background: '#fff', borderRadius: '12px',
                    boxShadow: '0 16px 48px rgba(26,36,85,0.18)',
                    border: '1px solid #e0e4f0',
                    padding: '28px', zIndex: 999,
                    display: 'grid', gridTemplateColumns: `repeat(${item.columns.length}, 1fr)`,
                    gap: '32px', minWidth: '720px',
                  }}>
                    {item.columns.map((col) => (
                      <div key={col.heading}>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#e85d04', marginBottom: '14px', paddingBottom: '10px', borderBottom: '2px solid #fff5f0' }}>
                          {col.heading}
                        </div>
                        {col.links.map((l) => (
                          <Link key={l.label} href={l.href} style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 0', fontSize: '14px', color: '#1a2455',
                            textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #f0f2f8', transition: 'color 0.15s',
                          }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#e85d04')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#1a2455')}
                          >
                            <svg width="14" height="14" fill="none" stroke="#e85d04" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 12H4M14 6l6 6-6 6"/></svg>
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="tel:+919999000000" style={{
              background: '#e85d04', color: '#fff', padding: '10px 20px',
              borderRadius: '8px', fontWeight: 700, fontSize: '14px',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1a2455')}
              onMouseLeave={e => (e.currentTarget.style.background = '#e85d04')}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              <span className="hidden sm:inline">Free Consultation</span>
              <span className="sm:hidden">Call</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: '1px solid #e0e4f0', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#1a2455' }}
              className="lg:hidden"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={mobileOpen ? 'mobile-menu-open' : 'mobile-menu-closed'} style={{ background: '#fff', borderTop: '1px solid #e0e4f0', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px 24px' }}>
            {navData.map((item) => (
              <div key={item.label} style={{ borderBottom: '1px solid #f0f2f8' }}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', fontWeight: 600, fontSize: '15px', color: '#1a2455', cursor: 'pointer' }}
                >
                  {item.href ? <Link href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>{item.label}</Link> : item.label}
                  {(item.dropdown || item.mega) && (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  )}
                </button>
                {mobileExpanded === item.label && (
                  <div style={{ paddingBottom: '12px', paddingLeft: '12px' }}>
                    {item.dropdown?.map((d) => (
                      <Link key={d.label} href={d.href} style={{ display: 'block', padding: '8px 0', fontSize: '14px', color: '#555e7a', textDecoration: 'none', borderBottom: '1px solid #f8f9fc' }}>
                        › {d.label}
                      </Link>
                    ))}
                    {item.mega && item.columns?.map((col) => (
                      <div key={col.heading} style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#e85d04', marginBottom: '8px', marginTop: '8px' }}>{col.heading}</div>
                        {col.links.map((l) => (
                          <Link key={l.label} href={l.href} style={{ display: 'block', padding: '6px 0', fontSize: '14px', color: '#555e7a', textDecoration: 'none' }}>
                            › {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}