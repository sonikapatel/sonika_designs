import React, { useEffect, useRef, useState } from "react";
import "./conceptDemos.css";

/* The three final concepts from the lending workshop, rebuilt from their Figma
   screens as desktop web pages in a 16:10 window. The pages themselves are static,
   every label and figure as on the screen in Figma. Only the prototype moves: the
   page scrolls down, a button is pressed, and the next page comes in. Each loops
   while it is on screen, and reduced motion shows the first page at rest. */

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const money = (n, cents = false) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });

// A looping clock in ms that only runs while the demo is on screen.
function useClock(period, rest) {
  const ref = useRef(null);
  const [t, setT] = useState(rest);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let raf = 0;
    let start = 0;
    let visible = false;
    const tick = (now) => {
      if (!start) start = now;
      setT((now - start) % period);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible) {
          visible = true;
          start = 0;
          raf = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [period]);

  return [ref, t];
}

// A value dragged through `beats` ({ at, ms, to }), starting from `from`.
function track(t, from, beats) {
  let v = from;
  for (const b of beats) {
    if (t < b.at) break;
    const p = Math.min(1, (t - b.at) / b.ms);
    v = v + (b.to - v) * easeInOut(p);
    if (p < 1) return { v, moving: true };
  }
  return { v, moving: false };
}

const on = (flag, cls = "is-on") => (flag ? ` ${cls}` : "");

function Slider({ pct }) {
  return (
    <div className="cd-slider">
      <span className="cd-track" />
      <span className="cd-fill" style={{ transform: `scaleX(${pct})` }} />
      <span className="cd-thumb" style={{ left: `${pct * 100}%` }} />
    </div>
  );
}

// One page of the prototype. `scroll` runs 0 (top) to 1 (bottom of the page).
function Page({ show, scroll = 0, className = "", children }) {
  return (
    <div className={`cd-page${on(show)}`}>
      <div
        className={`cd-scroll ${className}`}
        style={{ transform: `translateY(calc(${-scroll * 100}% + ${scroll * 40}em))` }}
      >
        {children}
      </div>
    </div>
  );
}

function Nav({ business }) {
  return (
    <div className="cd-nav">
      <span className="cd-nav-side">
        <span className="cd-burger" />
        Balance
      </span>
      <span className="cd-logo" />
      <span className="cd-nav-side cd-nav-side--end">{business}</span>
    </div>
  );
}

const within = (t, a, b) => t >= a && t < b;

/* ── 01 Business Financing options ── two offers side by side, then the offer page. */

const OFFERS = [
  {
    kind: "Daily sales",
    art: "/images/square/workshop/illustration-daily-sales.svg",
    select: "/images/square/workshop/select-daily.svg",
    rows: [
      ["Offer amount", "Up to $10,000", true],
      ["Cost", "One $1,400 loan fee"],
      ["Financing type", "One lump sum"],
      ["Repayment", "13% of your daily Square sales"],
      ["Minimum payment", "$628.00 every 60 days"],
      ["Best for", "Operating expenses, short-term cash flow"],
    ],
  },
  {
    kind: "Fixed monthly",
    art: "/images/square/workshop/illustration-fixed-monthly.svg",
    select: "/images/square/workshop/select-monthly.svg",
    rows: [
      ["Offer amount", "Up to $60,000", true],
      ["Cost", "One loan fee"],
      ["Financing type", "Revolving credit line"],
      ["Repayment", "Pay monthly from Chase •••234"],
      ["Minimum payment", "$628.00 every 60 days"],
      ["Best for", "Expanding locations, marketing costs, large equipment purchases"],
    ],
  },
];

