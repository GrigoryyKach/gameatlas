import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Play } from "next/font/google"
import "./globals.css"

import Footer from "../components/Footer"
import Header from "../components/Header"

const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-play"
})

export const metadata = {
  title: "GameAtlas",
  description: "Where Every Game Tells a Story",
  other: {
    "google-site-verification": "bGKDwoty_91oVIz6cK9W9LCeGq1v1LIS-jaV8RKh_II"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${play.variable} flex flex-col relative min-h-screen`}>
        <Header />
        {children}
        <div className="mt-auto">
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
