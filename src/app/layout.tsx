import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "LicensePrep — Nepal Driving License Written Exam Preparation",
  description:
    "Master all 500 official Nepal DOTM Category A (Motorcycle) and Category K (Scooter) driving license written examination questions with timed mock exams, instant answer evaluation, and offline progress tracking.",
  keywords: [
    "Nepal Driving License",
    "DOTM Written Exam",
    "Category A Motorcycle",
    "Category K Scooter",
    "सवारी चालक अनुमतिपत्र",
    "लिखित परीक्षा प्रश्नोत्तर",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-16 md:pb-0">
        <Navbar />
        {children}
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
