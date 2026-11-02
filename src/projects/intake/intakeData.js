/* Content for the intake case study, rendered through the shared sidebar layout in
   src/projects/caseStudy. intake is a self-initiated concept, so Outcomes describes what
   the prototype changes and what would be measured at launch — no invented metrics.
   Recordings and screenshots are the prototype running as a native iOS app in the simulator.
   The live prototype is served from public/intake/index.html. */

export const INTAKE = {
  slug: "intake",
  company: "intake",
  title: "intake",
  subtitle: "Filling out your medical history once, not at every front desk",
  hero: {
    image: "/images/intake/intake-card.png",
    alt: "The intake wordmark beside the health profile screen of the iOS app",
    bleed: true,
    bg: "transparent",
    video: {
      src: "/images/intake/cover.mp4",
      left: "63.37%",
      top: "12.95%",
      width: "20.75%",
      height: "109.35%",
      radius: "8.36% / 3.86%",
    },
  },
};

export const INTAKE_NAV = [
  {
    group: "INTAKE",
    items: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "research", label: "Research" },
      { id: "decisions", label: "Key Decisions" },
      { id: "solution", label: "Solution" },
      { id: "checkin", label: "Check-in" },
      { id: "prototype", label: "Design to Prototype" },
      { id: "outcomes", label: "Outcomes" },
      { id: "learnings", label: "Learnings" },
    ],
  },
];

