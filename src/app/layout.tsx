import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/context/SessionProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "CREAM - CREAMi Recipe Sharing Platform",
  description: "Share and discover amazing Ninja CREAMi recipes with the community",
  keywords: ["CREAMi", "recipes", "ice cream", "sorbet", "gelato", "Ninja"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-gray-50 dark:bg-gray-950">
        <SessionProvider>
          <ThemeProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 md:ml-64">
                <TopNav />
                <main className="pb-16 md:pb-0 min-h-screen">
                  {children}
                </main>
                <BottomNav />
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
