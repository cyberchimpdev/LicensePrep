import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LicensePrep — Nepal Driving License Written Exam Preparation",
  description:
    "Prepare smarter and drive safer. Master all 500 official Nepal DOTM Category A (Motorcycle) and Category K (Scooter) driving license written examination questions with timed mock exams and interactive practice.",
  keywords: [
    "Nepal Driving License",
    "DOTM Written Exam",
    "License Question Bank",
    "Motorcycle License Exam Nepal",
    "Scooter License Exam Nepal",
    "सवारी चालक अनुमतिपत्र",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
