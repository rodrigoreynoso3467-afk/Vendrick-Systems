import { Intro } from "@/components/ui";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <>
      <Intro label="Privacy" title="Your inquiry, handled with care.">
        How this website handles project inquiries and company introductions.
      </Intro>
      <section className="section prose privacy">
        <h2>Information you provide</h2>
        <p>
          The form collects your name, email, optional phone number where provided, service interest, optional company and current tools, project description, and budget range. Vendrick Systems uses this information
          to review and respond to your inquiry. Career, investor, and supplier forms collect your name, email, optional company, inquiry topic, and introductory message, including any public links you choose to provide. These forms do not request project budgets or attachments. Do not send sensitive records.
        </p>
        <h2>Delivery and protection</h2>
        <p>
          Inquiries are processed and stored by Netlify Forms, which filters
          automated spam, and notifications are sent to the company’s email inbox.
          Netlify also hosts the website and processes request information and
          operational logs. This website does not use advertising trackers or analytics cookies.
        </p>
        <h2>Retention and requests</h2>
        <p>
          Inquiry information may remain in the company’s email system while
          relevant to the conversation or project. To request access,
          correction, or deletion, email vendricksystems@gmail.com and identify your
          earlier inquiry. A response may require verification of your email
          address.
        </p>
        <p>Last updated: November 8, 2026.</p>
      </section>
    </>
  );
}
