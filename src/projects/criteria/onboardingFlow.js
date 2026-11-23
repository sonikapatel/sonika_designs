import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Rail, ProjectCard, useFitScale, SCREEN_W, SCREEN_H } from "./careerHistory";
import { SCRIPT, PROJECT, Typing } from "./checkInFlow";
import { PREP_POINTS } from "./solutionConcepts";
import "./criteria.css";
import "./checkInFlow.css";
import "./onboardingFlow.css";

/* A proposed next version of Check-Ins admin onboarding, playing in the case study
   as a video prototype: it runs itself on a loop, nothing to click. It was not shipped. It applies "The first 30 seconds: how to show value
   in AI product onboarding" (UX Collective) to the shipped steps:

   1. Your goal      one purposeful question that shapes the rest, and the org
                     filled in from the HRIS instead of typed in
   2. Pilot team     start with one team; preview the first question Bo will ask it
   3. Who sees what  the insight each level of the org gets, with a sample of each;
                     access follows the HRIS org chart (the shipped "Who receives
                     insights" step, shown as outcomes instead of permissions)
   4. Try it         the admin answers a check-in themselves
   5. Launch         their own answers come back as the manager's 1:1 brief, then launch

   It sits in the shipped setup dashboard: the nav rail, the "Hi Amy" greeting over
   the page title with its progress ring, and the "Check-Ins Setup" panel on the
   right, whose rows tick off as steps complete. Under the rows is a promise that
   updates as the admin answers, so each step gives something back. The org is a sample (Nucleus HQ, from the lo-fi directions);
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

/* What each level of the organization gets from the same check-ins, as in the
   proposed system earlier in the case study. Access is inherited from the HRIS org
   chart: a leader's digest covers every team that rolls up to them. */
const LEVELS = [
  {
    id: "ic",
    role: "Employees",
    title: "Career History",
    body: "Each check-in adds their projects and shout-outs to a record they own.",
  },
  {
    id: "manager",
    role: "Managers",
    title: "1:1 prep",
    body: "Talking points for each direct report before their 1:1, each with the reason behind it from their check-ins.",
  },
  {
    id: "leader",
    role: "Leaders",
    title: "Weekly digest",
    body: "Org health, team health, burnout trends and the wins worth celebrating, for every team that rolls up to them. Never individual check-ins.",
  },
];

const STEPS = ["Your goal", "Pilot team", "Who sees what", "Try it", "Launch"];

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

/* The leader's weekly digest for the sample org: four tiles, each a rolled-up read
   with its last four weeks. Sample figures, like the rest of the sample org. */
const DIGEST = [
  { id: "org", label: "Org health", value: "Steady", note: `${ORG.name}, 6 teams`, trend: [62, 64, 63, 65], tone: "neutral" },
  { id: "burnout", label: "Burnout signals", value: "Rising on Sales", note: "Skipped check-ins, 3 weeks", trend: [20, 26, 31, 38], tone: "warn" },
  { id: "celebrate", label: "Worth celebrating", value: "27 projects shipped", note: "18 shout-outs this week", trend: [18, 21, 24, 27], tone: "good" },
];

const TEAM_HEALTH = [
  { team: "Customer Success", dir: "Improving", arrow: "↑", tone: "good" },
  { team: "Product Design", dir: "Steady", arrow: "→", tone: "neutral" },
  { team: "Sales", dir: "Dipping", arrow: "↓", tone: "warn" },
];

