import React, { useEffect, useRef, useState } from "react";
import "./squareSliderCard.css";

/* The loan offer panel on the Square cover, rebuilt over the still so its slider
   can move. A seller drags the amount down, back up partway, then to the full
   $10,000 offer, and every figure follows it the way the panel works: the fee is
   10% of the deposit, the total is the deposit plus the fee, and the monthly
   payment is the total over 12 months ($11,000 / 12 = $916.66 at the top, as in
   the still). It plays while the card is on screen; reduced motion shows the
   still's $10,000 offer. */

const MIN = 500;
const MAX = 10000;

// Each beat: drag to `to` over `ms`, then rest for `hold`.
const BEATS = [
  { to: 2500, ms: 1300, hold: 700 },
  { to: 6500, ms: 1100, hold: 600 },
  { to: MAX, ms: 1000, hold: 2200 },
];

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const money = (n, cents = true) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });

export default function SquareSliderCard() {
  const ref = useRef(null);
  const [value, setValue] = useState(MAX);
  const [dragging, setDragging] = useState(false);
  const [scale, setScale] = useState(0);

  // Scale the panel, laid out at the still's 282px, to the tile.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 282));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let raf = 0;
    let visible = false;
    let beat = 0;
    let from = MAX;
    let start = 0;

    const tick = (now) => {
      if (!start) start = now;
      const b = BEATS[beat];
      const t = now - start;
      if (t < b.ms) {
        const v = from + (b.to - from) * easeInOut(t / b.ms);
        setValue(Math.round(v / 100) * 100);
        setDragging(true);
      } else {
        setValue(b.to);
        setDragging(false);
        if (t >= b.ms + b.hold) {
          from = b.to;
          beat = (beat + 1) % BEATS.length;
          start = now;
        }
      }
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
  }, []);

  const pct = ((value - MIN) / (MAX - MIN)) * 100;
  const fee = value * 0.1;
  const total = value + fee;
  const monthly = Math.floor((total / 12) * 100) / 100;

  const rows = [
    ["Deposit amount", money(value)],
    ["Loan fee", money(fee)],
    ["Total owed", money(total)],
    ["Repayment period", "12 months"],
    ["Monthly payment", money(monthly)],
  ];

  return (
    <div ref={ref} className="sq-offer" aria-hidden="true">
      <div className="sq-panel" style={{ transform: `scale(${scale})` }}>
      <p className="sq-amount">{money(value, false)}</p>

      <div className="sq-slider">
        <span className="sq-track" />
        <span className="sq-fill" style={{ transform: `scaleX(${pct / 100})` }} />
        <span className={`sq-thumb${dragging ? " is-dragging" : ""}`} style={{ left: `${pct}%` }} />
      </div>
      <div className="sq-range">
        <span>$500</span>
        <span>$10,000</span>
      </div>

      <dl className="sq-rows">
        {rows.map(([label, val]) => (
          <div className="sq-row" key={label}>
            <dt>{label}</dt>
            <dd>{val}</dd>
          </div>
        ))}
      </dl>

      <span className="sq-button">Select {money(value, false)}</span>
      </div>
    </div>
  );
}
