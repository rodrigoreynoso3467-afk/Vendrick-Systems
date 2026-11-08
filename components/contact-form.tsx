"use client";
import { useState } from "react";
import { services } from "@/lib/content";
import { budgets, validateInquiry } from "@/lib/inquiry";
import { submitInquiry } from "@/lib/submit-inquiry";
export function ContactForm({selectedService,topic="project",compact=false}:{compact?:boolean;selectedService?:string;topic?:"project"|"careers"|"investors"|"suppliers"}) {
 const project=topic==="project";
 const heading={project:'Project inquiry',careers:'Career expression of interest',investors:'Investor inquiry',suppliers:'Supplier introduction'}[topic];
 const prompt={project:'What task repeats, and what should work better?',careers:'Tell us about your skills and the work that interests you.',investors:'Introduce yourself and the conversation you have in mind.',suppliers:'What do you provide, and how might it fit Vendrick Systems?'}[topic];
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const enabled = process.env.NEXT_PUBLIC_CONTACT_ENABLED === "true";
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending" || !enabled) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fields = Object.fromEntries(new FormData(form));
    if (!validateInquiry(fields)) {
      setState("error");
      setMessage("Please check your details and write a message of 20–5,000 characters.");
      return;
    }
    setState("sending");
    setMessage("Sending your inquiry…");
    try {
      await submitInquiry(fields);
      setState("success");
      setMessage("Your inquiry has been submitted. Thank you for contacting Vendrick Systems.");
      form.reset();
    } catch {
      setState("error");
      setMessage("Submission could not be confirmed. Your details are still here. Please try again or email vendricksystems@gmail.com.");
    }
  }
  return (
    <form name="vendrick-inquiry" action="/__forms.html" method="POST" onSubmit={submit} className={"inquiry-form"+(compact?" compact-inquiry":"")}>
      <input type="hidden" name="form-name" value="vendrick-inquiry" />
      <div className="form-heading">
        {!compact&&<h2>{heading}</h2>}<input type="hidden" name="topic" value={topic}/>
        <p>All fields required unless marked optional.</p>
      </div>
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      {project&&!compact&&<label>Service of interest<select name="service" defaultValue={selectedService||"not-sure"}><option value="not-sure">Not sure yet</option>{services.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}</select></label>}
      <label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
      {!compact&&<label>
        Company <span>(optional)</span>
        <input name="company" autoComplete="organization" maxLength={150} />
      </label>}
      <label>
        {compact?"Message":prompt}
        <textarea
          name="description"
          rows={compact?4:6}
          required
          minLength={20}
          maxLength={5000}
          placeholder={project?"What happens today? How often? Which tools are involved, and what result would help?":topic==="careers"?"Your skills, interests, availability, and optional public portfolio or profile link. Please do not include identity documents or sensitive personal information.":"A brief introduction, relevant public links, and what you would like to discuss."}
        />
      </label>
      {project&&!compact&&<label>Current tools <span>(optional)</span><input name="tools" maxLength={200} placeholder="For example: Excel, QuickBooks, emailed CSV files"/></label>}
      {project&&!compact?<label>
        Estimated budget
        <select name="budget" required defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>:<input type="hidden" name="budget" value="Not sure yet"/>}
      {(!project||compact)&&<input type="hidden" name="service" value="not-sure"/>}
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-privacy">
        We’ll use these details to review and respond to your inquiry.{" "}
        <a href="/privacy">Privacy information</a>.
      </p>
      {!enabled && <p className="form-notice">Online inquiries are being configured. Please email <a href="mailto:vendricksystems@gmail.com">vendricksystems@gmail.com</a>.</p>}
      <button
        className="button light"
        type="submit"
        disabled={state === "sending" || !enabled}
      >
        {state === "sending" ? "Sending…" : compact?"Send message":project?"Send project inquiry":topic==="careers"?"Send expression of interest":"Send inquiry"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      <p className={"form-status " + state} role="status" aria-live="polite">
        {message}
      </p>
      <noscript>
        For help submitting an inquiry, email vendricksystems@gmail.com.
      </noscript>
    </form>
  );
}
