import {ContactForm} from '@/components/contact-form';
import type {Metadata} from 'next';
import Image from 'next/image';
import {steps} from '@/lib/content';
export const metadata:Metadata={alternates:{canonical:'/'}};
export default function Home(){return <>
      <section className="hero cinematic-hero" data-motion-scene>
        <Image src="/images/vendrick-earth.webp" alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" /> BUSINESS AUTOMATION & SOFTWARE
          </p>
          <h1>
            Less repetition.
            <br />
            More <em>possibility.</em>
          </h1>
          <p className="lead">
            Python automation, spreadsheet workflows, and reporting tools for businesses.
            Turn manual tasks, messy spreadsheets, and recurring reports into
            dependable workflows.
          </p>
          <div className="actions">
            <a className="button light" href="#contact">
              Discuss your workflow <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/services">
              Explore our services <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="hero-note">
            Clear scope. Direct communication. Software with a purpose.
          </p>
        </div>
      </section>

<section className="section landing-services" aria-labelledby="landing-services-title">
 <div className="landing-section-heading"><div><p className="eyebrow">01 / WHAT WE DO</p><h2 id="landing-services-title">Make the everyday<br/>work better.</h2></div><p>Focused automation for the files, reports, and repetitive tasks your business runs on.</p></div>
 <div className="landing-service-list">{[
 {n:'01',title:'Business automation',text:'Connect repeatable steps and reduce manual copying, sorting, and file handling.',slug:'process-automation'},
 {n:'02',title:'Excel & CSV workflows',text:'Clean inconsistent records, consolidate exports, and flag exceptions for review.',slug:'excel-csv'},
 {n:'03',title:'Automated reporting',text:'Turn agreed data and calculations into consistent reports, PDFs, and exports.',slug:'reporting'}
 ].map(s=><a href={'/services#'+s.slug} key={s.slug}><span className="landing-number">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p><span className="landing-arrow" aria-hidden="true">↗</span></a>)}</div>
 <div className="landing-services-foot"><p>Need an API, integration, or internal business tool?</p><a className="text-link" href="/services#custom-software">Explore custom development →</a></div>
</section>
<section className="section landing-process" aria-labelledby="landing-process-title"><div className="landing-section-heading"><div><p className="eyebrow">02 / HOW WE WORK</p><h2 id="landing-process-title">Clear scope.<br/>Direct communication.</h2></div><p>A small team, practical requirements, and a shared understanding of the result you need.</p></div><ol>{steps.map((s,i)=><li key={s.title}><span className="landing-number">0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol><a className="text-link" href="/about">Meet Vendrick Systems →</a></section>
<section id="contact" className="section landing-contact landing-contact-form" aria-labelledby="landing-contact-title"><div className="landing-contact-intro"><p className="eyebrow">03 / GET IN TOUCH</p><h2 id="landing-contact-title">Let’s talk about<br/>your project.</h2><p>Have a repetitive task or a project in mind? Tell us what you’d like to improve using the form below.</p><a className="text-link" href="mailto:vendricksystems@gmail.com">vendricksystems@gmail.com →</a><small>Prefer email? You can also reach us directly by email.</small><a className="text-link landing-example-link" href="/demo">Explore an example →</a></div><ContactForm compact/></section>
</>}
