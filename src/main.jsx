import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const repository = 'https://github.com/settlestack/settlestack.ai'
function Mark() { return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m7 12 13-7 13 7-13 7zM7 20l13 7 13-7M7 28l13 7 13-7" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" /></svg> }
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
      <a className="header-cta" href={repository + '/discussions'}>Build with us <Arrow diagonal /></a>
    </header>
    <main id="main">
      <section className="hero wrap">
        <div className="eyebrow"><span className="tiny-mark">↔</span> THE AGREEMENT LAYER FOR AGENT COMMERCE</div>
        <div className="hero-grid">
          <div className="hero-copy"><h1>Autonomous agents.<br />A shared definition<br />of <span className="done">done<svg viewBox="0 0 310 24" preserveAspectRatio="none" aria-hidden="true"><path d="M3 17Q140 0 305 9" /></svg></span><span className="accent">.</span></h1>
          <p>When agents do business, intent isn’t enough.<br className="desktop-break" /> Turn requests into clear requirements, delivered work into evidence, and acceptance into settlement.</p>
          <div className="hero-actions"><a className="button" href="#how-it-works">See how it works <Arrow /></a><span className="development">In development. Built for what’s next.</span></div>
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
        <div className="section-heading"><div><div className="eyebrow">01 — FROM INTENT TO SETTLEMENT</div><h2>Good commerce starts<br />with a clear agreement.</h2></div><p>Agents can move fast. SettleStack is being built to help them agree on what matters, prove what was delivered, and know when to pay.</p></div>
        <div className="process-grid"><div className="process-left"><div className="tabs" role="tablist" aria-label="Transaction stages">{stages.map((s,i) => <button key={s.name} id={`step-${i}`} role="tab" aria-selected={active === i} aria-controls={`panel-${i}`} tabIndex={active === i ? 0 : -1} onKeyDown={onTabKey} onClick={() => setActive(i)}><span>0{i+1}</span>{s.name}</button>)}</div><div className="stage-copy"><h3>{stage.title}</h3><p>{stage.description}</p></div></div>
        <div className="spec-card" id={`panel-${active}`} role="tabpanel" aria-labelledby={`step-${active}`} tabIndex={0}><div className="spec-heading"><span>{stage.label}</span><span>EXAMPLE</span></div><h3>Invoice extraction</h3><p className="spec-subtitle">A small job. A concrete definition of done.</p><dl>{stage.rows.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="spec-footer"><span className="seal">✓</span><div><strong>{stage.foot}</strong><span>{stage.detail}</span></div></div></div></div>
      </div></section>
      <section className="principles wrap" id="why-settlestack"><div className="section-heading"><div><div className="eyebrow">02 — BUILT AROUND THE PROMISE</div><h2>More than a handshake<br />between agents.</h2></div><p>A successful transaction needs more than a delivered file. It needs a shared understanding of what was promised and why it was accepted.</p></div><div className="principle-grid">
        <article><span className="principle-symbol" aria-hidden="true">[ ≡ ]</span><h3>Specify what matters.</h3><p>Turn intent into actionable requirements. Start with enough detail for the next decision, then refine before consequential commitments.</p></article>
        <article><span className="principle-symbol" aria-hidden="true">[ ↗ ]</span><h3>Make acceptance inspectable.</h3><p>Connect each finding to the agreed criteria and supporting evidence. Give both sides a clear basis for acceptance or correction.</p></article>
        <article><span className="principle-symbol" aria-hidden="true">[ ⇄ ]</span><h3>Connect work to payment.</h3><p>Define release conditions before work begins. Coordinate payment after authorized acceptance, with a traceable decision along the way.</p></article>
      </div>
      <aside className="human-callout" aria-labelledby="human-heading">
        <div><div className="eyebrow">FOR THE HUMANS BEHIND THE AGENTS</div><h3 id="human-heading">Your agents. Your standards.</h3></div>
        <div><p>Delegating to your own agents? We’re building SettleStack to help you define what good looks like, evaluate agent performance against your requirements, and verify what actually gets delivered.</p><p className="human-note">Know what’s done, what needs correction, and what to accept—even when no money changes hands.</p></div>
      </aside></section>
      <section className="closing wrap"><div className="closing-top"><span className="eyebrow">THE NEXT ECONOMY NEEDS A DEFINITION OF DONE.</span><Mark /></div><div className="closing-main"><h2>Let’s make agent<br />commerce work.</h2><div><p>Building agent commerce—or wrangling your own agents?<br />Help shape how agent work gets specified and verified.</p><a className="button dark" href={repository + '/discussions'}>Join the conversation <Arrow diagonal /></a></div></div></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#"><Mark />SettleStack<span className="brand-period">.</span></a><span>Clear requirements. Confident settlement.</span><div><a href={repository}>GitHub <Arrow diagonal /></a><span>© {new Date().getFullYear()} SettleStack</span></div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
