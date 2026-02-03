import React from "react";
import  logo  from './assets/SPFavicon1.png'
/**
 * Home page (matches the screenshot)
 * - Centered dollar-like icon
 * - Big title "Sonika’s"
 * - Subtitle
 * - CTA button
 * - 3 service items with simple icons
 */
export default function Home() {
  return (
    <div style={styles.page}>
      <main style={styles.centerWrap}>
        {/* Top Icon */}
        <div style={styles.topIconWrap} aria-hidden="true">
        </div>
        <img src={logo} style={{width:'70px'}} alt="logo"/>
        {/* Title */}
        <h1 style={styles.title}>Sonika’s</h1>

        {/* Subtitle */}
        <p style={styles.subtitle}>Design Consulting Services</p>

        {/* CTA */}
        <button
          type="button"
          style={styles.cta}
          onClick={() => {
            // Replace with your real behavior (scroll, open modal, route, etc.)
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else alert("Contact coming soon ✨");
          }}
        >
          Get in touch
        </button>

        {/* Services */}
        <section style={styles.services} aria-label="Services">
          <ServiceItem icon={<MonitorIcon />} label="Product Design" />
          <ServiceItem icon={<BrandIcon />} label="Brand" />
          <ServiceItem icon={<CodeIcon />} label="App Development" />
        </section>

        {/* Optional: a placeholder contact anchor so button scroll works */}
        <div id="contact" style={{ height: 1 }} />
      </main>
    </div>
  );
}

function ServiceItem({ icon, label }) {
  return (
    <div style={styles.serviceItem}>
      <div style={styles.serviceIcon}>{icon}</div>
      <div style={styles.serviceLabel}>{label}</div>
    </div>
  );
}

/* ---------------- Icons (inline SVG) ---------------- */


function MonitorIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.5 6.5h15v9.8a1.7 1.7 0 0 1-1.7 1.7H6.2A1.7 1.7 0 0 1 4.5 16.3V6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 20h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 18v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrandIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.2 9.4l5.8-2.9 5.8 2.9-5.8 2.9-5.8-2.9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 14.6l5.8-2.9 5.8 2.9-5.8 2.9-5.8-2.9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.5 8.5 5 12l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 8.5 19 12l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4 7.6 10.6 16.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- Styles ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F7F6F5", // soft off-white like screenshot
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 20px",
    color: "#111",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  centerWrap: {
    width: "100%",
    maxWidth: 980,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  topIconWrap: {
    width: 48,
    height: 48,
    display: "grid",
    placeItems: "center",
    marginBottom: 14,
    color: "rgba(0,0,0,0.65)",
  },
  title: {
    margin: 0,
    fontSize: "clamp(56px, 7vw, 92px)",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    fontWeight: 800,
  },
  subtitle: {
    margin: "10px 0 22px",
    fontSize: "clamp(18px, 2.2vw, 28px)",
    fontWeight: 500,
    color: "rgba(0,0,0,0.82)",
  },
  cta: {
    border: "none",
    cursor: "pointer",
    background: "#9B5A2B", // warm brown
    color: "white",
    padding: "12px 22px",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 16,
    boxShadow: "0 8px 18px rgba(0,0,0,0.10)",
    marginBottom: 56,
  },
  services: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 36,
    justifyItems: "center",
    alignItems: "start",
  },
  serviceItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    color: "rgba(0,0,0,0.9)",
  },
  serviceIcon: {
    width: 42,
    height: 42,
    display: "grid",
    placeItems: "center",
    color: "rgba(0,0,0,0.8)",
  },
  serviceLabel: {
    fontSize: 16,
    fontWeight: 700,
  },
};
