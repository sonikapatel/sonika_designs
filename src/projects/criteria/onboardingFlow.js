import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Rail, useFitScale, SCREEN_W, SCREEN_H } from "./careerHistory";
import { SCRIPT, Typing } from "./checkInFlow";
import "./criteria.css";
import "./checkInFlow.css";
import "./onboardingFlow.css";

/* A proposed next version of Check-Ins admin onboarding, playable in the case
   study. It was not shipped. It applies "The first 30 seconds: how to show value
   in AI product onboarding" (UX Collective) to the four shipped steps:

   1. Your goal      one purposeful question that shapes the rest, and the org
                     filled in from the HRIS instead of typed in
   2. Pilot team     start with one team; preview the first question Bo will ask it
   3. Try it         the admin answers a check-in themselves
   4. Launch         their own answers come back as the manager's 1:1 brief, then launch

   The panel on the right is the shipped "Onboarding Journey" side panel, with a
   promise underneath that updates as the admin answers, so each step gives
   something back. The org is a sample (Nucleus HQ, from the lo-fi directions);
   the check-in answers are the same as the Coach Bo check-in further down. */

const ORG = { name: "Nucleus HQ", people: 186, managers: 21 };

const GOALS = [
  {
    id: "prep",
    label: "Prep for 1:1s",
    promise: "Every manager gets a 1:1 prep brief on Monday morning.",
  },
  {
    id: "pulse",
    label: "Keep a pulse on engagement",
    promise: "Leaders get a weekly digest of how each team is feeling.",
  },
  {
    id: "blockers",
    label: "Spot blockers early",
    promise: "Managers see blockers the same week they come up.",
  },
];

// Bo opens each team's check-in with a role-specific question.
const TEAMS = [
  { id: "cs", label: "Customer Success", people: 14, question: "How did renewals and ARR move this week?" },
  { id: "sales", label: "Sales", people: 12, question: "How did pipeline and ARR move this week?" },
  { id: "design", label: "Product Design", people: 9, question: "What did you finish or hand off this week?" },
];

const STEPS = ["Your goal", "Pilot team", "Try it", "Launch"];

// The admin's own check-in: two of the Coach Bo check-in's questions.
const TRY = [SCRIPT[0], SCRIPT[2]];

function fade(reduce, delay = 0) {
  return {
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduce ? 0 : delay, duration: 0.3 },
  };
}

/* ── Steps ── */

