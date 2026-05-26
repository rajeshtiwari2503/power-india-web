 import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline flex-shrink-0">
      <svg width="46" height="46" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e85d04" />
            <stop offset="100%" stopColor="#ffbe0b" />
          </linearGradient>
        </defs>
        <path d="M30 7C13 7 6 20 6 32C6 48 19 57 34 57C44 57 52 50 54 42"
          stroke="url(#lg)" strokeWidth="8.5" fill="none" strokeLinecap="round" />
        <path d="M30 7C50 7 57 25 52 40"
          stroke="#1a2455" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.35" />
        <circle cx="30" cy="11" r="4.5" fill="#ffbe0b" />
        <polygon points="30,5 33,11 27,11" fill="#ffbe0b" />
      </svg>
      <div className="leading-tight">
        <div className="font-poppins font-extrabold text-[22px] leading-none">
          <span className="text-brand-navy">Power </span>
          <span className="text-brand-orange">India</span>
        </div>
        <span className="text-[9px] tracking-[2.5px] text-gray-400 font-semibold uppercase block mt-0.5">
          Services
        </span>
      </div>
    </Link>
  )
}