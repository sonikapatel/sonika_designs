import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteShell from "./SiteShell";
import HomeaseHouse from "./projects/homease/HomeaseHouse";

/* Company wordmarks live in public/images/logos, each cropped to its ink. They
   sit in a greyed-out strip under the intro, sized to one shared area rather
   than one height, so a near-square mark (AT&T) and a long one (Philosophie)
   carry the same visual weight. `aspect` is each file's width / height; `scale`
   trims the heavy, solid Philosophie wordmark so it doesn't read larger. */
const LOGO_AREA = 1024; // px², a 64 × 16 box, so a wordmark sits in a line of text
const EXPERIENCE = [
  { company: "Criteria",        logo: "/images/logos/criteria-wordmark.png",    aspect: 4.0,  role: "Senior UX Designer" },
  { company: "Honeybee Health", logo: "/images/logos/honeybee-wordmark.png",    aspect: 3.57, role: "Product Designer" },
  { company: "Square (Block)",  logo: "/images/logos/square-wordmark.svg",      aspect: 4.0,  role: "Product Designer" },
  { company: "Philosophie",     logo: "/images/logos/philosophie-wordmark.svg", aspect: 8.93, scale: 0.85, role: "Product Designer" },
  { company: "AT&T",            logo: "/images/logos/att-wordmark.svg",         aspect: 2.43, role: "Engineer / UX Designer" },
];

/* Consecutive companies with the same role, for the "Previously…" line. */
const ROLE_GROUPS = EXPERIENCE.reduce((groups, item) => {
  const last = groups[groups.length - 1];
  if (last && last.role === item.role) last.items.push(item);
  else groups.push({ role: item.role, items: [item] });
  return groups;
}, []);

/* The tools list beside Skills. */
const TOOL_LIST = [
  { name: "Claude Code",          use: "Scaling AI-native design systems" },
  { name: "Cursor",               use: "Bringing prototypes to life" },
  { name: "Adobe CC",             use: "Branding work" },
  { name: "Figma (Make, Figjam)", use: "Canvas to ideate and brainstorm" },
];

const SKILLS = [
  "0→1 Product Design",
  "User Research",
  "Prototyping",
  "Design Systems",
  "Branding",
  "UX Copy and Messaging",
  "App Development",
  "Workshop Design",
];

const VALUES = [
  {
    title: "Balance",
    bg: "#B8C4B2",
    textColor: "#2A2A2A",
    description: "Not just in visual form, but in interacting with product stakeholders and balancing user needs with a business.",
  },
  {
    title: "Systems Thinking",
    bg: "#FFFFFF",
    textColor: "#2A2A2A",
    description: "I apply a system-driven approach to designing large-scale applications.",
  },
  {
    title: "Collaboration",
    bg: "#E4E4E4",
    textColor: "#2A2A2A",
    description: "Design is a collaborative sport. I align stakeholders to ensure the design process is inclusive.",
  },
  {
    title: "Intentionality",
    bg: "#FFFFFF",
    textColor: "#2A2A2A",
    description: "I focus on reducing unnecessary complexity, and creating experiences that feel purposeful rather than just polished.",
  },
  {
    title: "Empathy",
    bg: "#2D2D2D",
    textColor: "#FFFFFF",
    description: "Great products start with understanding people. I design by uncovering the behaviors and frustrations behind user's actions.",
  },
  {
    title: "Diversity",
    bg: "#E4E4E4",
    textColor: "#2A2A2A",
    description: "I believe work comes from different perspectives, listening to customers, and being exposed to a variety of disciplines.",
  },
];


/* Touch screens never hover, so a tap toggles the card there instead. */
const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

function ValueCard({ title, description, bg, textColor }) {
  const [flipped, setFlipped] = useState(false);
  const needsBorder = bg === "#FFFFFF";
  return (
    <div
      style={{ perspective: 800, cursor: canHover ? "default" : "pointer", height: "var(--flip-card-height)" }}
      onMouseEnter={canHover ? () => setFlipped(true) : undefined}
      onMouseLeave={canHover ? () => setFlipped(false) : undefined}
      onClick={canHover ? undefined : () => setFlipped(f => !f)}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          background: bg,
          border: needsBorder ? "1px solid rgba(0,0,0,0.09)" : "none",
          borderRadius: 24,
          padding: 24,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: textColor, fontFamily: "'TT', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{title}</p>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          background: bg,
          border: needsBorder ? "1px solid rgba(0,0,0,0.09)" : "none",
          borderRadius: 24,
          padding: 24,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          display: "flex",
          alignItems: "center",
        }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: textColor }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const TABS = ["Products", "Brands", "Playground"];

