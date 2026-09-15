import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/SPFavicon1.png";

const LINKEDIN = "https://www.linkedin.com/in/sonikapatel/";

/* Page chrome shared by Home and About: the 768px container, the header bar
   (name left, links right), the footer, and the body background + grid. Layout
   rules live in index.css under .home-page / .home-header / .home-footer. */
export default function SiteShell({ nav, children }) {
  /* The background and grid live on <body> (body.home-bg in index.css) so they
     cover the full document; scoped to these routes via the class. */
  useEffect(() => {
    document.body.classList.add("home-bg");
    return () => document.body.classList.remove("home-bg");
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <div style={styles.brand}>
          <img src={logo} style={styles.brandLogo} alt="" />
          <span style={styles.brandName}>Sonika Patel</span>
        </div>
        <nav className="home-nav">{nav}</nav>
      </header>

      <main className="home-sections">{children}</main>

      <footer className="home-footer">
        <p style={styles.footerNote}>0→1 product builder. designer. mini-canvas painter.</p>
        <nav className="home-nav">
          <a href="mailto:sonika2patel@gmail.com" className="home-nav-link">Email</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="home-nav-link">LinkedIn</a>
        </nav>
      </footer>
    </div>
  );
}

export function NavLink({ to, children }) {
  return <Link to={to} className="home-nav-link">{children}</Link>;
}

/* Intro typography shared by both pages. Headings use the body face (TT) — it
   ships in 400/500 only, so 500 is the heaviest weight that renders without
   synthetic bold. */
export const textStyles = {
  heading: {
    margin: "0 0 24px",
    fontSize: 32,
    fontWeight: 500,
    color: "#111",
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
  },
  /* Same size as the Skills entries and the Work tab pills. */
  lead: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.6,
    color: "#4E4E4E",
    maxWidth: "36em",
  },
  leadEmphasis: {
    fontWeight: 500,
    color: "#2A2A2A",
  },
};

const styles = {
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandLogo: {
    width: 28,
    height: 28,
    objectFit: "contain",
    display: "block",
  },
  brandName: {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "#111",
  },
  footerNote: {
    margin: 0,
    fontSize: 13,
    fontStyle: "italic",
    color: "#8B8B8B",
  },
};
