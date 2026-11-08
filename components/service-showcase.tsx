import { services } from "@/lib/content";
const labels = ["Automation", "Excel & CSV", "Reporting", "Custom software"];
const stages = [
  ["Incoming files", "Validate & route", "Organized output"],
  ["Inconsistent records", "Clean & standardize", "Ready to import"],
  ["Source data", "Apply agreed rules", "PDF report"],
  ["Business tool", "API integration", "Connected system"],
];
export function ServiceShowcase() {
  return <section className="service-lab" aria-labelledby="lab-title">
    <div className="lab-top"><div><p className="eyebrow">01 / Capabilities</p><h2 id="lab-title">See the work.<br/><em>Rethink the workflow.</em></h2></div><p>Explore a few ways focused software can move your business forward.</p></div>
    <div className="service-selector-shell">
      {labels.map((label,i)=><input key={label} className="service-choice" type="radio" name="capability" id={'capability-'+i} defaultChecked={i===0} aria-label={label} aria-controls={'service-panel-'+i}/>)}
      <div className="lab-selector" aria-hidden="true">{labels.map((label,i)=><label key={label} htmlFor={'capability-'+i}><span>0{i+1}</span>{label}<span aria-hidden="true">↗</span></label>)}</div>
      {services.map((service,i)=><div id={'service-panel-'+i} className={'lab-stage service-panel service-panel-'+i} key={service.slug}>
        <div className="lab-copy"><span className="lab-index" aria-hidden="true">0{i+1}</span><p className="eyebrow">{labels[i]}</p><h3>{service.short}</h3><p>{service.description}</p><a className="button light" href={'/services#'+service.slug}>Explore this service <span aria-hidden="true">↗</span></a></div>
        <WorkflowVisual index={i}/>
      </div>)}
    </div>
    <div className="mobile-lab">{services.map((service,i)=><article key={service.slug}><p className="eyebrow">0{i+1} / {labels[i]}</p><h3>{service.short}</h3><p>{service.description}</p><WorkflowVisual index={i}/><a className="text-link" href={'/services#'+service.slug}>Explore this service →</a></article>)}</div>
  </section>;
}
function WorkflowVisual({index}:{index:number}) {
 return <div className={'lab-visual visual-'+index} aria-label={'Illustrative '+labels[index]+' workflow'}><div className="visual-meta"><span>WORKFLOW STUDY / 0{index+1}</span><span className="visual-signal">ILLUSTRATIVE</span></div><div className="visual-track">{stages[index].map((stage,i)=><div className="visual-step" key={stage}><span className="visual-step-num">0{i+1}</span><strong>{stage}</strong>{i<2&&<span className="flow-arrow" aria-hidden="true">↓</span>}</div>)}</div><div className="visual-output" aria-hidden="true">{index===1?<div className="data-grid"><span>RECORD</span><span>DATE</span><span>STATUS</span>{['A-001','2026-11-01','Validated','A-002','2026-11-02','Validated','A-003','2026-11-03','Validated'].map((v,i)=><span key={i} style={{animationDelay:i*80+'ms'}}>{v}</span>)}</div>:index===2?<div className="report-preview"><small>ILLUSTRATIVE REPORT</small><strong>Weekly summary</strong><div className="mini-bars">{[35,62,48,82,68,95].map((v,i)=><i key={i} style={{height:v+'%',animationDelay:i*100+'ms'}}/>)}</div><span>Structured data → consistent output</span></div>:<div className="system-nodes"><span>{index===0?'INPUT':'SYSTEM A'}</span><i/><b>{index===0?'WORKFLOW':'API'}</b><i/><span>{index===0?'OUTPUT':'SYSTEM B'}</span></div>}</div><p className="visual-caption">Concept illustration · No live client data or claimed project results.</p></div>;
}
