import { Analytics } from '@vercel/analytics/react';
import { Play } from "next/font/google"
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-play"
});

export const metadata = {
  title: "GameAtlas",
  description: "Where Every Game Tells a Story",
};

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
      </body>
    </html>
  );
}
