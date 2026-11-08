import type { Metadata } from "next";
import { SampleCTA } from "@/components/sample-cta";
import { Intro, CTA } from "@/components/ui";
export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};
export default function Projects() {
  return (
    <>
      <Intro label="Project journal" title="Good work deserves a clear record.">
        This space will document the problem, approach, and outcome of projects
        we can share.
      </Intro>
      <section className="section">
        <article className="project-placeholder">
          <div className="project-art" aria-hidden="true">
            <span>INPUT</span>
            <i>↓</i>
            <strong>PROCESS</strong>
            <i>↓</i>
            <span>OUTPUT</span>
          </div>
          <div>
            <span className="status">
              IN DEVELOPMENT · INTERNAL DEMONSTRATION
            </span>
            <h2>
              Our first demonstration
              <br />
              is taking shape.
            </h2>
            <p>
              We are preparing an internal automation demonstration. It is not a
              completed project or a client engagement. Details will be added
              after implementation and validation.
            </p>
            <a className="text-link" href="/services">
              See the workflows we focus on →
            </a>
          </div>
        </article>
      </section>
      <SampleCTA />
      <CTA />
    </>
  );
}
