import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/SPFavicon1.png";

const LINKEDIN = "https://www.linkedin.com/in/sonikapatel/";

/* Page chrome shared by Home and About: the 768px container, the header bar
   (logo left; page link, Email and LinkedIn right), and the body background +
   grid. Layout rules live in index.css under .home-page / .home-header. */
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
        {/* The mark alone, linking home; it's the only brand element in the header. */}
        <Link to="/" style={styles.brand} aria-label="Sonika Patel, home">
          <img src={logo} style={styles.brandLogo} alt="" />
        </Link>
        <nav className="home-nav">
          {nav}
          <a href="mailto:sonika2patel@gmail.com" className="home-nav-link">Email</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="home-nav-link">LinkedIn</a>
        </nav>
      </header>

      <main className="home-sections">{children}</main>
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
  },
  brandLogo: {
    width: 44,
    height: 44,
    objectFit: "contain",
    display: "block",
  },
};
