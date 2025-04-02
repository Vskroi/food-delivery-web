// src/app/layout.tsx or any parent layout
"use client"; // Mark this layout as a client component

import { AuthenticationProvider } from "@/providers/AuthenticationProvider"; // Import the AuthenticationProvider
import { CreateAccountProvider } from "@/providers/CreateAccountProvider"; // Import CreateAccountProvider
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FoodOrderProvider } from "@/providers/foodorderProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Ensure AuthenticationProvider is wrapping the entire app */}
        <AuthenticationProvider>
          <FoodOrderProvider>
          <CreateAccountProvider>
            {children}
          </CreateAccountProvider>
          </FoodOrderProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
