 'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { icon: '😊', target: 5, suffix: 'K+', label: 'Happy Clients' },
  { icon: '🏆', target: 50, suffix: '+', label: 'Professional Services' },
  { icon: '⭐', target: 600, suffix: '+', label: '5-Star Reviews' },
  { icon: '💬', target: 10, suffix: 'K+', label: 'Questions Solved' },
]

function Counter({
  target,
  suffix,
}: {
  target: number
  suffix: string
}) {
  const [val, setVal] = useState(0)
  const [go, setGo] = useState(false)

  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setGo(true)
      },
      { threshold: 0.4 }
    )

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!go) return

    const duration = 2000
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 4)

      setVal(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [go, target])

  return (
    <span
      ref={ref}
      className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 bg-clip-text text-transparent tracking-tight"
    >
      {val}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-24 px-5 bg-[#f8fafc]">

      {/* Animated Background */}
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-orange-100 rounded-full px-5 py-2 shadow-lg shadow-orange-100/40 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

            <span className="text-sm font-bold tracking-wide text-orange-600 uppercase">
              Trusted Across India
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">
            Delivering Results
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              With Real Impact
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-slate-600">
            Thousands of businesses and homeowners trust our electricity,
            solar and industrial utility services across India.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden"
            >
              {/* Card */}
              <div className="relative h-full rounded-[32px] border border-white bg-white/80 backdrop-blur-2xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_70px_rgba(251,146,60,0.18)] hover:-translate-y-3 transition-all duration-500">

                {/* Hover Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-50 via-transparent to-amber-50" />

                {/* Shine */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />

                {/* Floating Glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-200/20 blur-2xl rounded-full" />

                <div className="relative z-10 flex flex-col items-center text-center">

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-4xl text-white shadow-xl shadow-orange-200/50 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {s.icon}
                  </div>

                  {/* Counter */}
                  <Counter target={s.target} suffix={s.suffix} />

                  {/* Label */}
                  <p className="mt-4 text-slate-500 font-semibold text-[15px] leading-7">
                    {s.label}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-6 w-14 h-[3px] rounded-full bg-gradient-to-r from-orange-400 to-amber-300 group-hover:w-24 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 md:px-14 py-12 shadow-2xl">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 blur-3xl rounded-full" />

            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-yellow-500/10 blur-3xl rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                  ⚡ Powering India
                </span>

                <h3 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                  Ready To Transform
                  <br />
                  Your Energy Infrastructure?
                </h3>

                <p className="text-slate-300 mt-5 text-lg leading-8 max-w-2xl">
                  Get expert consultation for electricity connections, solar,
                  audits and industrial power solutions.
                </p>
              </div>

              {/* CTA Button */}
              <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-400 text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-orange-500/30 hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-3">
                  Get Free Consultation
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>

                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}