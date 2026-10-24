import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import "./merchPreview.css";

/* "Preview experience" from the Learn more walkthrough: the sidebar from Figma
   (33:54656) with every report a Check-Ins user receives beside it. The 1:1 prep
   summary follows the Krishna screen; the email, team, senior manager and executive
   reports are illustrative content written for the demo, sharing its people. */

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M3 4.5h9a1.5 1.5 0 0 1 1.5 1.5v4.5A1.5 1.5 0 0 1 12 12H7l-3 2.5V12H3a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 3 4.5Z M15.5 8H17a1.5 1.5 0 0 1 1.5 1.5V14A1.5 1.5 0 0 1 17 15.5h-1V18l-3-2.5H9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 2.5 2.5 6.5 10 10.5l7.5-4L10 2.5Z M2.5 10 10 14l7.5-4 M2.5 13.5 10 17.5l7.5-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Reports ── */

function CheckInEmail() {
  return (
    <div className="mp-email">
      <div className="mp-email-meta">
        <p className="mp-email-subject">It’s time to check in with Bo</p>
        <p>
          <strong>Coach Bo</strong> &lt;bo@criteria.com&gt; · to Krishna Desai
        </p>
        <p className="mp-muted">Friday, 4:00 PM</p>
      </div>
      <div className="mp-email-body">
        <p>Hi Krishna,</p>
        <p>
          The week’s almost done. Take two minutes to tell Bo how it went: what you got done, what’s
          in your way and what’s next.
        </p>
        <span className="mp-btn">Check in with Bo</span>
        <p className="mp-muted">Takes about 2 minutes.</p>
      </div>
    </div>
  );
}

function CheckInChat() {
  return (
    <div className="mp-chat">
      <video
        src="/images/criteria/check_in_chat.mov"
        autoPlay
        loop
        muted
        playsInline
        aria-label="An employee's weekly check-in conversation with Coach Bo"
      />
    </div>
  );
}

// Energy over the past four weeks, rising into 11/8 before the dip.
const ENERGY = [
  [0, 70],
  [33, 48],
  [56, 78],
  [100, 58],
];

function EnergyChart() {
  const line = ENERGY.map(([x, y]) => `${x * 6.4},${y}`).join(" ");
  return (
    <div className="mp-chart">
      <svg viewBox="0 0 640 110" preserveAspectRatio="none" aria-hidden="true">
        <polygon points={`0,110 ${line} 640,110`} fill="#e4e7f8" />
        <polyline points={line} fill="none" stroke="#a9b1e6" strokeWidth="2" />
        <circle cx={33 * 6.4} cy="48" r="4" fill="#3f51c6" />
      </svg>
      <div className="mp-tip" role="note">
        <p className="mp-tip-title">Week of 11/10</p>
        <p className="mp-muted">Dip in Sentiment</p>
        <p>Check in with Krishna about lack of accountability on sales project with 3 clients.</p>
        <span className="mp-btn mp-btn--outline">View summary</span>
      </div>
      <div className="mp-axis" aria-hidden="true">
        <span>11/1</span>
        <span>11/8</span>
        <span>11/15</span>
        <span>11/22</span>
      </div>
    </div>
  );
}

