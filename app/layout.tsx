import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue tracker app built with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="blue">
          <NavBar />
          <main className="p-5">
            <Container>{children}</Container>
          </main>
          {/* <ThemePanel /> */}{" "}
          {/* Uncomment this line to enable the theme panel */}
        </Theme>
      </body>
    </html>
  );
}
