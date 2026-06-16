import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mavaro | Employee connection circles for modern companies",
  description:
    "Mavaro helps companies create recurring small-group employee circles that strengthen onboarding, hybrid culture, and workplace belonging.",
  metadataBase: new URL("https://mavaro.org"),
  openGraph: {
    title: "Mavaro",
    description: "Employee connection circles for modern companies.",
    url: "https://mavaro.org",
    siteName: "Mavaro",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
