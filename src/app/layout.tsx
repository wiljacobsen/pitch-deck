import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Symphony Deck Platform',
  description: 'Slide deck management platform for Symphony — Your Integrated HV Infrastructure Partner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
