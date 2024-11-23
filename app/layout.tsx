import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import {ModeToggle} from "@/components/ui/modo-toggle"

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

export const metadata: Metadata = {
  title: "Solara Pay",
  description: "Instant Payroll Disbursement Powered by Solana",
  keywords: ['payroll', 'solana', 'instant payroll disbursement'],
  icons: './logo.png',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {/*<ThemeProvider*/}
      {/*    attribute="class"*/}
      {/*    defaultTheme="system"*/}
      {/*    enableSystem*/}
      {/*    disableTransitionOnChange*/}
      {/*>*/}
      {/*/!*<ModeToggle/>*!/*/}
      {/*<SidebarProvider>*/}
      {/*  <AppSidebar />*/}
        <main>
          {/*<SidebarTrigger />*/}
          {children}
        </main>
      {/*</SidebarProvider>*/}
      {/*</ThemeProvider>*/}
      </body>
    </html>
  );
}
