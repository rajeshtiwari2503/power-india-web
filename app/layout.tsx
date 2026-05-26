 import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Power India Services – One-Stop Power & Utility Solution',
  description:
    'Trusted partner for electricity connections, energy audits, solar installations, billing compliance and all utility services across India.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-gray-800 font-inter antialiased">{children}</body>
    </html>
  )
}