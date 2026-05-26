 'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const IND = [
  {
    key: 'hotels',
    label: 'Hotels & Hospitality',
    icon: '🏨',
    desc:
      'Complete power and utility solutions for hotels, resorts, and hospitality businesses.',
    services: [
      'Commercial Electricity Connection',
      'Energy Audit & Optimization',
      'Rooftop Solar Installation',
      'Fire NOC (Electrical)',
      'Electrical Safety Certificate',
    ],
    badges: ['Owners', 'Managers', 'Chains'],
  },
  {
    key: 'mfg',
    label: 'Manufacturing',
    icon: '🏭',
    desc:
      'Expert industrial power connections, factory setup, and full compliance services.',
    services: [
      'HT/LT Industrial Connection',
      'Factory Power Setup',
      'Industrial AMC',
      'Pollution NOC',
      'Electrical Safety Audit',
    ],
    badges: ['Manufacturers', 'Factories'],
  },
  {
    key: 'it',
    label: 'IT & Offices',
    icon: '🖥️',
    desc:
      'High-reliability power solutions for IT parks, corporate offices, and tech companies.',
    services: [
      'High Load Connection',
      'Energy Management',
      'Solar Installation',
      'UPS & Inverter Service',
      'Power Quality Analysis',
    ],
    badges: ['IT Parks', 'Corporates'],
  },
  {
    key: 'retail',
    label: 'Retail & Malls',
    icon: '🏪',
    desc:
      'Complete utility management for retail stores, shopping malls, and commercial complexes.',
    services: [
      'Commercial Connection',
      'Energy Audit',
      'LED Lighting Setup',
      'Meter Management',
      'Solar Rooftop',
    ],
    badges: ['Malls', 'Retailers'],
  },
  {
    key: 'agri',
    label: 'Agriculture',
    icon: '🌾',
    desc:
      'Power your farm with agriculture connections, solar pumps, and subsidy assistance.',
    services: [
      'Agriculture Connection',
      'Solar Pump Setup',
      'PM Kusum Subsidy',
      'Load Enhancement',
      'Net Metering',
    ],
    badges: ['Farmers', 'Agri-business'],
  },
  {
    key: 'const',
    label: 'Construction',
    icon: '🏗️',
    desc:
      'Temporary and permanent power connections, audits, and utility services for builders.',
    services: [
      'Temporary Connection',
      'Site Power Setup',
      'Safety Audit',
      'Permanent Transfer',
      'Electrical NOC',
    ],
    badges: ['Builders', 'Contractors'],
  },
]

export default function IndustriesSection() {
  const [active, setActive] = useState('hotels')

  const ind = IND.find((i) => i.key === active)!

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-24 px-5">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/20 blur-3xl rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/20 blur-3xl rounded-full animate-pulse [animation-delay:2s]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto">

        {/* Top Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-orange-100 rounded-full px-5 py-2 shadow-lg shadow-orange-100/40 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

            <span className="text-sm font-bold tracking-wide text-orange-600 uppercase">
              Industries We Serve
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">
            Tailored Power Solutions
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              For Every Industry
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg leading-8 text-slate-600">
            From hospitality and manufacturing to agriculture and IT parks,
            we deliver reliable electricity, solar and compliance solutions.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4 mb-14">

          {IND.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`group relative overflow-hidden flex-shrink-0 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                active === item.key
                  ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-white border-transparent shadow-xl shadow-orange-200'
                  : 'bg-white/70 backdrop-blur-xl border-slate-200 text-slate-600 hover:border-orange-200 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-2xl">{item.icon}</span>

                <span className="font-bold text-sm whitespace-nowrap">
                  {item.label}
                </span>
              </div>

              {active !== item.key && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-50 to-amber-50" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ind.key}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 items-center"
          >

            {/* LEFT CONTENT */}
            <div>

              {/* Industry Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-orange-100 rounded-full px-5 py-3 shadow-lg shadow-orange-100/30 mb-6">
                <span className="text-2xl">{ind.icon}</span>

                <span className="text-sm font-bold uppercase tracking-wide text-orange-600">
                  {ind.label}
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-4xl md:text-5xl font-black leading-[1.08] tracking-tight text-slate-900 mb-6">
                Smart Energy Solutions
                <br />
                Built For
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  {' '}
                  {ind.label}
                </span>
              </h3>

              {/* Description */}
              <p className="text-lg leading-8 text-slate-600 max-w-2xl mb-10">
                {ind.desc}
              </p>

              {/* Services */}
              <div className="grid sm:grid-cols-2 gap-5 mb-10">

                {ind.services.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-50 via-transparent to-amber-50" />

                    <div className="relative z-10 flex items-start gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-200/50 group-hover:scale-110 transition-transform duration-300">
                        ⚡
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-800 leading-7">
                          {s}
                        </h4>

                        <p className="text-sm text-slate-400 mt-1">
                          Expert managed service
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-10">
                {ind.badges.map((b) => (
                  <div
                    key={b}
                    className="bg-white/80 backdrop-blur-xl border border-orange-100 text-orange-600 px-5 py-2 rounded-full text-sm font-bold shadow-md shadow-orange-100/30"
                  >
                    {b}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="#contact"
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-lg px-8 py-5 rounded-2xl shadow-2xl shadow-orange-300/40 hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Expert Assistance

                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>

                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </div>

            {/* RIGHT VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-yellow-200 blur-3xl opacity-20 scale-105 rounded-[40px]" />

              {/* Card */}
              <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 min-h-[540px] flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.18)]">

                {/* Decorative */}
                <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-orange-500/10 blur-3xl rounded-full" />

                <div className="absolute bottom-0 left-0 w-[220px] h-[220px] bg-yellow-500/10 blur-3xl rounded-full" />

                {/* Top */}
                <div className="relative z-10">

                  <div className="flex items-center justify-between mb-8">

                    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl px-5 py-3 text-white text-sm font-semibold">
                      Industry Solutions
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-2xl shadow-xl shadow-orange-500/20">
                      ⚡
                    </div>
                  </div>

                  {/* Main Icon */}
                  <div className="text-[140px] leading-none mb-8 drop-shadow-2xl">
                    {ind.icon}
                  </div>

                  <h4 className="text-3xl font-black text-white leading-tight">
                    {ind.label}
                  </h4>

                  <p className="text-slate-300 mt-5 leading-8 text-lg">
                    Advanced utility infrastructure and modern energy systems
                    tailored for your business sector.
                  </p>
                </div>

                {/* Bottom Stats */}
                <div className="relative z-10 grid grid-cols-2 gap-5 mt-10">

                  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                    <div className="text-4xl font-black text-white">
                      24/7
                    </div>

                    <div className="text-slate-400 mt-2">
                      Support & Assistance
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                    <div className="text-4xl font-black text-white">
                      100%
                    </div>

                    <div className="text-slate-400 mt-2">
                      Compliance Focused
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}