export function FinancingOptionsDemo() {
  const PERIOD = 10400;
  const [ref, t] = useClock(PERIOD, 0);
  const offer = within(t, 4500, PERIOD - 450);
  // A page always arrives at its top: the one that was left resets once it is out
  // of sight, so the loop's return to the first page starts from the top too.
  const optionsScroll = t < 4800 ? track(t, 0, [{ at: 1200, ms: 1900, to: 1 }]).v : 0;
  const offerScroll = t < 4500 ? 0 : track(t, 0, [{ at: 5900, ms: 1500, to: 1 }]).v;

  return (
    <div className="cd" ref={ref} aria-hidden="true">
      <div className="cd-window">
        <Page show={!offer} scroll={optionsScroll} className="cd-options">
          <p className="cd-h">Explore your business financing options</p>
          <p className="cd-sub">
            Square Loans offers a variety of repayment options and offer sizes. Select an offer that
            works best for your business.
          </p>
          <div className="cd-cols">
            {OFFERS.map((o, c) => (
              <div className="cd-col" key={o.kind}>
                {/* The illustration and the loan type row, icon included, are the Figma
                    screen's own artwork. */}
                <img className="cd-art" src={o.art} alt="" />
                <img className="cd-kind" src={o.select} alt="" />
                {o.rows.map(([label, value, big]) => (
                  <div className="cd-row" key={label}>
                    <span className="cd-label">{label}</span>
                    <span className={big ? "cd-big" : "cd-value"}>{value}</span>
                  </div>
                ))}
                <span className={`cd-btn${on(c === 0 && within(t, 3800, 4500), "is-pressed")}`}>
                  See offer
                </span>
              </div>
            ))}
          </div>
        </Page>

        {/* See offer opens the Choose your loan offer page. */}
        <Page show={offer} scroll={offerScroll} className="cd-offer">
          <Nav business="Henry’s Hamdogs" />
          <div className="cd-subnav">
            <span className="cd-pill">← Loans</span>
            <span className="cd-mission">Mission ⌄</span>
            <span className="cd-pill">Help</span>
          </div>
          <p className="cd-offer-h">Choose your loan offer</p>
          <span className="cd-mission">See how it works →</span>
          <div className="cd-offer-card">
            <p className="cd-offer-amount">$10,000</p>
            <Slider pct={1} />
            <div className="cd-range">
              <span>$500</span>
              <span>$10,000</span>
            </div>
            <div className="cd-offer-rows">
              {[
                ["Deposit amount", "$10,000.00"],
                ["Loan fee", "$1,000.00"],
                ["Total owed", "$11,000.00"],
                ["Repayment method", "13% of daily sales"],
              ].map(([label, v]) => (
                <div className="cd-detail" key={label}>
                  <span className="cd-link">{label}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <span className={`cd-btn cd-offer-btn${on(within(t, 8600, 9300), "is-pressed")}`}>
              Select $10,000
            </span>
          </div>
        </Page>
      </div>
    </div>
  );
}

/* ── 02 Loan Recommendation Wizard ── three questions, then the recommendations. */

const CHIPS = [
  "Equipment",
  "Expansion",
  "Operating costs",
  "Unexpected expenses",
  "Renovation",
  "Debt consolidation",
  "Other",
];

const RECS = [
  {
    name: "Daily sales loan",
    recommended: true,
    cells: [
      ["Loan amount", "Up to $10,000"],
      ["Loan fee", "Up to $1,400"],
      ["Payback period", "6-12 months"],
    ],
    best: "Short term cash flow",
  },
  {
    name: "Fixed loans",
    cells: [
      ["Loan amount", "Up to $100,000"],
      ["Loan fee", "Up to $1,400"],
      ["Payback period", "6-12 months"],
    ],
    best: "Larger expenses, expansion",
  },
];

export function WizardDemo() {
  const PERIOD = 9600;
  const [ref, t] = useClock(PERIOD, 0);
  const recs = within(t, 3900, PERIOD - 450);
  const askScroll = t < 4200 ? track(t, 0, [{ at: 1200, ms: 1300, to: 1 }]).v : 0;
  const recsScroll = t < 3900 ? 0 : track(t, 0, [{ at: 5400, ms: 1300, to: 1 }]).v;

  return (
    <div className="cd" ref={ref} aria-hidden="true">
      <div className="cd-window">
        <span className="cd-progress">
          <span style={{ transform: `scaleX(${recs ? 0.8 : 0.25})` }} />
        </span>

        <Page show={!recs} scroll={askScroll} className="cd-step">
          <p className="cd-q">How much are you looking to borrow?</p>
          <p className="cd-amount">$15,000</p>
          <Slider pct={0.77} />
          <p className="cd-q">When are you looking for funding by?</p>
          <span className="cd-field">
            <span className="cd-label">Date</span>
            <span className="cd-field-value">1/1/21</span>
          </span>
          <p className="cd-q">What do you need financing for?</p>
          <div className="cd-chips">
            {CHIPS.map((c, i) => (
              <span className={`cd-chip${on(i < 2)}`} key={c}>
                {c}
              </span>
            ))}
          </div>
          <span className={`cd-btn${on(within(t, 3200, 3900), "is-pressed")}`}>Next</span>
        </Page>

        <Page show={recs} scroll={recsScroll} className="cd-step cd-step--recs">
          <p className="cd-q">Here’s our top recommendations.</p>
          <div className="cd-tags">
            {["$15,000", "Expansion", "Equipment"].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {RECS.map((r, i) => (
            <div className="cd-rec" key={r.name}>
              <div className="cd-rec-head">
                <span className="cd-rec-name">{r.name}</span>
                {r.recommended && <span className="cd-badge">Recommended</span>}
              </div>
              <div className="cd-rec-cells">
                {r.cells.map(([label, v]) => (
                  <span key={label}>
                    <span className="cd-label">{label}</span>
                    {v}
                  </span>
                ))}
              </div>
              <div className="cd-rec-foot">
                <span>
                  <span className="cd-label">Best for</span>
                  {r.best}
                </span>
                <span className={`cd-btn${on(i === 0 && within(t, 7700, 8400), "is-pressed")}`}>See offer</span>
              </div>
            </div>
          ))}
        </Page>
      </div>
    </div>
  );
}

/* ── 03 Real-time Loan offer comparison ── one page: both products and their details. */

const RANGE = [500, 15000];
const pctOf = (v) => (v - RANGE[0]) / (RANGE[1] - RANGE[0]);

export function RealtimeComparisonDemo() {
  const PERIOD = 8000;
  const [ref, t] = useClock(PERIOD, 0);
  const scroll = track(t, 0, [
    { at: 1400, ms: 1800, to: 1 },
    { at: 5600, ms: 1600, to: 0 },
  ]).v;

  const loanRows = [
    ["Deposit amount", "$10,000.00"],
    ["Loan fee", "$1,000.00"],
    ["Total owed", "$11,000.00"],
    ["Repayment period", "12 months"],
    ["Monthly payment", "$916.66"],
  ];
  const cardRows = [
    ["Credit limit", "$5,000.00"],
    ["APR", "16%"],
    ["Back as free processing", "1.5%"],
  ];

  return (
    <div className="cd" ref={ref} aria-hidden="true">
      <div className="cd-window">
        <Page show scroll={scroll}>
          <Nav business="Red Bay Coffee" />
          <div className="cd-compare">
            <p className="cd-title">Customize your business financing</p>
            <div className="cd-compare-grid">
              <div className="cd-products">
                {[
                  ["Square Loan", 10000, "Loan amount"],
                  ["Square Credit Card", 5000, "Credit limit"],
                ].map(([name, v, label]) => (
                  <div className="cd-product" key={name}>
                    <div className="cd-product-head">
                      <span className="cd-rec-name">{name}</span>
                      <span className="cd-btn cd-btn--sm">Select</span>
                    </div>
                    <p className="cd-amount">{money(v)}</p>
                    <span className="cd-label">{label}</span>
                    <Slider pct={pctOf(v)} />
                    <div className="cd-range">
                      <span>$500</span>
                      <span>$15,000</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cd-details">
                <p className="cd-rec-name">Loan details</p>
                {loanRows.map(([label, v]) => (
                  <div className="cd-detail" key={label}>
                    <span className="cd-link">{label}</span>
                    <span>{v}</span>
                  </div>
                ))}
                <span className="cd-rule" />
                <p className="cd-rec-name">Credit card details</p>
                {cardRows.map(([label, v]) => (
                  <div className="cd-detail" key={label}>
                    <span className="cd-link">{label}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Page>
      </div>
    </div>
  );
}
