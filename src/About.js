import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/SPFavicon1.png";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);

// Ring image (public/clock-ring.png) is 2352x2418 (near-square); its inner opening is
// centered near (1194, 1210) in source pixels. Each hour gets its own radius (measured
// from that center out to the ring's inner edge at that hour's angle, minus the number
// circle's own radius, with separate x/y scale factors since the source isn't perfectly
// square) so the numbers hug the rim's actual contour instead of sitting on a uniform
// circle inset far from the edge everywhere.
//
// Everything below is defined at a 340px base size, then scaled together by SCALE
// so the whole clock (ring, memoji, numbers, badge) grows/shrinks as one unit.
const SCALE = 0.9;
const scale = (n) => Math.round(n * SCALE);

const DISPLAY_SIZE = scale(340);
const CENTER_X = scale(173);
const CENTER_Y = scale(170);
const BASE_HOUR_RADII = { 1: 127, 2: 126, 3: 128, 4: 125, 5: 122, 6: 130, 7: 127, 8: 127, 9: 128, 10: 125, 11: 124, 12: 128 };
const HOUR_RADII = Object.fromEntries(
  Object.entries(BASE_HOUR_RADII).map(([hour, r]) => [hour, scale(r)])
);
const CENTER_SIZE = scale(100);
const NUMBER_CIRCLE_SIZE = scale(36);
const NUMBER_FONT_SIZE = scale(12.5);
const BADGE_SIZE = scale(44);
const BADGE_ANGLE = 40;
const BADGE_RADIUS = (CENTER_SIZE / 2) * 0.82;

function polar(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + radius * Math.cos(rad),
    y: CENTER_Y + radius * Math.sin(rad),
  };
}

function hourAngle(hour) {
  return hour * 30 - 90;
}

const BADGE_POS = polar(BADGE_ANGLE, BADGE_RADIUS);

const HOUR_ACTIONS = {
  1: "coding prototypes",
  2: "designing in Figma",
  3: "asking users how they feel about a UX",
  4: "biking around the neighborhood",
  5: "playing soccer",
  6: "making content for Fika",
  7: "unwinding with a book",
  8: "drinking a matcha to start the day",
  9: "designing ideas",
  10: "designing prototypes",
  11: "taking a (laptop) keyboard break",
  12: "making tofu stir fry",
};
const AM_HOURS = new Set([8, 9, 10, 11]);
// Most hours use their own numbered image (public/Emojis/{hour}.png); overrides
// here point specific hours at a different file.
const EMOJI_IMAGE = { 7: 13 };

export default function About() {
  const [hoveredHour, setHoveredHour] = useState(null);

  return (
    <div style={styles.page}>
      <Link to="/" className="about-back-link" style={styles.backLink}>← Back home</Link>

      <div className="about-content" style={styles.content}>
        <div className="about-left-col" style={styles.leftCol}>
          <img src={logo} style={styles.logo} alt="Sonika Patel" />
          <h1 style={styles.heading}>Sonika Patel</h1>
          <p style={styles.tagline}>
            0→1 product builder. designer. mini-canvas painter.
          </p>
          <p style={styles.bio}>
            Hello <span role="img" aria-label="waving hand">👋🏼</span> I'm Sonika (So-knee-kah)! Outside of work, you can find me doing a variety of things, from playing my favorite sports to playing the keyboard. Hover around the clock to see what I'm up to throughout the day!
            
          </p>
        </div>

        <div style={styles.rightCol}>
          <div style={styles.clockWrap}>
            <img src="/clock-ring.png" alt="" style={styles.ringImage} />

            <div
              style={{
                position: "absolute",
                left: CENTER_X - CENTER_SIZE / 2,
                top: CENTER_Y - CENTER_SIZE / 2,
                width: CENTER_SIZE,
                height: CENTER_SIZE,
                borderRadius: "50%",
                overflow: "hidden",
                background: "transparent",
              }}
            >
              <img
                src="/EmojiMovie691270547_transparent.gif"
                alt="Sonika memoji"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {hoveredHour && (
              <img
                src={`/Emojis/${EMOJI_IMAGE[hoveredHour] || hoveredHour}.png`}
                alt=""
                style={{
                  ...styles.emojiBadge,
                  left: BADGE_POS.x - BADGE_SIZE / 2,
                  top: BADGE_POS.y - BADGE_SIZE / 2,
                }}
              />
            )}

            {HOURS.map((hour) => {
              const { x, y } = polar(hourAngle(hour), HOUR_RADII[hour]);
              const hovered = hoveredHour === hour;
              return (
                <div
                  key={hour}
                  style={{
                    position: "absolute",
                    left: x - NUMBER_CIRCLE_SIZE / 2,
                    top: y - NUMBER_CIRCLE_SIZE / 2,
                    width: NUMBER_CIRCLE_SIZE,
                    height: NUMBER_CIRCLE_SIZE,
                  }}
                  onMouseEnter={() => setHoveredHour(hour)}
                  onMouseLeave={() => setHoveredHour(null)}
                >
                  <div
                    style={{
                      ...styles.numberCircle,
                      background: hovered ? "#D9D5CC" : "transparent",
                    }}
                  >
                    {hour}
                  </div>
                </div>
              );
            })}
          </div>

          <p style={styles.caption}>
            {hoveredHour && (
              <>
                <span style={styles.captionTime}>
                  {hoveredHour} {AM_HOURS.has(hoveredHour) ? "AM" : "PM"}
                </span>{" "}
                <strong>{HOUR_ACTIONS[hoveredHour]}</strong>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    maxWidth: 800,
    margin: "0 auto",
    padding: "56px 40px 80px",
    fontFamily: "'TT', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#111",
    boxSizing: "border-box",
  },
  backLink: {
    position: "absolute",
    // Lines up with the clock caption below the ring: page's top padding (56)
    // + the clock's own height (DISPLAY_SIZE) + the caption's top margin (24).
    top: 56 + DISPLAY_SIZE + 24,
    left: 40,
    color: "rgba(0,0,0,0.52)",
    fontSize: 13,
    textDecoration: "none",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "312px 1fr",
    gap: 48,
    alignItems: "start",
  },
  leftCol: {
    width: 312,
  },
  logo: {
    width: 42,
    height: 42,
    objectFit: "contain",
    marginBottom: 20,
    display: "block",
  },
  heading: {
    margin: 0,
    fontSize: 48,
    fontWeight: 800,
    fontFamily: "IvyPresto",
    color: "#4B4B4B",
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
  },
  tagline: {
    margin: "8px 0 28px",
    fontSize: 12,
    fontWeight: 400,
    color: "rgba(0,0,0,0.52)",
    letterSpacing: "0.01em",
  },
  bio: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.7,
    color: "#4E4E4E",
  },
  eyebrow: {
    margin: "14px 0 12px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.38)",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  caption: {
    margin: "24px 0 0",
    fontSize: 16,
    fontWeight: 600,
    color: "#2A2A2A",
    lineHeight: 1.4,
    maxWidth: 340,
    minHeight: 56,
    textAlign: "center",
  },
  captionTime: {
    fontWeight: 400,
  },
  clockWrap: {
    position: "relative",
    width: DISPLAY_SIZE,
    height: DISPLAY_SIZE,
  },
  ringImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  numberCircle: {
    width: NUMBER_CIRCLE_SIZE,
    height: NUMBER_CIRCLE_SIZE,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: NUMBER_FONT_SIZE,
    fontWeight: 600,
    color: "#1A1A1A",
    opacity: 0.8,
    transition: "background 0.15s ease",
  },
  emojiBadge: {
    position: "absolute",
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    objectFit: "contain",
  },
};