export const INTAKE_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    lead: "Every new doctor means the same clipboard.",
    body: [
      "A new primary care doctor, a dentist, a dermatologist, an acupuncturist: each one hands you a clipboard and asks for your name, birthday, address, insurance, medications, allergies and emergency contact all over again. Then someone at the front desk types it back in by hand.",
      "intake is a concept I designed and prototyped end to end. You answer once, in a short conversation on your phone before the visit. Your answers become a health profile that carries over to the next office and the next specialty, so returning patients only confirm what changed. When you arrive, you show a check-in code and staff pull everything straight into your chart.",
      [
        { text: "Like Homease, intake was a playground for working AI-first. I designed the flow and visual system, then built a working prototype with Claude Code and tested it as an app on the iPhone. " },
        { text: "Try the prototype", url: "/intake/index.html" },
        { text: "." },
      ],
    ],
  },
  {
    variant: "stats",
    eyebrow: "Quick facts",
    stats: [
      { value: "Solo", label: "Product design, research & prototyping" },
      { value: "10", label: "Specialties on one shared core" },
      { value: "Concept", label: "Self-initiated, 2026" },
    ],
  },
  {
    variant: "media",
    autoplay: true,
    ground: "#E3F7F7",
    radius: 20,
    src: "/images/intake/splash.mp4",
    caption:
      "The opening moment: the “n” writes itself in, then the parts of your health profile radiate out from you. Everything you answer lands in one place.",
  },
  {
    id: "problem",
    variant: "card-stack",
    eyebrow: "The Problem",
    lead: "Patients rewrite their medical history at every front desk.",
    body: "Intake forms are where every visit starts, and they barely change from office to office. The patient does the same work every time, and the practice does it again when it retypes the form.",
    cards: [
      {
        title: "The same questions at every office",
        body: "Personal details, contact, emergency contact, insurance, medications and allergies are asked by every practice, on every first visit, in a slightly different layout.",
      },
      {
        title: "Paper gets retyped, and retyping adds errors",
        body: "Handwriting is keyed in by front desk staff. One wrong digit in a member ID or birthday turns into a denied claim or a mismatched chart.",
      },
      {
        title: "Generic forms miss what the visit needs",
        body: "A dental form needs to know about antibiotics before treatment; an acupuncture form needs to know about pacemakers and pregnancy. One-size forms either skip these or ask everyone everything.",
      },
      {
        title: "Check-in becomes a waiting-room chore",
        body: "Patients are asked to arrive 15 minutes early to fill out paperwork they already filled out somewhere else.",
      },
    ],
  },
  {
    id: "research",
    variant: "side-to-side",
    eyebrow: "Research",
    body: [
      "I started from real paper intake forms from a dental office and an acupuncture clinic and mapped every field. Most of each form was the same core: personal information, contact, employer, emergency contact, the responsible party for a minor, primary and secondary insurance, and consent. Only a small part was specific to the specialty.",
      "That split became the structure: one shared core every practice reuses, plus a short module per specialty. I then benchmarked conversational consult flows in telehealth apps and mobile onboarding patterns, which pointed to the same thing: one clear question at a time feels faster than a long form, as long as related fields stay together.",
    ],
  },
  {
    id: "decisions",
    variant: "card-stack",
    eyebrow: "Key Decisions",
    cards: [
      {
        title: "Answer once, reuse everywhere",
        body: "Answers build a health profile — about you, contact, emergency contact, insurance, health history, medications, allergies and the visit itself. Next time, the patient confirms what changed instead of starting over.",
      },
      {
        title: "One topic per screen",
        body: "Not one field per screen, and not one long form. Fields you’d answer together, like first and last name or plan details, share a screen. Single-choice questions advance as soon as you tap.",
      },
      {
        title: "A shared core with specialty modules",
        body: "Primary care, dental, acupuncture, dermatology, OB/GYN, cardiology, orthopedics, mental health, pediatrics, optometry and physical therapy each add only their own questions on top of the core.",
      },
      {
        title: "Skip what doesn’t apply",
        body: "The parent or guardian section appears only when the birthday says the patient is under 18. Card and plan screens appear only if they have insurance. The pain scale appears only for pain visits.",
      },
      {
        title: "Type as little as possible",
        body: "Scanning the insurance card fills in the plan, a ZIP code fills in the city and state, phone numbers and dates format themselves, and a birthday wheel replaces typing a date.",
      },
      {
        title: "Review, sign, then a pass for the front desk",
        body: "Every answer is one tap from being edited on the review screen. After signing, the patient gets a check-in code the staff can scan.",
      },
    ],
  },
  {
    id: "solution",
    variant: "side-to-side",
    eyebrow: "Solution",
    body: "Each screen asks one thing in plain words, with a bold question, borderless cards and a single dark button low on the screen. The section icon and step count keep patients oriented, and red is reserved for emergency contacts, allergies and errors.",
  },
  {
    variant: "screen-row",
    label: "Getting started",
    screens: [
      { src: "/images/intake/screen-intro.jpg", alt: "Health profile intro with section icons around the patient's photo", caption: "Your health profile, section by section" },
      { src: "/images/intake/screen-specialty.jpg", alt: "Visit type picker with ten specialties", caption: "The visit type sets the questions" },
      { src: "/images/intake/screen-reason.jpg", alt: "What brings you to the dentist, with answer options", caption: "One tap answers and moves on" },
    ],
  },
  {
    variant: "screen-row",
    label: "Answering",
    screens: [
      { src: "/images/intake/screen-name.jpg", alt: "Name fields with labels above each field", caption: "Related fields share a screen" },
      { src: "/images/intake/screen-dob.jpg", alt: "Month, day and year wheel with the age shown", caption: "A birthday wheel shows the age" },
      { src: "/images/intake/screen-scan.jpg", alt: "Scanned dental insurance card", caption: "Scanning the card fills in the plan" },
    ],
  },
  {
    variant: "screen-row",
    label: "Finishing",
    screens: [
      { src: "/images/intake/screen-allergy.jpg", alt: "Allergy chips with Penicillin selected", caption: "Common answers as chips" },
      { src: "/images/intake/screen-review.jpg", alt: "Review screen listing every answer by section", caption: "Tap any answer to change it" },
      { src: "/images/intake/screen-sign.jpg", alt: "Consent items and signature pad", caption: "Consents, including dental X-rays" },
    ],
  },
  {
    id: "checkin",
    variant: "side-to-side",
    eyebrow: "Check-in",
    lead: "The intake ends with a pass the patient shows to staff.",
    body: "Instead of a confirmation email, the last screen is a check-in pass: a QR code, the patient’s name, birthday and visit type, and a short code staff can type if the scanner won’t read it. The front desk scans it and the signed intake lands in the chart, with nothing retyped.",
  },
  {
    variant: "media",
    autoplay: true,
    ground: "#E3F7F7",
    radius: 20,
    src: "/images/intake/checkin.mp4",
    caption:
      "The check-in pass at the end of the intake. The code reveals top to bottom, then a single scan line passes over it as a cue to hold it up to the scanner.",
  },
  {
    id: "prototype",
    variant: "side-to-side",
    eyebrow: "Design to Prototype",
    body: [
      "I built intake as a working prototype with Claude Code rather than a click-through, so the parts that matter could be felt: questions that appear and disappear with your answers, a wheel you can scroll, a card that scans. Motion follows Emil Kowalski’s design-engineering principles: strong ease-out curves, a slight press on every button, quick exits, and gentler motion when the phone asks for reduced motion.",
      "The visual system came from extracting the soft depth of a reference onboarding screen — borderless cards, labels above fields, a heavy dark button — and mapping it onto my own teal, aqua and red palette. I then wrapped the prototype in a small native iOS shell and ran it on the iPhone simulator, which surfaced real problems a browser preview hid, like the Return key not moving between fields.",
    ],
  },
  {
    id: "outcomes",
    variant: "side-to-side",
    eyebrow: "Outcomes",
    lead: "intake hasn’t launched, so these describe what the prototype changes rather than measured results.",
    body: [
      "A patient answers the shared core once and reuses it across practices and specialties. Specialty questions shrink to five or so short screens. And check-in becomes a scan instead of a clipboard and a retyped form.",
      "At launch I’d measure time from opening the link to signing, completion rate, the share of returning patients who only confirm changes, front desk minutes per check-in, and claim denials caused by intake errors.",
    ],
  },
  {
    id: "learnings",
    variant: "three-column",
    eyebrow: "Learnings",
    columns: [
      "What worked: testing on the phone early. Running the prototype as an app showed layout and keyboard problems that a desktop preview never would have.",
      "What I’d do differently: talk to front desk staff and older patients first. Check-in is their workflow, and larger type, screen readers and other languages need to be designed in, not added later.",
      "What’s next: sending the signed intake to the practice’s EHR with the patient’s consent, one profile shared across practices, and caregiver accounts for managing a child’s or parent’s intake.",
    ],
  },
];
