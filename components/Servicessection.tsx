 'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface SvcItem {
  label: string
  href: string
}

interface Props {
  heading: string
  sub: string
  items: SvcItem[]
  alt?: boolean
}

function SvcSection({ heading, sub, items, alt }: Props) {
  return (
    <section
      className={`relative overflow-hidden border-b border-slate-100 ${
        alt
          ? 'bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40'
          : 'bg-white'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-orange-100/30 blur-3xl rounded-full" />

        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-100/20 blur-3xl rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 py-20 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="sticky top-24"
        >
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-orange-100 rounded-full px-4 py-2 shadow-lg shadow-orange-100/40 mb-5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-orange-600 uppercase">
              Power Services
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-[42px] leading-[1.1] font-black text-slate-900 tracking-tight mb-5">
            {heading}
          </h2>

          {/* Description */}
          <p className="text-slate-600 leading-8 text-[16px] max-w-sm">
            {sub}
          </p>

          {/* Decorative */}
          <div className="mt-8 flex items-center gap-3">
            <div className="w-16 h-[2px] bg-gradient-to-r from-orange-500 to-transparent rounded-full" />

            <div className="w-3 h-3 rounded-full bg-orange-400" />
          </div>
        </motion.div>

        {/* RIGHT GRID */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: i * 0.05,
              }}
              viewport={{ once: true }}
            >
              <Link
                href={item.href}
                className="group relative overflow-hidden h-full flex items-center justify-between rounded-[28px] border border-slate-200/60 bg-white/80 backdrop-blur-xl px-6 py-5 shadow-lg shadow-slate-100/70 hover:shadow-2xl hover:shadow-orange-100/50 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Hover Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-50 via-transparent to-amber-50" />

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center text-lg shadow-lg shadow-orange-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    ⚡
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-[15px] leading-6 font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                      {item.label}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Expert assistance available
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="relative z-10 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SECTIONS: Props[] = [
  {
    heading: 'Core Certification Services',
    sub: 'End‑to‑end regulatory approvals for electronics, electricals, telecom and consumer products in the Indian market.',
    items: [
      { label: 'BIS Registration (CRS)', href: '/services/bis-registration-services' },
      { label: 'ISI Mark Certification', href: '/services/isi-certification' },
      { label: 'WPC–ETA Approval', href: '/services/wpc-certificate-gurgaon' },
      { label: 'TEC Certification', href: '/services/tec-certification' },
      { label: 'BEE Star Rating', href: '/services/bee-registration-consultants' },
      { label: 'ISO Certification Agent', href: '/services/iso-certification-agent' },
      { label: 'CE & RoHS Certification', href: '/services/ce-certification-delhi' },
      { label: 'Trademark Registration', href: '/services/trademark-registration' },
      { label: 'IEC Registration', href: '/services/iec-registration-agent' },
    ],
  },
  {
    heading: 'EPR & Waste Management',
    sub: 'Specialised EPR and waste management services for plastic, e‑waste and batteries, as per CPCB/MoEFCC guidelines.',
    items: [
      { label: 'EPR Authorization (E‑waste)', href: '/services/epr-authorization-certificate-provider' },
      { label: 'Plastic Waste EPR Registration', href: '/services/plastic-waste-management-epr-registration' },
      { label: 'Battery Waste EPR Support', href: '/services/epr-battery-solutions' },
      { label: 'Recycling & Annual Returns', href: '/services/epr-annual-returns' },
      { label: 'Brand Owner Registration', href: '/services/brand-owner-epr' },
    ],
    alt: true,
  },
  {
    heading: 'Legal Metrology & LMPC',
    sub: 'Comprehensive Legal Metrology and LMPC support for importers, packers and manufacturers.',
    items: [
      { label: 'LMPC Importer Registration', href: '/services/lmpc-registration-consultants' },
      { label: 'Legal Metrology Packaging Approvals', href: '/services/legal-metrology-certification' },
      { label: 'Model Approval & Stamping', href: '/services/legal-metrology-model-approval' },
      { label: 'Label Compliance Audit', href: '/services/label-compliance-audit' },
    ],
  },
  {
    heading: 'Testing & NABL Lab Support',
    sub: 'EMC/EMI, RF, safety and performance testing through accredited partner labs across India.',
    items: [
      { label: 'EMC / EMI Testing', href: '/services/emc-emi-testing-services' },
      { label: 'IP / Ingress Protection Labs', href: '/services/ip-testing-labs' },
      { label: 'LM–79 / Lighting Labs', href: '/services/lm-79-testing-labs' },
      { label: 'RF & SAR Testing', href: '/services/rf-testing-services' },
      { label: 'WPC Testing – Chennai', href: '/services/wpc-certificate-chennai' },
    ],
    alt: true,
  },
  {
    heading: 'Government & Business Registrations',
    sub: 'Complete hand‑holding for MSME, GEM, and other business registrations linked to your certification journey.',
    items: [
      { label: 'GEM Registration Consultant', href: '/services/gem-registration-consultant' },
      { label: 'MSME / Udyam Registration', href: '/services/msme-registration' },
      { label: 'Company Profile & Brand Representation', href: '/services/company-profile-support' },
    ],
  },
]

export default function ServiceSections() {
  return (
    <div className="relative">
      {SECTIONS.map((s) => (
        <SvcSection key={s.heading} {...s} />
      ))}
    </div>
  )
}