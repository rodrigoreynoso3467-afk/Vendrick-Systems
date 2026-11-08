import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-intro">
      <p className="eyebrow">404 / Page not found</p>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <Link className="button light" href="/">
        Return home →
      </Link>
    </section>
  );
}