function Spark({ points, tone }) {
  const w = 64;
  const h = 20;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const y = (v) => h - 2 - ((v - min) / (max - min || 1)) * (h - 4);
  const d = points.map((v, i) => `${(i * w) / (points.length - 1)},${y(v)}`).join(" ");
  return (
    <svg className={`ob-spark is-${tone}`} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={d} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Digest() {
  const [org, burnout, celebrate] = DIGEST;
  const tile = (t) => (
    <div key={t.id} className={`ob-tile is-${t.tone}`}>
      <p className="ob-tile-label">{t.label}</p>
      <div className="ob-tile-row">
        <p className="ob-tile-value">{t.value}</p>
        <Spark points={t.trend} tone={t.tone} />
      </div>
      <p className="ob-tile-note">{t.note}</p>
    </div>
  );
  return (
    <div className="ob-digest">
      <p className="ob-label">Weekly digest · {ORG.name} · last 4 weeks</p>
      <div className="ob-tiles">
        {tile(org)}
        <div className="ob-tile">
          <p className="ob-tile-label">Team health</p>
          <ul className="ob-teams">
            {TEAM_HEALTH.map((t) => (
              <li key={t.team}>
                {t.team}
                <span className={`ob-dir is-${t.tone}`}>
                  {t.arrow} {t.dir}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {tile(burnout)}
        {tile(celebrate)}
      </div>
    </div>
  );
}

function LevelsStep({ level, setLevel, seen, reduce }) {
  const l = LEVELS.find((x) => x.id === level);
  return (
    <>
      <p className="ob-q">What each level of your org gets</p>
      <p className="ob-help">
        The same check-ins become a different insight at each level. Access follows your org chart, so there’s
        nothing to set up by hand.
      </p>
      <div className="ob-levels" role="tablist" aria-label="Levels">
        {LEVELS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={level === x.id}
            className={`ob-level${level === x.id ? " is-on" : ""}`}
            onClick={() => setLevel(x.id)}
          >
            <span className="ob-level-role">
              {seen.includes(x.id) && <span className="ob-level-seen" aria-label="Reviewed">✓</span>}
              {x.role}
            </span>
            <span className="ob-level-title">{x.title}</span>
          </button>
        ))}
      </div>
      {l ? (
        <motion.div key={l.id} className="ob-preview ob-level-preview" role="tabpanel" {...fade(reduce)}>
          <p className="ob-help ob-level-body">{l.body}</p>
          {l.id === "ic" && (
            <div className="ob-sample-card">
              <ProjectCard project={PROJECT} still />
            </div>
          )}
          {/* The 1:1 prep from the case study's inbox concept (solutionConcepts.js). */}
          {l.id === "manager" && (
            <div className="ob-prep">
              <p className="ob-label">1:1 prep · Krishna Desai</p>
              <p className="ob-prep-title">Prepare for your next 1:1 with Krishna.</p>
              <p className="ob-tile-note">On par for a promotion in Q1 2026 · over the past 4 weeks</p>
              <ul className="ob-points">
                {PREP_POINTS.map((p) => (
                  <li key={p.text} className={p.tone === "warn" ? "is-warn" : undefined}>
                    <p className="ob-point-text">{p.text}</p>
                    <p className="ob-point-why">Why: {p.why}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {l.id === "leader" && <Digest />}
        </motion.div>
      ) : (
        <p className="ob-help ob-level-hint">Pick a level to see a sample of what they get.</p>
      )}
    </>
  );
}

function TryStep({ sent, draft, thinking, reduce }) {
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
        <div className="ob-log" ref={log}>
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
        <div className={`cf-input${draft ? " is-typing" : ""}`}>
          <span className={`cf-field ob-field${draft ? "" : " is-empty"}`}>
            {draft || (sent === TRY.length ? "Check-in complete" : "Type your response…")}
          </span>
          <span className="cf-send">↑</span>
        </div>
      </div>
    </>
  );
}

function LaunchStep({ team, launched, press, reduce }) {
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
        <span className={`ob-primary ob-launch${press ? " is-pressed" : ""}`}>Launch to {t.label}</span>
      )}
    </>
  );
}

/* ── Side panel: the journey, and what the admin has earned so far ── */

// The setup dashboard's progress ring.
function Ring({ pct }) {
  const R = 19;
  const C = 2 * Math.PI * R;
  return (
    <span className="ob-ring">
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} fill="none" stroke="#e3e5ee" strokeWidth="3.5" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
          transform="rotate(-90 24 24)"
        />
      </svg>
      <span>{pct}%</span>
    </span>
  );
}

function Journey({ step, done, goal, team, reduce }) {
  const g = GOALS.find((x) => x.id === goal);
  const t = TEAMS.find((x) => x.id === team);
  return (
    <aside className="ob-side">
      <p className="ob-side-title">
        <span className="ob-side-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </span>
        Check-Ins Setup
      </p>
      {/* One row per step, as in the shipped panel: a dash until it is done. */}
      <ol className="ob-journey">
        {STEPS.map((s, i) => {
          const state = done[i] ? "done" : i === step ? "on" : "todo";
          return (
            <li key={s} className={`ob-j is-${state}`}>
              {s}
              <span className="ob-j-dot" aria-hidden="true">
                {state === "done" ? "✓" : "—"}
              </span>
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
        {done[2] && (
          <motion.p className="ob-help" {...fade(reduce)}>
            Leaders see org and team health, burnout trends and wins, never individual check-ins.
          </motion.p>
        )}
      </div>
    </aside>
  );
}

/* ── The playback ──
   The flow plays itself like a video prototype: an admin picks a goal, imports the
   org, picks a pilot team, looks at what each level gets, answers a check-in and
   launches, then it starts over. Each beat is the state the screen should show and
   how long it holds; `type` beats type the next answer into the input instead.
   Later beats inherit everything set by earlier ones. */

const CHAR_MS = 22;

const BEATS = [
  { step: 0, ms: 1000 },
  { goal: "prep", ms: 900 },
  { sync: "syncing", ms: 1100 },
  { sync: "done", ms: 1600 },
  { press: true, ms: 300 },
  { step: 1, press: false, ms: 900 },
  { team: "cs", ms: 2200 },
  { press: true, ms: 300 },
  { step: 2, press: false, ms: 900 },
  { level: "ic", ms: 2600 },
  { level: "manager", ms: 4200 },
  { level: "leader", ms: 4400 },
  { press: true, ms: 300 },
  { step: 3, press: false, sent: 0, ms: 900 },
  { type: true },
  { sent: 1, thinking: true, ms: 750 },
  { thinking: false, ms: 600 },
  { type: true },
  { sent: 2, thinking: true, ms: 750 },
  { thinking: false, ms: 1300 },
  { press: true, ms: 300 },
  { step: 4, press: false, ms: 2600 },
  { press: true, ms: 300 },
  { launched: true, press: false, ms: 3200 },
  { out: true, ms: 500 },
];

const START = { step: 0, goal: null, sync: "idle", team: null, level: null, sent: 0, thinking: false, launched: false, press: false, out: false };

// The screen's state at each beat: the start, plus every beat up to it.
const FRAMES = BEATS.reduce((acc, beat) => {
  const prev = acc.length ? acc[acc.length - 1] : START;
  const { ms, type, ...set } = beat;
  acc.push({ ...prev, ...set, type: !!type, out: !!set.out, ms });
  return acc;
}, []);

// Reduced motion holds on the finished, launched setup.
const LAST = FRAMES.length - 2;

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

const noop = () => {};

export default function OnboardingFlow({ block }) {
  const fit = useRef(null);
  const scale = useFitScale(fit);
  const reduce = useReducedMotion();
  const inView = useInView(fit);

  const [beat, setBeat] = useState(0);
  const [typed, setTyped] = useState(0);
  const [run, setRun] = useState(0);

  // Step through the beats while the prototype is on screen.
  useEffect(() => {
    if (reduce || !inView) return undefined;
    const f = FRAMES[beat];
    if (f.type) {
      const reply = TRY[f.sent].reply;
      const t = setTimeout(
        () => {
          if (typed < reply.length) setTyped(typed + 1);
          else {
            setTyped(0);
            setBeat(beat + 1);
          }
        },
        typed < reply.length ? CHAR_MS : 450
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (beat === FRAMES.length - 1) {
        setBeat(0);
        setRun((r) => r + 1);
      } else setBeat(beat + 1);
    }, f.ms);
    return () => clearTimeout(t);
  }, [beat, typed, inView, reduce]);

  const f = FRAMES[reduce ? LAST : beat];
  const levelIndex = LEVELS.findIndex((l) => l.id === f.level);
  const seen = f.step > 2 ? LEVELS.map((l) => l.id) : LEVELS.slice(0, levelIndex + 1).map((l) => l.id);
  const done = [f.step > 0, f.step > 1, f.step > 2, f.step > 3, f.launched];
  const draft = f.type ? TRY[f.sent].reply.slice(0, typed) : "";
  const progress = Math.round((done.filter(Boolean).length / STEPS.length) * 100);

  return (
    <figure className="ch cf ob">
      <div className="cs-media-frame cf-frame">
        <div
          className={`ch-fit ob-video${f.out ? " is-out" : ""}`}
          ref={fit}
          style={{ height: SCREEN_H * scale }}
          aria-hidden="true"
        >
          <div
            className="ch-frame"
            style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
          >
            <Rail />
            <div className="ob-screen">
              <div className="ob-main">
                {/* The shipped setup dashboard's header: a greeting over the page title,
                    with a ring that fills as steps are completed. */}
                <div className="ob-titlebar">
                  <div>
                    <p className="ob-hi">Hi Amy,</p>
                    <p className="ch-title">
                      {progress === 0 ? "Start setting up Check-Ins" : "Continue setting up Check-Ins"}
                    </p>
                  </div>
                  <div className="ob-titlebar-end">
                    <span className="ob-sample">Sample org · {ORG.name}</span>
                    <Ring pct={progress} />
                  </div>
                </div>

                <motion.div key={`${run}-${f.step}`} className="ob-card" {...fade(reduce)}>
                  <p className="ob-stepnum">
                    Step {f.step + 1} of {STEPS.length}
                  </p>
                  {f.step === 0 && (
                    <GoalStep
                      goal={f.goal}
                      setGoal={noop}
                      synced={f.sync === "done"}
                      sync={noop}
                      syncing={f.sync === "syncing"}
                      reduce={reduce}
                    />
                  )}
                  {f.step === 1 && <TeamStep team={f.team} setTeam={noop} reduce={reduce} />}
                  {f.step === 2 && <LevelsStep level={f.level} setLevel={noop} seen={seen} reduce={reduce} />}
                  {f.step === 3 && <TryStep sent={f.sent} draft={draft} thinking={f.thinking} reduce={reduce} />}
                  {f.step === 4 && <LaunchStep team={f.team} launched={f.launched} press={f.press} reduce={reduce} />}

                  {f.step < STEPS.length - 1 && (
                    <div className="ob-foot">
                      {f.step < 3 ? (
                        <span className="ob-skip">Skip, use recommended {["setup", "team", "access"][f.step]}</span>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`ob-primary${done[f.step] ? "" : " is-disabled"}${f.press ? " is-pressed" : ""}`}
                      >
                        Continue
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>

              <Journey step={f.step} done={done} goal={f.goal} team={f.team} reduce={reduce} />
            </div>
          </div>
        </div>
      </div>
      {block?.caption && <figcaption className="cs-media-caption">{block.caption}</figcaption>}
    </figure>
  );
}
