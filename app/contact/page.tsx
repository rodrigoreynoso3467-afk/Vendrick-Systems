import type { Metadata } from "next";
import { Intro } from "@/components/ui";
import { services } from "@/lib/content";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};
export default async function Contact({searchParams}:{searchParams:Promise<{service?:string}>}) {
 const requested=(await searchParams).service;
 const selectedService=services.some(s=>s.slug===requested)?requested:undefined;
  return (
    <>
      <Intro
        label="Start a conversation"
        title="Tell us about a repetitive task."
      >
        You don’t need a technical specification. Describe what happens today and what you’d like to improve.
      </Intro>
      <section className="section contact-layout">
        <aside>
          <h2>A useful first step.</h2>
          <p>
            You don’t need a technical specification. Describe what happens
            today and what you would like to change.
          </p>
          <ol className="contact-steps">
            <li>Share the workflow and your goals.</li>
            <li>We review the fit and technical requirements.</li>
            <li>We discuss scope and an estimate if appropriate. No commitment to proceed.</li>
          </ol>
          <div className="contact-note">
            Please don’t include passwords, payment information, or confidential
            customer records.
          </div>
        </aside>
        <ContactForm selectedService={selectedService} />
      </section>
    </>
  );
}
