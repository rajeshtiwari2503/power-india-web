 'use client'

const SERVICES = [
  'New Electricity Connection', 'Load Enhancement',
  'Solar Installation & Net Metering', 'Energy Audit',
  'Electricity Bill Dispute', 'Industrial Power Setup',
  'Electrical License / NOC', 'Maintenance AMC', 'Other',
]

const inputCls =
  'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-inter text-gray-800 bg-gray-50 outline-none focus:border-brand-orange focus:bg-white transition-colors'

export default function ContactForm() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: 'Full Name',     type: 'text',  ph: 'Rajesh Kumar' },
        { label: 'Mobile Number', type: 'tel',   ph: '+91 98765 43210' },
        { label: 'Email Address', type: 'email', ph: 'rajesh@example.com' },
      ].map(f => (
        <div key={f.label}>
          <label className="block text-xs font-semibold text-brand-navy mb-1">{f.label}</label>
          <input type={f.type} placeholder={f.ph} className={inputCls} />
        </div>
      ))}

      <div>
        <label className="block text-xs font-semibold text-brand-navy mb-1">Service Required</label>
        <select className={inputCls}>
          <option value="">Select a service…</option>
          {SERVICES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-navy mb-1">Message (Optional)</label>
        <textarea rows={2} placeholder="Briefly describe your requirement…"
          className={inputCls + ' resize-y'} />
      </div>

      <button
        className="w-full bg-brand-orange hover:bg-brand-navyDk text-white font-poppins font-bold text-[15px] py-3 rounded-lg transition-colors">
        Get Free Consultation →
      </button>
      <p className="text-center text-[11px] text-gray-400">🔒 Your information is 100% secure</p>
    </div>
  )
}