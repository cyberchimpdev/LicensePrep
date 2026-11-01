import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  applicationName: "LicensePrep",
  title: "LicensePrep — Nepal Driving License Exam Preparation",
  description:
    "Practice Nepal driving license written exam questions, learn traffic rules, and prepare with interactive mock tests.",
  keywords: [
    "Nepal Driving License",
    "DOTM Written Exam",
    "Category A Motorcycle",
    "Category K Scooter",
    "सवारी चालक अनुमतिपत्र",
    "लिखित परीक्षा प्रश्नोत्तर",
    "Likhit Exam Nepal",
  ],
  openGraph: {
    title: "LicensePrep — Nepal Driving License Exam Preparation",
    description:
      "Practice Nepal driving license written exam questions, learn traffic rules, and prepare with interactive mock tests.",
    url: "https://licenseprep.pages.dev",
    siteName: "LicensePrep",
    locale: "ne_NP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
