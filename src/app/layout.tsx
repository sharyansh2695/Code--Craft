<<<<<<< HEAD
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from "next";
// import localFont from "next/font/local";
=======
import type { Metadata } from "next";
import localFont from "next/font/local";
>>>>>>> d2efcd745807296654e57a365c594d0340d88886
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

<<<<<<< HEAD
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900", 
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
=======
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
>>>>>>> d2efcd745807296654e57a365c594d0340d88886

export const metadata: Metadata = {
  title: "Code Craft",
  description: "Share and run code snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
<<<<<<< HEAD
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
=======
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
>>>>>>> d2efcd745807296654e57a365c594d0340d88886
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>

          <Footer />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
<<<<<<< HEAD
}
=======
}

// https://emkc.org/api/v2/piston/runtimes
>>>>>>> d2efcd745807296654e57a365c594d0340d88886
