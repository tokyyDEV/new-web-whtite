import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whitecore",
  description: "Gaming / Tech / Shop platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}