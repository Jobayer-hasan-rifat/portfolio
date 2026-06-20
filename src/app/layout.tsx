import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jobayer Hasan — AI Engineer & Full-Stack Developer",
  description:
    "The portfolio of Jobayer Hasan. AI Engineer, Machine Learning enthusiast and full-stack developer — a cinematic journey through projects, research and skills.",
  keywords: [
    "Jobayer Hasan",
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Jobayer Hasan" }],
  openGraph: {
    title: "Jobayer Hasan — AI Engineer & Full-Stack Developer",
    description:
      "A cinematic journey through projects, research and skills.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
