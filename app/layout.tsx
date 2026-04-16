import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChaseBot — Stop Chasing Invoices. Start Getting Paid.",
  description:
    "ChaseBot watches your Stripe invoices and automatically sends polite, professional follow-up emails when clients go overdue. Built for freelancers. $19/mo.",
  openGraph: {
    title: "ChaseBot — Stop Chasing Invoices. Start Getting Paid.",
    description:
      "AI-powered invoice follow-up for freelancers. Connect Stripe, set your schedule, and never write another awkward payment reminder again.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
