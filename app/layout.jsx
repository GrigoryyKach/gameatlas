import { Work_Sans } from "next/font/google";
import { Jost } from "next/font/google";
import { Play } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
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
      <UserProvider>
        <body className={`${play.variable} flex flex-col relative min-h-screen`}>
          <Header />
          {children}
          <div className="mt-auto">
            <Footer />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
