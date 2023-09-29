import Link from "next/link";
import "./globals.css";
import { Open_Sans, Spectral, Source_Code_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/providers";
import Header from "@/components/header";

const sans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Spectral({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-serif" });
const code = Source_Code_Pro({ subsets: ["latin"], variable: "--font-code" });

export const metadata = {
  title: "SuchCodeWow",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${code.variable}`}>
      <body className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="py-10 px-4">
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
