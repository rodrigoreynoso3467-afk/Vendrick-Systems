export function CTA() {
  return (
    <section className="cta">
      <div>
        <p className="eyebrow">A practical starting point</p>
        <h2>
          What work keeps
          <br />
          repeating itself?
        </h2>
        <p>
          Tell us about the process. We’ll explore whether software can make it
          simpler.
        </p>
      </div>
      <a className="button light" href="/contact">
        Let’s discuss it <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
export function Intro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="lead">{children}</p>
    </section>
  );
}
