import React, { useState, useRef } from "react";
import SiteShell, { NavLink, textStyles } from "./SiteShell";

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
const CENTER_SIZE = scale(130);
const NUMBER_CIRCLE_SIZE = scale(36);
const NUMBER_FONT_SIZE = scale(12.5);
const BADGE_SIZE = scale(60.8);
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
  const clockRef = useRef(null);
  const videoRef = useRef(null);

  // Cursor tracking: the memoji "looks" toward wherever the cursor sits around the
  // ring by scrubbing the video to the frame whose angle (from clock center) matches
  // the cursor's angle, instead of letting it autoplay through on its own.
  function handleClockMouseMove(e) {
    const video = videoRef.current;
    const rect = clockRef.current?.getBoundingClientRect();
    if (!video || !rect || !Number.isFinite(video.duration)) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const angle = Math.atan2(mouseY - CENTER_Y, mouseX - CENTER_X) * (180 / Math.PI);
    const normalized = (angle + 360) % 360;

    if (!video.paused) video.pause();
    video.currentTime = (normalized / 360) * video.duration;
  }

  function handleClockMouseLeave() {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }

  return (
    <SiteShell nav={<NavLink to="/">Home</NavLink>}>
      {/* Intro copy on the left, clock on the right, pushed to the column edges. */}
      <section className="about-row">
        <div style={styles.copy}>
          <h1 style={textStyles.heading}>
            Hello <span className="wave-emoji" role="img" aria-label="waving hand">👋🏼</span> I'm Sonika.
          </h1>
          <p style={textStyles.lead}>
            Outside of work, you can find me playing my tennis or soccer to playing the keyboard. Hover around the clock to see what I'm up to throughout the day!
          </p>
        </div>

        <div style={styles.clockCol}>
          <div
            ref={clockRef}
            style={styles.clockWrap}
            onMouseMove={handleClockMouseMove}
            onMouseLeave={handleClockMouseLeave}
          >
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
              {/* Two sources because no single format carries alpha everywhere: Safari
                  needs HEVC-with-alpha (and can't do WebM alpha), while Chrome/Firefox
                  need VP9 WebM (and can't do HEVC alpha). Chrome skips the QuickTime
                  source outright, so each browser lands on the one it can key out. */}
              <video
                ref={videoRef}
                aria-label="Sonika memoji"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src="/memoji_clock_alpha.mov" type='video/quicktime; codecs="hvc1"' />
                <source src="/memoji_clock.webm" type="video/webm" />
              </video>
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
      </section>
    </SiteShell>
  );
}

const styles = {
  copy: {
    flex: "0 1 360px",
    minWidth: 0,
  },
  clockCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
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
    color: "#C5A35D",
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
