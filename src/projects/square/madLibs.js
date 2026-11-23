import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { FinancingOptionsDemo, WizardDemo, RealtimeComparisonDemo } from "./conceptDemos";
import "./madLibs.css";

/* The lending workshop, rebuilt from the FigJam board (All Projects Outlined → Square).
   Groups filled in one sentence with sticky notes, one colour per blank:
     pink   what a seller first opens or sees
     yellow where they evaluate
     green  how they choose
     blue   how we communicate clear choice
   Each of the three final concepts is shown with the filled-in sentence it came from,
   then its concept card and the concept playing (conceptDemos.js). Sticky text is the workshop's
   own wording, with typos fixed and nothing added. */

const CONCEPTS = [
  {
    name: "Business Financing options",
    tone: "#dce5d2",
    summary:
      "Sellers can clearly see the value of both types of loans and how they’re paid back from a high level. Because they are pre-eligible for both in this product structure, they can see varying loan amounts and fees associated when selecting “See offer”.",
    notes: [
      "Two clear products with names on dashboard home as cards that also provide a line explanation. Flex Loan: pay per each day’s processing. Term Loan: pay monthly.",
      "A side by side comparison that has both max offers displayed in cards, with bullets under that describe characteristics like payment type, fees, etc.",
      "Select an offer next to a chart that displays simulated payments. It can have a “recommended offer” that is preset.",
      "Showing a short informative video (30 seconds): “You’re looking at a Flex Offer, here’s how payment works”.",
    ],
    Demo: FinancingOptionsDemo,
    alt: "Explore your business financing options: a daily sales loan and a fixed monthly loan compared side by side, each with a See offer button",
  },
  {
    name: "Loan Recommendation Wizard",
    tone: "#fdfbe9",
    summary:
      "Sellers can specify how much they’re looking for, by when and for what, so we can learn how loans are used. And based on their sales, we recommend the best loans product for them.",
    notes: [
      "Start with a pregenerated offer but have a CTA that offers them a chance to a guided set of questions that try to “generate” an offer that’s perfect for the customers.",
      "A series of questions they answer: What are you using this loan for? How much do you need? How would you like to pay?",
      "Displays the offer after the questions are answered, with the ability to tweak things like term length, offer amount, etc.",
      "Having them think about each component of the offer and letting them arrive at something they would actually convert on.",
    ],
    Demo: WizardDemo,
    alt: "A wizard asks how much the seller wants to borrow, when they need funding by and what it is for, then lists top recommendations with a daily sales loan marked Recommended",
  },
  {
    name: "Real-time Loan offer comparison",
    tone: "#a5bbc1",
    summary:
      "Sellers can adjust the amount they’re looking for, and see how loan variables for flex vs. term are affected.",
    notes: [
      "Their loan dashboard. Sellers are asked how much financing they need, that will simulate their loan options.",
      "Based on the amount they need: “these are the loan options you are eligible for for this amount”, and can choose a different amount.",
      "Comparing offers",
      "Having real-time comparisons of loan offers where the variables adjust based on amount selected.",
    ],
    Demo: RealtimeComparisonDemo,
    alt: "Customize your business financing: sliders for a Square Loan and a Square Credit Card with loan and credit card details updating beside them",
  },
];

const BLANKS = [
  { key: "pink", label: "What they see first", tilt: -3 },
  { key: "yellow", label: "Where they evaluate", tilt: 2 },
  { key: "green", label: "How they choose", tilt: -2 },
  { key: "blue", label: "How we make it clear", tilt: 3 },
];

// Seconds between one note landing and the next, and before the concept follows.
const STEP = 0.38;
const AFTER_NOTES = BLANKS.length * STEP + 0.25;

function Note({ i, text, play, still }) {
  const blank = BLANKS[i];
  return (
    <span className="ml-slot">
      <motion.span
        className={`ml-note ml-note--${blank.key}`}
        initial={still ? false : { opacity: 0, y: -36, rotate: blank.tilt * 4, scale: 1.12 }}
        animate={
          play || still
            ? { opacity: 1, y: 0, rotate: blank.tilt, scale: 1 }
            : { opacity: 0, y: -36, rotate: blank.tilt * 4, scale: 1.12 }
        }
        transition={{ type: "spring", duration: 0.6, bounce: 0.28, delay: still ? 0 : i * STEP }}
      >
        <span className="ml-note-label">{blank.label}</span>
        {text}
      </motion.span>
    </span>
  );
}

export default function MadLibs({ block }) {
  const ref = useRef(null);
  // The block is taller than a phone screen, so it plays once any of it is a fifth
  // of the way up the viewport, not once a share of it is visible.
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const still = useReducedMotion();
  const [index, setIndex] = useState(0);
  const concept = CONCEPTS[index];
  const play = inView;

  const reveal = (extra = 0) =>
    still
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 16 },
          animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: AFTER_NOTES + extra },
        };

  return (
    <div className="ml" ref={ref}>
      {(block.eyebrow || block.body) && (
        <div className="cs-v-default">
          {block.eyebrow && <p className="cs-eyebrow">{block.eyebrow}</p>}
          {block.body && <p className="cs-prose">{block.body}</p>}
        </div>
      )}

      <div className="ml-tabs" role="tablist" aria-label="Final concepts from the workshop">
        {CONCEPTS.map((c, i) => (
          <button
            key={c.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`ml-tab${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          >
            <span className="ml-tab-n">{`0${i + 1}`}</span>
            {c.name}
          </button>
        ))}
      </div>

      {/* Keyed by concept so the notes drop in again each time it changes. */}
      <div className="ml-stage" key={concept.name} role="tabpanel">
        <div className="ml-board">
          <p className="ml-kicker">The mad lib</p>
          <p className="ml-sentence">
            <span>By first opening or seeing</span>
            <span className="ml-group">
              <Note i={0} text={concept.notes[0]} play={play} still={still} />,
            </span>
            <span>sellers can evaluate in</span>
            <span className="ml-group">
              <Note i={1} text={concept.notes[1]} play={play} still={still} />.
            </span>
            <span className="ml-group">
              Then
              <Note i={2} text={concept.notes[2]} play={play} still={still} />
            </span>
            <span>a loan that works best for their business.</span>
            <span>In this experience, we will communicate clear choice by</span>
            <span className="ml-group">
              <Note i={3} text={concept.notes[3]} play={play} still={still} />.
            </span>
          </p>
        </div>

        <motion.div className="ml-concept" style={{ background: concept.tone }} {...reveal()}>
          <p className="ml-kicker">Final concept</p>
          <h3 className="ml-concept-name">{concept.name}</h3>
          <p className="ml-concept-summary">{concept.summary}</p>
        </motion.div>

        <motion.div className="ml-screens" role="img" aria-label={concept.alt} {...reveal(0.15)}>
          <concept.Demo />
        </motion.div>
      </div>

      {block.caption && <p className="cs-media-caption">{block.caption}</p>}
    </div>
  );
}