const CARDS = {
  Products: [
    {
      company: "Fika",
      description: "Engaging creative connection IRL through coffee",
      industry: "Community",
      bg: "#4B44AF",
      image: "/images/fika123.png",
      /* The landing page scrolling top to bottom at a constant speed, captured
         frame by frame from the fika-march-code frontend in headless Chrome at
         1440×762, played in the still's browser window. Position/size mirror the
         window's rect in the Figma card (23,56 / 291×154 on a 337×265 tile). */
      video: {
        src: "/images/fika/fika-landing.mp4",
        left: "6.825%",
        top: "21.13%",
        width: "86.35%",
        height: "58.11%",
        radius: "2.3% / 4.3%",
      },
      slug: "fika",
    },
    {
      company: "Criteria",
      description: "Personalized AI coaching for more effective management",
      industry: "HR Tech",
      bg: "#16112E",
      /* The still's dashboard window is dashboard.mov's first frame, so the clip
         takes over seamlessly on hover. It plays in that window (87,108 /
         798×459 on the 1011×795 tile), and the "Prepare for your next 1:1" panel,
         cut from the same still (465,237 / 462×448), sits back on top of it. */
      image: "/images/criteria.png",
      video: {
        src: "/images/criteria/criteria-card.mp4",
        left: "8.605%",
        top: "13.585%",
        width: "78.932%",
        height: "57.736%",
      },
      layer: {
        src: "/images/criteria/criteria-prep-panel.png",
        left: "45.994%",
        top: "29.811%",
        width: "45.697%",
        height: "56.352%",
      },
      slug: "criteria",
    },
    {
      company: "Square",
      description: "Empowering small businesses with flexible financing.",
      industry: "Financial",
      bg: "#3D5445",
      image: "/images/Square_full.png",
      /* Stays still on hover: no clip and no push-in. */
      noMotion: true,
      slug: "square",
    },
    {
      company: "Co-op Solutions",
      description: "Modernizing legacy credit union software",
      industry: "Financial",
      image: "/images/Springboard.png",
      /* The wide still is cropped to the other tiles' shape so it sits beside
         Square, holding on the member sidebar and cardholder table. */
      crop: { position: "32% 0" },
      slug: "coop",
    },
    {
      company: "Honeybee Health",
      description: "Enabling physicians to prescribe medications while protecting patient privacy",
      industry: "Healthcare",
      bg: "#0D1917",
      image: "/images/HBH.png",
      /* HBH_Prototype.mov from the case study, the same E-prescription screen.
         Pinned to the app window in the still (126,204 on the 1011×795 tile) at
         the clip's own 1.9:1, so it runs off the right edge as the still does. */
      video: {
        src: "/images/hbh/hbh-card.mp4",
        left: "12.463%",
        top: "25.660%",
        width: "111.08%",
        height: "74.34%",
        radius: 0,
      },
      slug: "hbh-3",
    },
  ],
  /* Self-initiated concepts and prototypes. */
  Playground: [
    {
      company: "Homease",
      description: "Mid-term rentals from every source in one search",
      bg: "#86533A",
      /* The card without its house mark; HomeaseHouse draws it in place on a loop
         (Figma node 107:5363). The outline sits at 385.6,208.7 / 132.1×125.3 on
         the 1354×556 tile. */
      image: "/images/homease/homease-card-plain.png",
      house: {
        left: "28.479%",
        top: "37.536%",
        width: "9.758%",
        height: "22.530%",
      },
      /* The Ask flow recorded from the prototype, pinned over the phone in the Figma
         card (858,72 / 281×608 on a 1354×556 tile). The phone runs off the bottom
         edge, as it does in Figma; the tile clips it. */
      video: {
        src: "/images/homease/cover.mp4",
        left: "63.37%",
        top: "12.95%",
        width: "20.75%",
        height: "109.35%",
        radius: "8.36% / 3.86%",
      },
      slug: "homease",
      fullWidth: true,
    },
    {
      company: "intake",
      description: "Patient intake you fill out once, not at every front desk",
      bg: "#2C7476",
      image: "/images/intake/intake-card.png",
      /* The splash and health profile recorded from the iOS prototype, pinned over the
         phone at the same rect as the Homease card (858,72 / 281×608 on 1354×556). */
      video: {
        src: "/images/intake/cover.mp4",
        left: "63.37%",
        top: "12.95%",
        width: "20.75%",
        height: "109.35%",
        radius: "8.36% / 3.86%",
      },
      slug: "intake",
      fullWidth: true,
    },
  ],
  Brands: [
    {
      image: "/images/fika1.png",
      name: "Fika",
      /* Clicking the card opens the newsletters sent to the community from beehiiv. */
      campaigns: [
        {
          title: "Join the table",
          subtitle: "Grab your latte or matcha or tea!",
          date: "Apr 2, 2026",
          image: "/images/fika/fika_email_join_the_table.jpg",
          url: "https://fikacreativesco.beehiiv.com/p/join-the-table-32a2",
        },
      ],
    },
    {
      image: "/images/Bib1.png",
      name: "Beauty in Balance",
      /* Clicking the card opens the Instagram posts and event visuals. */
      posts: [
        { src: "/images/bib/bib-brand-intro.jpg", caption: "Brand intro post", alt: "Beauty in Balance intro post: career, community, wellness" },
        { src: "/images/bib/bib-brand-video.mp4", poster: "/images/bib/bib-brand-video-poster.jpg", caption: "Brand video" },
        { src: "/images/bib/bib-signature-series.jpg", caption: "The Signature Series launch", alt: "The Signature Series by Beauty in Balance post" },
        { src: "/images/bib/bib-tour-pillars.jpg", caption: "Signature Series tour", alt: "Post reading: Each pillar of branding, revealed soon" },
      ],
    },
    { image: "/images/jaal2.png" },
    { image: "/images/motion1.png" },
    {
      image: "/images/ortho1.png",
      name: "Lokahi Orthodontics",
      /* Clicking the card opens the brand and graphic style guide, one page per
         slide, rendered from the PDF in /images/lokahi. */
      guide: {
        pdf: "/images/lokahi/lokahi-brand-guide.pdf",
        pages: [
          { src: "/images/lokahi/lokahi-guide-1.jpg", caption: "Cover", alt: "Lokahi Orthodontics wordmark: harmony in every smile" },
          { src: "/images/lokahi/lokahi-guide-2.jpg", caption: "Mission", alt: "Lokahi mission statement, established 2026" },
          { src: "/images/lokahi/lokahi-guide-3.jpg", caption: "Social media assets", alt: "Before and after social media posts" },
          { src: "/images/lokahi/lokahi-guide-4.jpg", caption: "Color palette", alt: "Sage, cream, deep green and blush color swatches" },
          { src: "/images/lokahi/lokahi-guide-5.jpg", caption: "Header type: Ivy Presto Italic", alt: "Ivy Presto Italic header type samples" },
          { src: "/images/lokahi/lokahi-guide-6.jpg", caption: "Body type: Authentic Sans", alt: "Authentic Sans body type samples: Beauty. Balance. Breath." },
          { src: "/images/lokahi/lokahi-guide-7.jpg", caption: "Placements", alt: "The brand applied to signage and print" },
          { src: "/images/lokahi/lokahi-guide-8.jpg", caption: "Sign-off", alt: "Lokahi Orthodontics: beauty, balance, breath" },
        ],
      },
    },
  ],
};


