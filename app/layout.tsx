import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Grit & Glory Taekwondo",
  description: "Grit & Glory Taekwondo management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* google tag */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MJ7VR759"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            ></iframe>
          </noscript>
          <link
            rel="icon"
            href="/assets/images/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/images/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/images/apple-touch-icon.png"
          />
          <link rel="manifest" href="/assets/images/site.webmanifest" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/assets/images/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/assets/images/android-chrome-512x512.png"
          />
        </head>
        <body className={poppins.variable}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
