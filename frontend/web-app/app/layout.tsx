import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./_nav/NavBar";

export const metadata: Metadata = {
  title: "Carsties",
  description:
    "Auction platform for cars built with microservices architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="container mx-auto px-5 pt-10 bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
