 'use client'
import { useState } from 'react'
import Link from 'next/link'
import ContactForm from './ui/Contactform'
 

/* WHY US BAR */
export function WhyUsBar() {
  const feats = [
    { icon: '⚡', label: 'Fast Processing', desc: 'Applications processed in record time with our deep government connections and DISCOM expertise.', color: 'from-orange-500 to-amber-400' },
    { icon: '🗺️', label: 'PAN India Coverage', desc: 'Serving clients across 25+ states with local expertise and physical presence in all major cities.', color: 'from-emerald-500 to-teal-400' },
    { icon: '🤝', label: 'Free Consultation', desc: 'Expert guidance at zero cost. Our certified engineers available 6 days a week for you.', color: 'from-blue-500 to-cyan-400' },
    { icon: '✅', label: 'Google Verified', desc: '4.9★ rated on Google with 600+ verified reviews. Trusted by thousands of businesses.', color: 'from-violet-500 to-purple-400' },
    { icon: '🛡️', label: '100% Compliant', desc: 'All services fully compliant with CERC, SERC & DISCOM guidelines. No shortcuts, no risks.', color: 'from-rose-500 to-pink-400' },
    { icon: '💰', label: 'Refund Assurance', desc: 'Transparent pricing, no hidden costs. Full refund guarantee if service goals are not met.', color: 'from-amber-500 to-yellow-400' },
  ]
  return (
    <section className="bg-white py-16 px-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a2455 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="max-w-[1260px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />Why Choose Us
            </div>
            <h2 className="font-poppins font-bold text-4xl text-brand-navy leading-tight">
              Why 5,000+ Businesses<br /><span className="text-brand-orange">Trust Power India Services</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-center"><div className="font-poppins font-extrabold text-3xl text-brand-orange">4.9★</div><div className="text-xs text-gray-400 font-semibold">Google Rating</div></div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center"><div className="font-poppins font-extrabold text-3xl text-brand-orange">600+</div><div className="text-xs text-gray-400 font-semibold">Reviews</div></div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center"><div className="font-poppins font-extrabold text-3xl text-brand-orange">15+</div><div className="text-xs text-gray-400 font-semibold">Years Exp.</div></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {feats.map((f) => (
            <div key={f.label} className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-default overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl`} />
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>{f.icon}</div>
              <h4 className="font-poppins font-bold text-[17px] text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">{f.label}</h4>
              <p className="text-[13.5px] text-gray-500 leading-relaxed">{f.desc}</p>
              <div className="mt-4 flex items-center gap-1.5 text-brand-orange text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn More <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* TEAM SECTION */
export function TeamSection() {
  const stats = [
    { num: '50+', label: 'Expert Engineers' },
    { num: '25+', label: 'States Covered' },
    { num: '15+', label: 'Years Experience' },
    { num: '98%', label: 'Success Rate' },
  ]
  return (
    <section className="relative py-20 px-5 overflow-hidden bg-[#0b1120]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] via-[#1a2455]/80 to-[#0b1120]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="max-w-[1260px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />Our Expert Team
          </div>
          <h2 className="font-poppins font-bold text-4xl lg:text-[42px] text-white leading-[1.1] mb-6">
            The Team Behind<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">India&apos;s Best Utility Service</span>
          </h2>
          <p className="text-[15px] text-white/60 leading-relaxed mb-4">Our highly skilled professionals personify the qualities that have made us successful. Power India Services transforms the way businesses manage utility requirements by simplifying complex government processes.</p>
          <p className="text-[15px] text-white/60 leading-relaxed mb-8">Our experts in electrical engineering, solar energy, and compliance handhold clients through their entire journey — from connection application to long-term maintenance.</p>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {stats.map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                <div className="font-poppins font-extrabold text-2xl text-brand-yellow">{s.num}</div>
                <div className="text-[10.5px] text-white/40 font-semibold leading-tight mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/about" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-orangeLt hover:from-brand-orangeHv hover:to-brand-orange text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:-translate-y-0.5">More About Us →</Link>
            <Link href="/team" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all">Meet Our Team</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-2xl bg-gradient-to-br from-brand-orange via-brand-orangeLt to-brand-yellow h-44 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-brand-orange/20">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-6xl">👥</span>
              <span className="font-poppins font-bold text-white text-sm tracking-wider">Our Expert Team</span>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#1a2455] to-[#23316e] h-32 flex flex-col items-center justify-center gap-2 shadow-lg">
            <span className="text-4xl">⚡</span><span className="text-white/70 text-xs font-semibold">Power Experts</span>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-600 to-orange-500 h-32 flex flex-col items-center justify-center gap-2 shadow-lg">
            <span className="text-4xl">☀️</span><span className="text-white/70 text-xs font-semibold">Solar Specialists</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* MEDIA COVERAGE */
export function MediaSection() {
  const articles = [
    { logo: 'PTI', outlet: 'Press Trust of India', tag: 'Featured', headline: 'Why Power India Services Is Your Best Choice for Electricity Connections & Compliance', excerpt: 'Power India Services is a reliable partner for all electricity and utility requirements, making complex DISCOM processes simple for businesses across India.', color: 'from-blue-500 to-indigo-500' },
    { logo: 'HT',  outlet: 'Hindustan Times',      tag: 'Business', headline: 'Power India Services is making utility services affordable and simple for businesses across India', excerpt: 'A Delhi-based utility startup offering a wide range of power and electrical services to thousands of businesses across Pan-India.', color: 'from-red-500 to-rose-500' },
    { logo: 'EH',  outlet: 'Entrepreneur Hunt',    tag: 'Startup',  headline: 'How Power India Services Is Revolutionizing Industrial Power Services in India', excerpt: 'Power India Services has transformed how industries manage electricity connections and compliance, making processes faster and cost-effective.', color: 'from-emerald-500 to-teal-500' },
    { logo: 'II',  outlet: 'Influencive India',    tag: 'Innovation',headline: 'Power India Services – Simplifying Complex Power & Utility Problems for Businesses', excerpt: 'Industrial power setup delays cost businesses lakhs every month. Power India Services is determined to reverse this trend.', color: 'from-violet-500 to-purple-500' },
  ]
  return (
    <section className="bg-gradient-to-b from-white to-gray-50/80 py-20 px-5">
      <div className="max-w-[1260px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />Media Coverage
          </div>
          <h2 className="font-poppins font-bold text-4xl text-brand-navy mb-3">As Seen in the <span className="text-brand-orange">News</span></h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">Power India Services featured across leading national publications and digital media platforms.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((a) => (
            <div key={a.outlet} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className={`h-1 w-full bg-gradient-to-r ${a.color}`} />
              <div className="p-6 flex gap-5 items-start">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center font-poppins font-extrabold text-xl text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>{a.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{a.outlet}</span>
                    <span className={`text-[10px] font-bold text-white bg-gradient-to-r ${a.color} px-2 py-0.5 rounded-full`}>{a.tag}</span>
                  </div>
                  <h4 className="text-sm font-bold text-brand-navy leading-snug mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">{a.headline}</h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2 mb-3">{a.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-brand-orange font-bold text-[13px] group-hover:gap-2 transition-all">
                    Read Full Article <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* TESTIMONIALS */
export function TestimonialsSection() {
  const reviews = [
    { av:'RK', name:'Rajesh Kumar',   role:'Factory Owner, Haryana',     stars:5, platform:'Google',     text:'It was a great experience working with Power India Services. They got our HT connection approved in just 3 weeks. Their expertise in dealing with government departments is unmatched.' },
    { av:'PS', name:'Priya Sharma',   role:'Restaurant Owner, Delhi',    stars:5, platform:'Google',     text:'Professional and friendly experience, quick response and remarkable assistance. Loved their solar net metering service. Completely hassle-free — not a single office visit required!' },
    { av:'AM', name:'Anand Mehta',    role:'Builder, Noida',             stars:5, platform:'Trustpilot', text:'Energy audit delivered in just 4 days. Saved our business ₹2 lakh annually. Very happy with their professional and timely service. Will definitely use them again.' },
    { av:'SA', name:'Sunita Agarwal', role:'Hotel Owner, Jaipur',        stars:5, platform:'Google',     text:'Great & helpful support by everyone. Got response whenever I called. Heartily thanks for the super service for our hotel\'s load enhancement. Strongly recommended!' },
    { av:'VS', name:'Vijay Singh',    role:'Manufacturer, Pune',         stars:5, platform:'Google',     text:'Really appreciate your efforts in getting our rooftop solar installed with net metering. Work was smooth yet quick. Their team guided us at every step. 5 stars!' },
    { av:'MR', name:'Meena Reddy',    role:'IT Park Manager, Hyderabad', stars:5, platform:'Trustpilot', text:'Their follow-up with DISCOM and regular updates helped me a lot. From connection application to approval — everything was managed professionally. Excellent team!' },
    { av:'TG', name:'Tarun Gupta',    role:'Engineer, Mumbai',           stars:5, platform:'Google',     text:'Great experience getting our industrial connection done. Process was quite convenient and fast. They explained everything I wanted to know. Best utility service!' },
    { av:'AA', name:'Aftab Alam',     role:'Business Owner, Delhi',      stars:5, platform:'Google',     text:'Best in this industry and their prices are so affordable. Now they are my full-time utility consultant. If you have any power or utility problem, call Power India Services!' },
  ]
  const platformColor: Record<string, string> = {
    Google: 'bg-red-50 text-red-500 border-red-100',
    Trustpilot: 'bg-green-50 text-green-600 border-green-100',
  }
  return (
    <section className="bg-white py-20 px-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-yellow-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="max-w-[1260px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />Client Reviews
            </div>
            <h2 className="font-poppins font-bold text-4xl text-brand-navy mb-1">Loved by <span className="text-brand-orange">5,000+ Businesses</span></h2>
            <p className="text-gray-400 text-sm italic">&ldquo;Explore how Power India Services have helped businesses reach new heights as their trusted utility partner.&rdquo;</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
            <div className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-sm">G</div>
              <div><div className="text-[13px] font-bold text-brand-navy">4.9 ★★★★★</div><div className="text-[10px] text-gray-400">Google Rating</div></div>
            </div>
            <div className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-black text-sm">★</div>
              <div><div className="text-[13px] font-bold text-brand-navy">4.5 ★★★★½</div><div className="text-[10px] text-gray-400">Trustpilot</div></div>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 flex-wrap mb-8">
          {['✅ 600+ Verified Reviews','🏆 50+ Appreciation Letters','📅 15+ Years Experience','🇮🇳 Pan India Trusted'].map(b => (
            <span key={b} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">{b}</span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r) => (
            <div key={r.name} className="group bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3.5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-3 right-4 text-[64px] font-serif text-brand-orange/[0.07] leading-none select-none">&ldquo;</div>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array(r.stars).fill(0).map((_,i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${platformColor[r.platform]}`}>{r.platform}</span>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed flex-1 relative z-10">{r.text}</p>
              <div className="flex items-center gap-2.5 pt-1 border-t border-gray-50">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-navy to-brand-orange flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">{r.av}</div>
                <div>
                  <p className="text-[13px] font-bold text-brand-navy leading-tight">{r.name}</p>
                  <p className="text-[11px] text-gray-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/reviews" className="inline-flex items-center gap-2 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold text-sm px-8 py-3 rounded-xl transition-all">
            View All 600+ Reviews <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* CLIENTS MARQUEE */
export function ClientsSection() {
  const clients = [
    { name:'TATA Group',icon:'🏢'},{ name:'Reliance',icon:'🔋'},{ name:'Adani Power',icon:'⚡'},
    { name:'NTPC Ltd',icon:'🏭'},{ name:'Vedanta',icon:'⛏️'},{ name:'JSW Steel',icon:'🔩'},
    { name:'Hindalco',icon:'🏗️'},{ name:'DLF Infra',icon:'🏘️'},{ name:'ITC Hotels',icon:'🏨'},
    { name:'Maruti Suzuki',icon:'🚗'},{ name:'HUL Corp',icon:'🧴'},{ name:'Borosil',icon:'🔬'},
    { name:'ONGC Ltd',icon:'⛽'},{ name:'HPCL',icon:'🛢️'},{ name:'BPCL',icon:'🔥'},
  ]
  return (
    <section className="py-12 px-5 bg-gray-50/80 overflow-hidden border-y border-gray-100">
      <div className="max-w-[1260px] mx-auto mb-5">
        <p className="text-center text-[11px] font-bold text-gray-300 uppercase tracking-[3px]">Trusted & Appreciated By Leading Businesses</p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-anim flex gap-4 w-max">
          {[...clients,...clients].map((c,i) => (
            <div key={i} className="group flex items-center gap-2.5 w-[148px] h-14 bg-white border border-gray-100 rounded-xl px-4 flex-shrink-0 hover:border-brand-orange hover:shadow-lg transition-all duration-300 cursor-default">
              <span className="text-xl flex-shrink-0">{c.icon}</span>
              <span className="text-[11.5px] font-bold text-gray-400 group-hover:text-brand-orange transition-colors leading-tight">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* VIDEO CONSULT STRIP */
export function VideoConsultStrip() {
  return (
    <div className="relative py-8 px-5 overflow-hidden bg-gradient-to-r from-brand-orange via-brand-orangeLt to-amber-500">
      <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute right-20 -bottom-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="max-w-[1260px] mx-auto relative z-10 flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-3xl shadow-xl flex-shrink-0">🎥</div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />100% Free
            </div>
            <h4 className="font-poppins font-bold text-xl text-white leading-tight">Free Video Consultation</h4>
            <p className="text-white/80 text-sm">Talk to a certified power & utility expert — from your home or office</p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap flex-shrink-0">
          <div className="hidden md:flex flex-col gap-1 text-white/80 text-xs font-semibold">
            <div className="flex items-center gap-1.5"><span className="text-white">✓</span> No obligation</div>
            <div className="flex items-center gap-1.5"><span className="text-white">✓</span> Expert advice</div>
            <div className="flex items-center gap-1.5"><span className="text-white">✓</span> Instant booking</div>
          </div>
          <Link href="#contact" className="inline-flex items-center gap-2 bg-white text-brand-orange hover:bg-brand-navyDk hover:text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
            📅 Book Free Session <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

/* CONTACT SECTION */
export function ContactSection() {
  const details = [
    { icon:'📍', label:'Visit Us',       val:'804, 8th Floor, Bhandari House-91,\nNehru Place, New Delhi – 110019', color:'bg-red-50 text-red-500' },
    { icon:'📞', label:'Call / WhatsApp',val:'+91 9999-000-000',                                                    color:'bg-green-50 text-green-600' },
    { icon:'📧', label:'Email Us',       val:'info@powerindiaservices.com',                                          color:'bg-blue-50 text-blue-500' },
    { icon:'⏰', label:'Working Hours',  val:'Monday – Saturday\n9:00 AM to 7:00 PM (IST)',                         color:'bg-amber-50 text-amber-600' },
  ]
  const quickLinks = ['New Electricity Connection','Solar & Net Metering','Energy Audit','Bill Dispute','Load Enhancement','Licensing & NOC']
  return (
    <section className="relative py-20 px-5 overflow-hidden bg-gradient-to-b from-gray-50 to-white" id="contact">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="max-w-[1260px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />Get In Touch
          </div>
          <h2 className="font-poppins font-bold text-4xl text-brand-navy mb-3">Let&apos;s Solve Your <span className="text-brand-orange">Utility Challenge</span></h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">Our certified experts respond within 30 minutes. Free consultation, no obligation.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map(d => (
                <div key={d.label} className="group bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg hover:border-brand-orange/20 transition-all duration-300">
                  <div className={`w-11 h-11 rounded-xl ${d.color} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>{d.icon}</div>
                  <div>
                    <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-1">{d.label}</p>
                    <p className="text-sm font-semibold text-brand-navy leading-snug whitespace-pre-line">{d.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Service Enquiry</p>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map(l => (
                  <Link key={l} href="#" className="inline-flex items-center gap-1.5 border border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all">
                    <span className="text-[10px]">✔</span> {l}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 h-44 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex flex-col items-center justify-center gap-3 cursor-pointer group hover:shadow-lg transition-shadow">
              <div className="text-4xl group-hover:scale-110 transition-transform">🗺️</div>
              <div className="text-center">
                <p className="font-semibold text-brand-navy text-sm">Nehru Place, New Delhi</p>
                <p className="text-brand-orange text-xs font-bold flex items-center gap-1 justify-center mt-1 group-hover:gap-2 transition-all">
                  View on Google Maps <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100 overflow-hidden sticky top-20">
            <div className="bg-gradient-to-br from-brand-navy to-brand-navyLt px-7 py-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-xl">📋</div>
                <div>
                  <h3 className="font-poppins font-bold text-[18px] text-white leading-tight">Get Expert Assistance</h3>
                  <p className="text-white/60 text-xs">Response within 30 minutes</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {['🔒 Secure','✅ Free','⚡ Fast Response'].map(b => (
                  <span key={b} className="bg-white/10 text-white/80 text-[10px] font-semibold px-2.5 py-1 rounded-full">{b}</span>
                ))}
              </div>
            </div>
            <div className="px-7 py-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}