function CheckInSummary() {
  return (
    <div className="mp-summary">
      <p className="mp-report-title">Prepare for your next 1:1 with Krishna.</p>
      <div className="mp-person">
        <div>
          <p className="mp-name">Krishna Desai</p>
          <p className="mp-small">On par for a promotion on Q1 2026</p>
        </div>
        <div className="mp-person-side">
          <p className="mp-small">Sales Manager</p>
          <p className="mp-status">On Track</p>
        </div>
      </div>

      <section className="mp-card">
        <p className="mp-card-title">Next week’s Goals</p>
        <p>Krishna is working on redefining the check-ins experience for Beta launch.</p>
        <p className="mp-label">BLOCKERS</p>
        <div className="mp-row">
          <p>Multiple dependencies for clearance</p>
          <span className="mp-link">More details</span>
        </div>
      </section>

      <section className="mp-card">
        <p className="mp-card-title">Energy Levels</p>
        <EnergyChart />
        <p className="mp-muted">Over the past 4 weeks</p>
        <p>
          Krishna is energized by clear strategic direction and meaningful team connections - both
          the product vision clarity and in-person team reconnection were important elements of a
          productive week.
        </p>
      </section>

      <section className="mp-card">
        <div className="mp-row">
          <p className="mp-card-title">Goals Tracking</p>
          <p className="mp-small">Product Designer → Senior Product Designer</p>
        </div>
        <div className="mp-goals">
          {[
            ["Design Systems", "Week of 11/1"],
            ["UX Research Study", "Week of 11/10"],
            ["Lead a Team Flex Meeting", "Week of 11/25"],
          ].map(([goal, week], i) => (
            <div key={goal} className={`mp-goal${i === 1 ? " is-on" : ""}`}>
              <p>{goal}</p>
              <div>
                <p className="mp-status">Completed</p>
                <p className="mp-small">{week}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mp-pair">
        <section className="mp-card">
          <p className="mp-card-title">Overall Motivators</p>
          <p>
            Krishna is energized by clear strategic direction and meaningful team connections - both
            the product vision clarity and in-person team reconnection were important elements of a
            productive week.
          </p>
        </section>
        <section className="mp-card">
          <p className="mp-card-title">Strengths Observed</p>
          <p>
            Strategic Planning - Tom’s detailed two-tier launch strategy demonstrates exceptional
            ability to balance immediate business needs with long term objectives while accounting
            for various stakeholder considerations.
          </p>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, note, tone }) {
  return (
    <div className="mp-metric">
      <p className="mp-small">{label}</p>
      <p className="mp-metric-value">{value}</p>
      {note && <p className={`mp-small mp-note${tone ? ` mp-note--${tone}` : ""}`}>{note}</p>}
    </div>
  );
}

const TEAM = [
  {
    name: "Krishna Desai",
    role: "Sales Manager",
    mood: "3.2",
    progress: "4.0",
    state: "Dip in sentiment",
    tone: "warn",
  },
  {
    name: "Tom Reyes",
    role: "Account Executive",
    mood: "4.6",
    progress: "4.4",
    state: "On track",
    tone: "good",
  },
  {
    name: "Angela Martin",
    role: "Sales Operations",
    mood: "4.2",
    progress: "3.8",
    state: "On track",
    tone: "good",
  },
  {
    name: "Priya Shah",
    role: "Account Executive",
    mood: "—",
    progress: "—",
    state: "Hasn’t checked in",
    tone: "muted",
  },
];

function ManagerReport() {
  return (
    <div className="mp-report">
      <div className="mp-row">
        <p className="mp-report-title">Your team’s week</p>
        <p className="mp-small">Sales · Week of 11/10</p>
      </div>
      <div className="mp-metrics">
        <Metric label="Check-ins completed" value="3 of 4" note="Priya hasn’t checked in yet" />
        <Metric label="Average mood" value="4.0 / 5" note="-0.3 since last week" tone="warn" />
        <Metric label="Average progress" value="4.1 / 5" note="+0.2 since last week" tone="good" />
      </div>
      <div className="mp-pair">
        <section className="mp-card">
          <p className="mp-label mp-label--good">CELEBRATE</p>
          <p>Tom’s two-tier launch strategy got the team aligned ahead of the Beta launch.</p>
        </section>
        <section className="mp-card">
          <p className="mp-label mp-label--warn">NEEDS SUPPORT</p>
          <p>
            Krishna’s energy dipped this week around accountability on a sales project with 3
            clients.
          </p>
        </section>
      </div>
      <section className="mp-card">
        <p className="mp-card-title">Team</p>
        <table className="mp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mood</th>
              <th>Progress</th>
              <th>This week</th>
            </tr>
          </thead>
          <tbody>
            {TEAM.map((m) => (
              <tr key={m.name}>
                <td>
                  <p className="mp-name">{m.name}</p>
                  <p className="mp-small">{m.role}</p>
                </td>
                <td>{m.mood}</td>
                <td>{m.progress}</td>
                <td>
                  <span className={`mp-chip mp-chip--${m.tone}`}>{m.state}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mp-card">
        <p className="mp-card-title">Conversation starters</p>
        <ul className="mp-list">
          <li>Ask Krishna which of the Beta launch dependencies you can help clear.</li>
          <li>Recognize Tom’s launch plan in your next team meeting.</li>
        </ul>
      </section>
    </div>
  );
}

const TEAMS = [
  {
    team: "Krishna Desai’s Team",
    area: "Sales",
    rate: "75%",
    mood: "4.0",
    trend: "down",
  },
  {
    team: "Jim Halpert’s Team",
    area: "Customer Success",
    rate: "88%",
    mood: "3.6",
    trend: "down",
  },
  {
    team: "Stanley Hudson’s Team",
    area: "Product",
    rate: "92%",
    mood: "4.3",
    trend: "up",
  },
  {
    team: "Michael Scott’s Team",
    area: "Marketing",
    rate: "64%",
    mood: "4.1",
    trend: "up",
  },
];

function SeniorReport() {
  return (
    <div className="mp-report">
      <div className="mp-row">
        <p className="mp-report-title">Across your teams</p>
        <p className="mp-small">4 teams · Week of 11/10</p>
      </div>
      <div className="mp-metrics">
        <Metric label="Participation" value="80%" note="+6 pts since last week" tone="good" />
        <Metric label="Average mood" value="4.0 / 5" note="-0.1 since last week" tone="warn" />
        <Metric label="Teams to watch" value="2" note="Customer Success, Sales" />
      </div>
      <section className="mp-card">
        <p className="mp-card-title">Teams</p>
        <table className="mp-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Participation</th>
              <th>Mood</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {TEAMS.map((t) => (
              <tr key={t.team}>
                <td>
                  <p className="mp-name">{t.team}</p>
                  <p className="mp-small">{t.area}</p>
                </td>
                <td>{t.rate}</td>
                <td>{t.mood}</td>
                <td>
                  <span className={`mp-trend mp-trend--${t.trend}`}>
                    {t.trend === "up" ? "↑ Rising" : "↓ Dipping"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mp-card">
        <p className="mp-card-title">Themes across teams</p>
        <ul className="mp-list">
          <li>
            Cross-team dependencies came up in Sales and Product as the main blocker for the Beta
            launch.
          </li>
          <li>
            Customer Success energy has dipped two weeks in a row; workload is the most common
            reason given.
          </li>
        </ul>
      </section>
    </div>
  );
}

function ExecutiveReport() {
  return (
    <div className="mp-report">
      <div className="mp-row">
        <p className="mp-report-title">Monday Executive Intelligence</p>
        <p className="mp-small">Criteria Corp · Week of 11/10</p>
      </div>
      <div className="mp-metrics">
        <Metric
          label="Weekly participation"
          value="54%"
          note="+4 pts since last week"
          tone="good"
        />
        <Metric label="Organization mood" value="3.9 / 5" note="Steady for 3 weeks" />
        <Metric label="Early signals raised" value="3" note="Flagged before any escalation" />
      </div>
      <section className="mp-card">
        <p className="mp-card-title">What leaders should know</p>
        <ol className="mp-signals">
          <li>
            <p className="mp-name">Delivery risk</p>
            <p>
              Dependencies on the Beta launch are the top blocker across Sales, Product and Customer
              Success.
            </p>
          </li>
          <li>
            <p className="mp-name">Wellbeing</p>
            <p>
              Customer Success has reported lower energy two weeks running, tied to support volume.
            </p>
          </li>
          <li>
            <p className="mp-name">Momentum</p>
            <p>Product’s participation reached 92%, the highest of any department this quarter.</p>
          </li>
        </ol>
      </section>
      <section className="mp-card">
        <p className="mp-card-title">Suggested next steps</p>
        <ul className="mp-list">
          <li>Name one owner for Beta launch dependencies this week.</li>
          <li>Ask Customer Success leaders where support load can be shared.</li>
        </ul>
      </section>
    </div>
  );
}

const GROUPS = [
  {
    title: "CORE CHECK-INS",
    Icon: ChatIcon,
    tabs: [
      { label: "Check-in Email", Report: CheckInEmail },
      { label: "Check-In Chat", Report: CheckInChat },
      { label: "Check-In Summaries", Report: CheckInSummary },
    ],
  },
  {
    title: "INSIGHT REPORTS",
    Icon: StackIcon,
    tabs: [
      { label: "Manager / Team Leader", Report: ManagerReport },
      { label: "Senior Manager", Report: SeniorReport },
      { label: "Executive Intelligence", Report: ExecutiveReport },
    ],
  },
];

const TABS = GROUPS.flatMap((g) => g.tabs);

export default function PreviewModal({ onClose, onBack }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabs = useRef([]);
  const panel = useRef(null);
  const closeRef = useRef(null);
  const { Report } = TABS[index];

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // Each report opens at its top.
  useEffect(() => {
    if (panel.current) panel.current.scrollTop = 0;
  }, [index]);

  const select = (i, focus) => {
    const next = (i + TABS.length) % TABS.length;
    setIndex(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onTabKey = (e) => {
    const keys = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: TABS.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  return (
    <>
      <motion.div
        className="mx-modal mp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mp-title"
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
        transition={{ type: "spring", visualDuration: 0.3, bounce: 0.15 }}
      >
        <div className="mx-modal-head">
          <div className="mp-head">
            <button type="button" className="mp-back" onClick={onBack}>
              ‹ Back
            </button>
            <p id="mp-title" className="mx-modal-title">
              Preview the experience
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="mx-close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mp-body">
          <div className="mp-side" role="tablist" aria-orientation="vertical" aria-label="Reports">
            {GROUPS.map(({ title, Icon, tabs: groupTabs }) => (
              <div key={title} className="mp-group" role="presentation">
                <p className="mp-group-title" role="presentation">
                  <span className="mp-group-icon">
                    <Icon />
                  </span>
                  {title}
                </p>
                {groupTabs.map((tab) => {
                  const i = TABS.indexOf(tab);
                  const on = i === index;
                  return (
                    <button
                      key={tab.label}
                      ref={(el) => (tabs.current[i] = el)}
                      type="button"
                      role="tab"
                      id={`mp-tab-${i}`}
                      aria-selected={on}
                      aria-controls="mp-panel"
                      tabIndex={on ? 0 : -1}
                      className={`mp-tab${on ? " is-on" : ""}`}
                      onClick={() => select(i)}
                      onKeyDown={onTabKey}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div
            ref={panel}
            id="mp-panel"
            className="mp-panel"
            role="tabpanel"
            aria-labelledby={`mp-tab-${index}`}
            tabIndex={0}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              >
                <Report />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}
