import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: {
    template: "%s | My Site",
    default: "My Site",
  },
  description: "Social media for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans" >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  );
}
