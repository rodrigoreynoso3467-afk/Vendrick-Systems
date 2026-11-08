import type { Metadata } from "next";
import { Intro, CTA } from "@/components/ui";
export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <Intro
        label="About Vendrick Systems"
        title="A small team. A direct relationship."
      >
        Vendrick Systems is an early-stage software development and business
        automation company focused on practical tools for everyday business
        operations.
      </Intro>
      <section className="section about-grid">
        <div>
          <p className="eyebrow">Built with intention</p>
          <h2>
            Start with the problem.
            <br />
            Keep the solution focused.
          </h2>
        </div>
        <div className="prose">
          <p>
            Repetitive administrative tasks can consume attention that a
            business needs elsewhere. Our focus is on understanding those tasks
            and designing software that makes them easier to manage.
          </p>
          <p>
            We prioritize Python automation, Excel and CSV workflows, and
            automated reporting. Where the problem requires it, we also offer
            backend development, database integrations, APIs, and internal
            business tools.
          </p>
          <p>
            We are developing our first internal demonstration. As the company
            grows, we will publish work only when it can be shown accurately and
            responsibly.
          </p>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">The operating model</p>
        <h2>
          Clear responsibilities.
          <br />
          Connected work.
        </h2>
        <div className="team-grid">
          <article>
            <span className="role-label">BUSINESS & DELIVERY</span>
            <h3>Rodrigo Reynoso</h3>
            <p className="role">Founder</p>
            <p>
              Business development, client relationships, project management,
              and company operations. Your point of contact for understanding
              the business problem and coordinating the project.
            </p>
          </article>
          <article>
            <span className="role-label">ENGINEERING</span>
            <h3>Steven</h3>
            <p className="role">Lead Developer</p>
            <p>
              Software engineering, technical estimates, architecture, and
              development. Technical scope and scheduling are reviewed against
              actual availability before a commitment is made.
            </p>
          </article>
        </div>
      </section>
      <CTA />
    </>
  );
}