function GoalStep({ goal, setGoal, synced, sync, syncing, reduce }) {
  return (
    <>
      <p className="ob-q">What should Check-Ins help with first?</p>
      <p className="ob-help">We’ll set up the rest around your answer. You can add more later.</p>
      <div className="ob-options" role="radiogroup" aria-label="Goal">
        {GOALS.map((g) => (
          <button
            key={g.id}
            type="button"
            role="radio"
            aria-checked={goal === g.id}
            className={`ob-option${goal === g.id ? " is-on" : ""}`}
            onClick={() => setGoal(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <p className="ob-q ob-q--second">Bring in your org</p>
      {synced ? (
        <motion.div className="ob-synced" {...fade(reduce)}>
          <span className="ob-check" aria-hidden="true">✓</span>
          <div>
            <p className="ob-synced-title">{ORG.name} imported from your HRIS</p>
            <p className="ob-help">
              {ORG.people} people · {ORG.managers} managers · reporting lines mapped
            </p>
          </div>
        </motion.div>
      ) : (
        <button type="button" className="ob-connect" onClick={sync} disabled={syncing}>
          {syncing ? "Importing people and reporting lines…" : "Connect your HRIS"}
        </button>
      )}
    </>
  );
}

function TeamStep({ team, setTeam, reduce }) {
  const t = TEAMS.find((x) => x.id === team);
  return (
    <>
      <p className="ob-q">Which team should try Check-Ins first?</p>
      <p className="ob-help">Start with one team, see how it lands, then roll out to everyone.</p>
      <div className="ob-options" role="radiogroup" aria-label="Pilot team">
        {TEAMS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="radio"
            aria-checked={team === x.id}
            className={`ob-option${team === x.id ? " is-on" : ""}`}
            onClick={() => setTeam(x.id)}
          >
            {x.label} <span className="ob-count">{x.people}</span>
          </button>
        ))}
      </div>
      {t && (
        <motion.div key={t.id} className="ob-preview" {...fade(reduce)}>
          <p className="ob-label">Bo’s first question for {t.label}</p>
          <p className="cf-bo">{t.question}</p>
        </motion.div>
      )}
    </>
  );
}

function TryStep({ sent, send, thinking, reduce }) {
  const log = useRef(null);
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [sent, thinking, reduce]);

  const step = TRY[sent];
  const ready = step && !thinking;
  return (
    <>
      <p className="ob-q">Try a check-in yourself</p>
      <p className="ob-help">Answer the way your team will. Your answers become the brief in the next step.</p>
      <div className="ob-chat">
        <div className="ob-log" ref={log} aria-live="polite">
          {TRY.slice(0, sent).map((s) => (
            <React.Fragment key={s.reply}>
              <p className="cf-bo">{s.bo[s.bo.length - 1]}</p>
              <p className="cf-me">{s.reply}</p>
            </React.Fragment>
          ))}
          {ready && (
            <motion.p key={sent} className="cf-bo" {...fade(reduce)}>
              {step.bo[step.bo.length - 1]}
            </motion.p>
          )}
          {thinking && <Typing />}
          {sent === TRY.length && !thinking && (
            <motion.p className="cf-bo" {...fade(reduce)}>
              Thanks! That’s everything for this week.
            </motion.p>
          )}
        </div>
        <form
          className={`cf-input${ready ? " is-typing" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (ready) send();
          }}
        >
          <input
            className="cf-field"
            readOnly
            value={ready ? step.reply : ""}
            placeholder={sent === TRY.length ? "Check-in complete" : "Type your response…"}
            aria-label="Your response"
          />
          <button type="submit" className="cf-send" aria-label="Send" disabled={!ready}>
            ↑
          </button>
        </form>
      </div>
    </>
  );
}

function LaunchStep({ team, launched, launch, reduce }) {
  const t = TEAMS.find((x) => x.id === team) || TEAMS[0];
  return (
    <>
      <p className="ob-q">Here’s what your manager gets from your check-in</p>
      <motion.div className="ob-brief" {...fade(reduce)}>
        <p className="ob-label">Monday 1:1 prep · built from your answers</p>
        <ul>
          <li>
            <span>Win to recognize</span>Finished the Coach Bo onboarding requirements
          </li>
          <li>
            <span>Shout-out</span>Aiyu Chen helped pressure-test them with engineering
          </li>
          <li>
            <span>Feeling</span>Good, and ready to move on to design systems scaling
          </li>
        </ul>
      </motion.div>
      {launched ? (
        <motion.div className="ob-synced ob-launched" {...fade(reduce)}>
          <span className="ob-check" aria-hidden="true">✓</span>
          <div>
            <p className="ob-synced-title">Check-Ins is live for {t.label}</p>
            <p className="ob-help">
              Their first check-in goes out Monday to {t.people} people. Roll out to everyone when you’re ready.
            </p>
          </div>
        </motion.div>
      ) : (
        <button type="button" className="ob-primary ob-launch" onClick={launch}>
          Launch to {t.label}
        </button>
      )}
    </>
  );
}

/* ── Side panel: the journey, and what the admin has earned so far ── */

function Journey({ step, done, goal, team, reduce }) {
  const g = GOALS.find((x) => x.id === goal);
  const t = TEAMS.find((x) => x.id === team);
  return (
    <aside className="ob-side">
      <p className="ob-side-title">Onboarding Journey</p>
      <ol className="ob-journey">
        {STEPS.map((s, i) => {
          const state = done[i] ? "done" : i === step ? "on" : "todo";
          return (
            <li key={s} className={`ob-j is-${state}`}>
              <span className="ob-j-dot" aria-hidden="true">
                {state === "done" ? "✓" : i + 1}
              </span>
              {s}
            </li>
          );
        })}
      </ol>

      <div className="ob-promise">
        <p className="ob-label">What you’ll get</p>
        {g ? (
          <motion.p key={g.id} className="ob-promise-text" {...fade(reduce)}>
            {g.promise}
          </motion.p>
        ) : (
          <p className="ob-promise-text is-empty">Pick a goal to see what Check-Ins will do for you.</p>
        )}
        {t && (
          <motion.p key={t.id} className="ob-help" {...fade(reduce)}>
            Starting with {t.label}, {t.people} people.
          </motion.p>
        )}
      </div>
    </aside>
  );
}

export default function OnboardingFlow({ block }) {
  const fit = useRef(null);
  const scale = useFitScale(fit);
  const reduce = useReducedMotion();
  const timer = useRef(null);

  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [synced, setSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [team, setTeam] = useState(null);
  const [sent, setSent] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const done = [goal && synced, !!team, sent === TRY.length, launched];
  const canNext = done[step] && step < STEPS.length - 1;

  const sync = () => {
    setSyncing(true);
    timer.current = setTimeout(() => {
      setSyncing(false);
      setSynced(true);
    }, reduce ? 0 : 900);
  };

  const send = () => {
    setSent((n) => n + 1);
    setThinking(true);
    timer.current = setTimeout(() => setThinking(false), reduce ? 0 : 750);
  };

  // The defaults a recommended setup would pick, so the admin can jump ahead.
  const applyDefaults = () => {
    if (step === 0) {
      setGoal(goal || "prep");
      setSynced(true);
    }
    if (step === 1) setTeam(team || "design");
    setStep(step + 1);
  };

  const restart = () => {
    clearTimeout(timer.current);
    setStep(0);
    setGoal(null);
    setSynced(false);
    setSyncing(false);
    setTeam(null);
    setSent(0);
    setThinking(false);
    setLaunched(false);
    setRun((r) => r + 1);
  };

  return (
    <figure className="ch cf ob">
      <div className="cs-media-frame cf-frame">
        <div className="cf-bar">
          <ol className="cf-steps" aria-label="Onboarding steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && (
                  <li className="cf-arrow" aria-hidden="true">
                    →
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    className={`cf-step${step === i ? " is-on" : ""}`}
                    aria-current={step === i ? "step" : undefined}
                    disabled={i > 0 && !done.slice(0, i).every(Boolean)}
                    onClick={() => setStep(i)}
                  >
                    <span className="cf-num">{i + 1}</span> {s}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ol>
          {(goal || synced) && (
            <button type="button" className="cf-replay" onClick={restart}>
              ↺ Start over
            </button>
          )}
        </div>

        <div className="ch-fit" ref={fit} style={{ height: SCREEN_H * scale }}>
          <div
            className="ch-frame"
            style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
          >
            <Rail />
            <div className="ob-screen">
              <div className="ob-main">
                <div className="ob-titlebar">
                  <p className="ch-title">Set up Weekly Check-Ins</p>
                  <span className="ob-sample">Sample org · {ORG.name}</span>
                </div>

                <motion.div key={`${run}-${step}`} className="ob-card" {...fade(reduce)}>
                  <p className="ob-stepnum">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  {step === 0 && (
                    <GoalStep
                      goal={goal}
                      setGoal={setGoal}
                      synced={synced}
                      sync={sync}
                      syncing={syncing}
                      reduce={reduce}
                    />
                  )}
                  {step === 1 && <TeamStep team={team} setTeam={setTeam} reduce={reduce} />}
                  {step === 2 && <TryStep sent={sent} send={send} thinking={thinking} reduce={reduce} />}
                  {step === 3 && (
                    <LaunchStep team={team} launched={launched} launch={() => setLaunched(true)} reduce={reduce} />
                  )}

                  {step < STEPS.length - 1 && (
                    <div className="ob-foot">
                      {step < 2 ? (
                        <button type="button" className="ob-skip" onClick={applyDefaults}>
                          Skip, use recommended {step === 0 ? "setup" : "team"}
                        </button>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        className="ob-primary"
                        disabled={!canNext}
                        onClick={() => setStep(step + 1)}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

              <Journey step={step} done={done} goal={goal} team={team} reduce={reduce} />
            </div>
          </div>
        </div>
      </div>
      {block?.caption && <figcaption className="cs-media-caption">{block.caption}</figcaption>}
    </figure>
  );
}
