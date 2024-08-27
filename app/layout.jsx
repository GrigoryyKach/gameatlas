import { Work_Sans } from "next/font/google";
import { Jost } from "next/font/google";
import { Play } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

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
      <body className={play.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
