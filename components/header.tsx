"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export function Header() {
  const path = usePathname();
  return (
    <header className="header">
      <Link className="brand" href="/" aria-label="Vendrick Systems home">
        <span className="logo-window"><Image src="/images/vendrick-logo.png" alt="Vendrick Systems" width={2048} height={682} priority className="brand-image" /></span>
      </Link>
      <nav
        id="navigation"
        className="nav"
        aria-label="Main navigation"
      >
        {["Home", "Services", "About", "Projects", "Contact"].map((n) => (
          <Link
            key={n}
            href={n === "Home" ? "/" : "/" + n.toLowerCase()}
            aria-current={
              path === (n === "Home" ? "/" : "/" + n.toLowerCase())
                ? "page"
                : undefined
            }
          >
            {n}
          </Link>
        ))}
        <Link
          href="/contact"
          className="nav-cta"
        >
          Discuss a project <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <details className="native-mobile-menu">
        <summary>Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation">{["Home","Services","About","Projects","Contact"].map(name=><Link key={name} href={name==='Home'?'/':'/'+name.toLowerCase()}>{name}</Link>)}</nav>
      </details>
    </header>
  );
}
