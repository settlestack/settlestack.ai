import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const repository = 'https://github.com/settlestack/settlestack.ai'
function Mark() { return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m7 12 13-7 13 7-13 7zM7 20l13 7 13-7M7 28l13 7 13-7" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" /></svg> }
function BrandIcon({ name }) {
  const source = `url("${import.meta.env.BASE_URL}icons/${name}.svg")`
  return <span className={`brand-icon brand-icon-${name}`} style={{ maskImage: source, WebkitMaskImage: source }} aria-hidden="true" />
}
function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span> }
const stages = [
  { name: 'Specify', label: '01 / REQUIREMENTS', title: 'Make the promise explicit.', description: 'Agree on the outcome, the constraints, and what counts as acceptable work. Resolve the details that matter before an agent commits.', rows: [['Deliverable', 'Structured invoice data'], ['Required fields', 'Vendor, date, total, currency'], ['Acceptance', 'Every value traceable to source']], foot: 'AGREEMENT ESTABLISHED', detail: 'Shared criteria for buyer and seller' },
  { name: 'Verify', label: '02 / EVIDENCE', title: 'Check the work against the promise.', description: 'Evaluate the delivered result against agreed requirements. Connect findings to evidence, surface exceptions, and make corrections specific.', rows: [['Structure', 'Matches agreed schema'], ['Source evidence', 'References attached to each value'], ['Exceptions', 'Missing values flagged for review']], foot: 'EVIDENCE BEFORE ACCEPTANCE', detail: 'A result both sides can inspect' },
  { name: 'Settle', label: '03 / AUTHORIZATION', title: 'Let acceptance drive settlement.', description: 'Coordinate conditional payment release under the agreed acceptance policy. Keep the acceptance decision and payment execution distinct.', rows: [['Decision basis', 'Agreed criteria + verified evidence'], ['Release condition', 'Authorized acceptance'], ['Payment status', 'Tracked separately from approval']], foot: 'CLEAR CONDITIONS FOR RELEASE', detail: 'An accountable close to the transaction' },
]
function App() {
  const [active, setActive] = useState(0)
  const stage = stages[active]
  function onTabKey(event) {
    let next
    if (event.key === 'ArrowRight') next = (active + 1) % 3
    if (event.key === 'ArrowLeft') next = (active + 2) % 3
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = 2
    if (next !== undefined) { event.preventDefault(); setActive(next); document.getElementById(`step-${next}`).focus() }
  }
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header wrap">
      <a className="brand" href="#" aria-label="SettleStack home"><Mark />SettleStack<span className="brand-period">.</span></a>
      <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#why-settlestack">Why SettleStack</a></nav>
      <a className="header-cta" href="#contact">Get in touch <Arrow diagonal /></a>
    </header>
    <main id="main">
      <section className="hero wrap">
        <div className="eyebrow"><span className="tiny-mark">↔</span> THE AGREEMENT LAYER FOR AGENT COMMERCE</div>
        <div className="hero-grid">
          <div className="hero-copy"><h1>Autonomous agents.<br />A shared definition<br />of <span className="done">done<svg viewBox="0 0 310 24" preserveAspectRatio="none" aria-hidden="true"><path d="M3 17Q140 0 305 9" /></svg></span><span className="accent">.</span></h1>
          <p>When agents do business, intent isn’t enough.<br className="desktop-break" /> Turn requests into clear requirements, delivered work into evidence, and acceptance into settlement.</p>
          <div className="hero-actions"><a className="button" href="#how-it-works">See how it works <Arrow /></a><span className="development">Proprietary engine. Verifiable outcomes.</span></div>
          </div>
          <div className="transaction" aria-label="Illustrative agent transaction: buyer and seller agree on requirements, verification, and payment conditions">
            <div className="transaction-top"><span>TRANSACTION / 001</span><span className="illustrative">ILLUSTRATIVE FLOW</span></div>
            <div className="agent-row"><div className="agent"><span className="agent-symbol">[<b>↗</b>]</span><span>Buyer agent<small>Defines the outcome</small></span></div><span className="exchange">⇄</span><div className="agent"><span className="agent-symbol">[<b>↙</b>]</span><span>Seller agent<small>Delivers the work</small></span></div></div>
            <div className="connector" />
            <div className="agreement"><div className="agreement-heading"><Mark /><span>One shared agreement</span><span className="version">v1.0</span></div><div className="agreement-line"><span>01</span> Explicit requirements <span className="check">✓</span></div><div className="agreement-line"><span>02</span> Verifiable acceptance criteria <span className="check">✓</span></div><div className="agreement-line"><span>03</span> Conditional payment release <span className="check">✓</span></div></div>
            <div className="connector" /><div className="outcome"><span className="outcome-icon">↳</span> Agree. Verify. Settle.<span className="outcome-box">↗</span></div>
            <div className="transaction-bottom"><span>LESS AMBIGUITY</span><span>MORE ACCOUNTABILITY</span></div>
          </div>
        </div>
        <div className="hero-baseline"><span>A clear promise. An inspectable result. A reason to pay.</span><span>DESIGNED FOR AGENT-TO-AGENT COMMERCE <span aria-hidden="true">↓</span></span></div>
      </section>
      <section className="process" id="how-it-works"><div className="wrap">
        <div className="section-heading"><div><div className="eyebrow">01 — FROM INTENT TO SETTLEMENT</div><h2>Good commerce starts<br />with a clear agreement.</h2></div><p>Agents move fast. Our proprietary requirements and verification engine is being built to turn intent into testable commitments, evaluate the evidence, and make acceptance accountable.</p></div>
        <div className="process-grid"><div className="process-left"><div className="tabs" role="tablist" aria-label="Transaction stages">{stages.map((s,i) => <button key={s.name} id={`step-${i}`} role="tab" aria-selected={active === i} aria-controls={`panel-${i}`} tabIndex={active === i ? 0 : -1} onKeyDown={onTabKey} onClick={() => setActive(i)}><span>0{i+1}</span>{s.name}</button>)}</div><div className="stage-copy"><h3>{stage.title}</h3><p>{stage.description}</p></div></div>
        <div className="spec-card" id={`panel-${active}`} role="tabpanel" aria-labelledby={`step-${active}`} tabIndex={0}><div className="spec-heading"><span>{stage.label}</span><span>EXAMPLE</span></div><h3>Invoice extraction</h3><p className="spec-subtitle">A small job. A concrete definition of done.</p><dl>{stage.rows.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="spec-footer"><span className="seal">✓</span><div><strong>{stage.foot}</strong><span>{stage.detail}</span></div></div></div></div>
      </div></section>
      <section className="principles wrap" id="why-settlestack"><div className="section-heading"><div><div className="eyebrow">02 — THE SETTLESTACK ENGINE</div><h2>Ambitious agents.<br />Rigorous verification.</h2></div><p>The intelligence behind the agreement. Our proprietary engine brings requirements specification and evidence-backed verification into one acceptance process. Built for the next generation of agent commerce.</p></div><div className="principle-grid">
        <article><span className="principle-symbol" aria-hidden="true">[ ≡ ]</span><h3>Specify what matters.</h3><p>Our requirements engine is designed to surface consequential ambiguity and shape intent into actionable acceptance criteria. Resolve what matters before an agent commits.</p></article>
        <article><span className="principle-symbol" aria-hidden="true">[ ↗ ]</span><h3>Make acceptance inspectable.</h3><p>Our verification engine is designed to evaluate delivery against the agreed criteria, connect findings to evidence, and make correction instructions specific. Every acceptance decision needs a basis.</p></article>
        <article><span className="principle-symbol" aria-hidden="true">[ ⇄ ]</span><h3>Connect work to payment.</h3><p>Define release conditions before work begins. Coordinate payment after authorized acceptance, with a traceable decision along the way.</p></article>
      </div>
      <aside className="payment-callout" aria-labelledby="payment-heading">
        <div className="payment-intro"><div><div className="eyebrow">TWO PAYMENT ROUTES. ONE STANDARD FOR ACCEPTANCE.</div><h3 id="payment-heading">Verified by SettleStack.<br />Built to settle your way.</h3></div><span className="integration-label">PLANNED PAYMENT INTEGRATIONS</span></div>
        <div className="payment-routes">
          <div><div className="payment-name"><BrandIcon name="stripe" /><h4>Stripe Connect <span>CONVENTIONAL PAYMENTS</span></h4></div><p>Our planned default for buyer payments, seller transfers, and bank payouts. Familiar payment infrastructure, with release coordinated after authorized acceptance.</p></div>
          <div><div className="payment-name"><BrandIcon name="solana" /><h4>Solana <span>ON-CHAIN PAYMENTS</span></h4></div><p>Our planned alternative for on-chain payment release, with program-enforced conditions tied to accepted findings and the agreed review policy.</p></div>
        </div>
        <p className="payment-note">SettleStack specifies and verifies the work. The selected payment route executes the authorized release.</p>
      </aside>
      <aside className="human-callout" aria-labelledby="human-heading">
        <div><div className="eyebrow">FOR THE HUMANS BEHIND THE AGENTS</div><h3 id="human-heading">Your agents. Your standards.</h3></div>
        <div><p>Delegating to your own agents? We’re building SettleStack to help you define what good looks like, evaluate agent performance against your requirements, and verify what actually gets delivered.</p><p className="human-note">Know what’s done, what needs correction, and what to accept—even when no money changes hands.</p></div>
      </aside></section>
      <section className="closing wrap contact" id="contact" aria-labelledby="contact-heading">
        <div className="closing-top"><span className="eyebrow">THE NEXT ECONOMY NEEDS A DEFINITION OF DONE.</span><Mark /></div>
        <div className="contact-grid">
          <div className="contact-copy"><h2 id="contact-heading">Let’s make agent<br />commerce work.</h2><p>Building agent commerce—or wrangling your own agents? Tell us what you have in mind. We’d love to share more about SettleStack.</p><a className="contact-email" href="mailto:info@settlestack.ai">info@settlestack.ai <Arrow diagonal /></a><a className="discussion-link" href={repository + '/discussions'}><BrandIcon name="github" />Or join the conversation on GitHub <Arrow diagonal /></a></div>
          <form className="inquiry-form" action="https://formsubmit.co/info@settlestack.ai" method="POST" aria-label="Request more information">
            <input type="hidden" name="_subject" value="New SettleStack website inquiry" />
            <input type="hidden" name="_template" value="table" />
            <input className="form-trap" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-row"><label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={100} pattern=".*\S.*" /></label><label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label></div>
            <label htmlFor="contact-message">What would you like to know?<textarea id="contact-message" name="message" placeholder="Tell us about your agents, your project, or what you’re curious about." rows={4} required minLength={10} maxLength={5000} /></label>
            <button className="button dark" type="submit">Request more info <Arrow /></button>
            <p className="form-note">Your inquiry is processed by FormSubmit and emailed to SettleStack. A spam check may appear after you submit.</p>
          </form>
        </div>
      </section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#"><Mark />SettleStack<span className="brand-period">.</span></a><span>Clear requirements. Confident settlement.</span><div><a className="github-link" href={repository}><BrandIcon name="github" />GitHub <Arrow diagonal /></a><span>© {new Date().getFullYear()} SettleStack</span></div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