/* Types `text` out once, letter by letter, the first time it scrolls into view,
   with a caret that blinks while typing and then goes away. The full text sits
   invisibly underneath so nothing shifts, and screen readers get it straight away.
   Readers who prefer less motion see the finished text. */
const TYPE_MS = 75;

function Typewriter({ text }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const id = setTimeout(() => setCount((n) => n + 1), TYPE_MS);
    return () => clearTimeout(id);
  }, [started, count, text]);

  const typing = count < text.length;
  return (
    <span ref={ref} className="typewriter" aria-label={text}>
      <span className="typewriter-ghost" aria-hidden="true">{text}</span>
      <span className="typewriter-typed" aria-hidden="true">
        {text.slice(0, count)}
        {typing && <span className="typewriter-caret" />}
      </span>
    </span>
  );
}

/* Section heading + optional muted subtitle, shared by every section below the
   intro so they all open the same way. `typewriter` types the title out once. */
function SectionHeading({ title, subtitle, typewriter }) {
  return (
    <div style={subtitle ? styles.sectionHead : styles.sectionHeadBare}>
      <h2 style={styles.sectionTitle}>{typewriter ? <Typewriter text={title} /> : title}</h2>
      {subtitle && <p style={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Products");
  const cards = CARDS[activeTab];

  const introRef = useFadeIn();
  const workRef = useFadeIn();
  const valuesRef = useFadeIn();
  const toolsRef = useFadeIn();

  return (
    <SiteShell>
        {/* Intro: portrait on the left, copy on the right, kept short so the work
            starts above the fold. */}
        <section ref={introRef} className="fade-section home-intro">
          <div className="home-portrait">
            <img src="/images/sonika-portrait.jpg" alt="Sonika smiling in front of a wall of bougainvillea at sunset" />
          </div>

          <div className="home-intro-copy">
            <h1 className="home-intro-title">
              Hello <span className="wave-emoji" role="img" aria-label="waving hand">👋🏼</span> I'm Sonika.
            </h1>
            <p className="home-intro-lead">
              I'm a marketing and UX/UI design specialist who cares deeply about <strong>making genuinely valuable products</strong>. I've designed tools that help clinicians prescribe medications, small businesses get funding, credit unions to experience intuitive software, and managers coach their teams.
            </p>
            {/* Roles in order, with each company's wordmark standing in for its name. */}
            <p className="home-intro-lead home-intro-history">
              Previously{" "}
              {ROLE_GROUPS.map((group, i) => (
                <React.Fragment key={group.role}>
                  {i > 0 && (i === ROLE_GROUPS.length - 1 ? ", and " : ", ")}
                  {group.role} at{" "}
                  {group.items.map((item, j) => (
                    <React.Fragment key={item.company}>
                      {j > 0 && (j === group.items.length - 1 ? " and " : ", ")}
                      <img
                        className="home-intro-logo"
                        src={item.logo}
                        alt={item.company}
                        title={item.company}
                        style={{ height: Math.round(Math.sqrt(LOGO_AREA / item.aspect) * (item.scale || 1)) }}
                      />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
              .
            </p>
          </div>
        </section>

        {/* Work */}
        <section ref={workRef} className="fade-section">
          {/* Heading on the left, tabs on the right of the same row. */}
          <div className="work-head">
            <SectionHeading typewriter title="I've built" subtitle="Selected products, brands and side projects." />
            <div style={styles.tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  style={tab === activeTab ? { ...styles.tab, ...styles.tabActive } : styles.tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={activeTab === "Brands" ? "project-grid project-grid--single" : "project-grid"} aria-live="polite">
            {cards.length > 0 ? (
              activeTab === "Brands"
                ? cards.map((card) => (
                    <BrandCard key={card.image} image={card.image} name={card.name} campaigns={card.campaigns} posts={card.posts} guide={card.guide} />
                  ))
                : cards.map((card) => (
                    <ProjectCard
                      key={card.company}
                      company={card.company}
                      description={card.description}
                      industry={card.industry}
                      accent={card.bg}
                      image={card.image}
                      video={card.video}
                      layer={card.layer}
                      noMotion={card.noMotion}
                      house={card.house}
                      slug={card.slug}
                      crop={card.crop}
                      fullWidth={card.fullWidth}
                    />
                  ))
            ) : (
              <p style={styles.empty}>Coming soon</p>
            )}
          </div>
        </section>

        {/* Tools beside Skills */}
        <section ref={toolsRef} className="fade-section fold-columns">
          <div>
            <SectionHeading typewriter title="I build with" />
            <div className="tools-grid">
              {TOOL_LIST.map((tool) => (
                <div key={tool.name}>
                  <p style={styles.entryTitle}>{tool.name}</p>
                  <p style={styles.entryMeta}>{tool.use}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading typewriter title="I specialize in" />
            <div className="skills-grid">
              {SKILLS.map((skill) => (
                <p key={skill} style={styles.entryTitle}>{skill}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="fade-section">
          <SectionHeading typewriter title="I prioritize" />
          <div className="values-grid">
            {VALUES.map((v) => (
              <ValueCard key={v.title} {...v} />
            ))}
          </div>
        </section>

    </SiteShell>
  );
}

function BrandCard({ image, name, campaigns, posts, guide }) {
  const [hovered, setHovered] = useState(false);
  const ref = useFadeIn();
  const dialogRef = useRef(null);
  const style = {
    ...styles.brandCard,
    background: hovered ? "#F7F3EC" : "transparent",
    transition: "background 0.2s ease, opacity 0.65s ease, transform 0.65s ease",
  };
  const img = <img src={image} alt="" className="brand-card-image" style={styles.brandImage} />;

  if (!campaigns && !posts && !guide) {
    return (
      <div ref={ref} className="fade-section" style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {img}
      </div>
    );
  }

  /* Cards with campaigns, posts or a guide are buttons that open a native dialog:
     it traps focus, closes on Escape, and a click on the backdrop closes it too. */
  const kind = guide ? "brand and graphic styles" : posts ? "Instagram posts" : "email campaigns";
  const title = guide ? "brand and graphic styles" : posts ? "Instagram" : "email campaigns";
  const sub = guide
    ? `Logo, color, type and placements from the ${name} brand guide.`
    : posts
      ? `Posts and event visuals made for the ${name} Instagram.`
      : `Newsletters sent to the ${name} community from beehiiv.`;
  return (
    <div ref={ref} className="fade-section">
      <button
        type="button"
        className="brand-card-button"
        style={style}
        aria-label={`${name}: see the ${kind}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => dialogRef.current?.showModal()}
      >
        {img}
      </button>
      <dialog
        ref={dialogRef}
        className="campaign-dialog"
        aria-labelledby={`${name}-campaigns-title`}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      >
        <div className="campaign-dialog-inner">
          <header className="campaign-dialog-head">
            <div>
              <h2 id={`${name}-campaigns-title`} className="campaign-dialog-title">
                {name} {title}
              </h2>
              <p className="campaign-dialog-sub">
                {sub}
                {guide && (
                  <>
                    {" "}
                    <a className="campaign-link" href={guide.pdf} target="_blank" rel="noreferrer">
                      Open the PDF ↗
                    </a>
                  </>
                )}
              </p>
            </div>
            <button type="button" className="campaign-dialog-close" aria-label="Close" onClick={() => dialogRef.current?.close()}>
              ×
            </button>
          </header>
          {guide && (
            <div className="ig-grid ig-grid--single">
              {guide.pages.map((page) => (
                <figure key={page.src} className="ig-post">
                  <img src={page.src} alt={page.alt} loading="lazy" />
                  <figcaption>{page.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {posts && (
            <div className="ig-grid">
              {posts.map((post) => (
                <figure key={post.src} className="ig-post">
                  {post.poster ? (
                    <video src={post.src} poster={post.poster} controls muted playsInline preload="none" />
                  ) : (
                    <img src={post.src} alt={post.alt} loading="lazy" />
                  )}
                  <figcaption>{post.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {campaigns?.map((c) => (
            <article key={c.url} className="campaign">
              <div className="campaign-meta">
                <p className="campaign-title">{c.title}</p>
                <p className="campaign-date">{c.subtitle} · {c.date}</p>
                <a className="campaign-link" href={c.url} target="_blank" rel="noreferrer">
                  Read on beehiiv ↗
                </a>
              </div>
              <img className="campaign-image" src={c.image} alt={`The "${c.title}" email`} loading="lazy" />
            </article>
          ))}
        </div>
      </dialog>
    </div>
  );
}

/* Card clips sit hidden and paused until the card is hovered or focused, then
   fade in and play from the start. Touch screens can't hover, so there they
   autoplay as before; readers who ask for less motion keep the still. */
const prefersStill = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ProjectCard({ company, description, industry, accent, image, video, layer, house, noMotion, slug, crop, fullWidth }) {
  const ref = useFadeIn();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (video && !canHover && !prefersStill()) setPlaying(true);
  }, [video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [playing]);

  const start = () => {
    if (canHover && !prefersStill()) setPlaying(true);
  };
  const stop = () => {
    if (canHover) setPlaying(false);
  };

  /* A quiet tile with the copy underneath it: the description on the left, the
     project name and industry as small tags on the right (.home-card-* in
     index.css). The caption names the project, so the still's alt stays empty. */
  const tile = (
    <div className={video || noMotion ? "home-card-tile" : "home-card-tile home-card-tile--still"}>
      <img
        src={image}
        alt=""
        className={crop ? "home-card-image home-card-image--crop" : "home-card-image"}
        style={crop ? { objectPosition: crop.position } : undefined}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {video && (
        <video
          ref={videoRef}
          className={playing ? "home-card-video is-playing" : "home-card-video"}
          src={video.src}
          preload="metadata"
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{
            left: video.left,
            top: video.top,
            width: video.width,
            height: video.height,
            ...(video.radius !== undefined && { borderRadius: video.radius }),
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      {layer && (
        <img
          src={layer.src}
          alt=""
          className="home-card-layer"
          style={{ left: layer.left, top: layer.top, width: layer.width, height: layer.height }}
        />
      )}
      {house && <HomeaseHouse style={house} />}
    </div>
  );

  const caption = (
    <div className="home-card-caption">
      <p className="home-card-description">{description}</p>
      <div className="home-card-tags">
        <span className="home-card-tag home-card-tag--name" style={accent ? { color: accent } : undefined}>
          {company}
        </span>
        {industry && <span className="home-card-tag">{industry}</span>}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className="fade-section"
      style={fullWidth ? { gridColumn: "1 / -1" } : undefined}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      {slug ? (
        <Link to={`/projects/${slug}`} className="home-card-link">
          {tile}
          {caption}
        </Link>
      ) : (
        <>
          {tile}
          {caption}
        </>
      )}
    </div>
  );
}

/* Page width, padding and every grid live in index.css (.home-page and the
   grid block); the spacing tokens used below are defined there too. */
const styles = {
  /* Heading to its content: 24px in all (8px under the title + 16px), tighter
     than the 40px --space-block used between other blocks. */
  sectionHead: {
    marginBottom: 16,
  },
  sectionHeadBare: {
    marginBottom: 16,
  },
  sectionTitle: {
    display: "inline-block",
    margin: "0 0 8px",
    fontSize: 20,
    fontWeight: 600,
    color: "#4E4E4E",
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  sectionSubtitle: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.6,
    color: "#6B6B6B",
  },
  /* Stacked list entries (Tools): title line, muted line beneath. */
  entryList: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  entryTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    color: "#111",
  },
  entryMeta: {
    margin: "2px 0 0",
    fontSize: 13,
    lineHeight: 1.5,
    color: "#6B6B6B",
  },
  tabs: {
    display: "flex",
    gap: 8,
  },
  tab: {
    border: "none",
    background: "transparent",
    padding: "8px 20px",
    borderRadius: 20,
    /* Same type as the Skills/Experience entries (styles.entryTitle). */
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    color: "rgba(0,0,0,0.62)",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s, color 0.15s",
  },
  tabActive: {
    background: "#E6E2DB",
    color: "#111",
  },
  brandCard: {
    borderRadius: 24,
    /* 48px of room around each board on desktop, easing down on phones. */
    padding: "clamp(16px, 4vw, 48px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandImage: {
    display: "block",
    maxWidth: "100%",
  },
  brandsSubtitle: {
    margin: "0 0 20px",
    fontSize: 14,
    color: "#4E4E4E",
    lineHeight: 1.6,
  },
  empty: {
    color: "#4E4E4E",
    fontSize: 15,
    gridColumn: "1 / -1",
    margin: 0,
    paddingTop: 8,
  },
};
