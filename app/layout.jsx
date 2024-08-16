import { Work_Sans } from "next/font/google";
import { Jost } from "next/font/google";
import { Play } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const worksans = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-worksans"
});

export const metadata = {
  title: "PlayLog",
  description: "PlayLog App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={worksans.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
