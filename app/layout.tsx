import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Container, Theme } from "@radix-ui/themes";
import AuthProvider from "./api/auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue tracker app built with Next.js to manage issues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <ThemeProvider>
              <Theme accentColor="blue">
                <NavBar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
              </Theme>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
