import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import "./globals.css";
const origin = process.env.SITE_URL || "https://vendricksystems.com";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Vendrick Systems — Business Automation & Software",
    template: "%s | Vendrick Systems",
  },
  description:
    "Focused business automation, Excel and CSV processing, automated reporting, and custom software for practical business workflows.",
  openGraph: {
    type: "website",
    siteName: "Vendrick Systems",
    images: ["/social.png"],
  },
  twitter: { card: "summary_large_image", images: ["/social.png"] },
  robots:
    process.env.SITE_INDEXABLE === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Link href="#main" className="skip">
          Skip to content
        </Link>
        <Header />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div>
            <Link className="footer-brand" href="/">
              <span className="logo-window"><Image src="/images/vendrick-logo.png" alt="Vendrick Systems" width={2048} height={682} className="brand-image" /></span>
            </Link>
            <p>Thoughtful software. Practical outcomes.</p>
          </div>
          <div className="footer-links">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>

          </div>
          <nav className="company-footer-links" aria-label="Company information"><Link href="/careers">Careers</Link><Link href="/updates">Updates</Link><Link href="/privacy">Privacy policy</Link><Link href="/suppliers">Suppliers</Link><Link href="/investors">Investors</Link></nav>
          <p className="copyright">
            © {new Date().getFullYear()} Vendrick Systems
          </p>
        </footer>
      </body>
    </html>
  );
}
