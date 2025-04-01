import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "@/providers/AuthenticationProvider"; // Import the AuthenticationProvider
import { CreateAccountProvider } from "@/providers/CreateAccountProvider";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <AuthenticationProvider>
          <CreateAccountProvider>
          {children} 
          </CreateAccountProvider>
          
        </AuthenticationProvider>
      </body>
    </html>
  );
}
