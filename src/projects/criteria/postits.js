import React, { useState, useEffect } from "react";
import { CARD_SORT } from "./criteriaData";

/* Sticky notes that continuously reshuffle between two arrangements — the card-sort
   exercise run with 10 managers. Ported unchanged from ProjectPage: coordinates come
   straight from the Figma frames (px, in a frameWidth x frameHeight canvas), and
   percentage positioning plus a locked aspect-ratio wrapper keeps everything
   responsive without distorting the (square) notes. */
export default function PostItScramble() {
  const { notes, frameWidth, frameHeight, noteSize, intervalMs } = CARD_SORT;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p === 0 ? 1 : 0)), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  // A little per-note rotation, seeded from index, so the shuffle reads as
  // hand-placed rather than a mechanical swap.
  const rotationFor = (idx, ph) => {
    const base = ((idx * 37) % 7) - 3; // -3..3
    return ph === 0 ? base : -base;
  };

  return (
    <div className="cs-postits">
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${frameWidth} / ${frameHeight}`,
        }}
      >
        {notes.map((note, idx) => {
          const pos = phase === 0 ? note.start : note.end;
          return (
            <div
              key={note.label}
              style={{
                position: "absolute",
                left: `${(pos.x / frameWidth) * 100}%`,
                top: `${(pos.y / frameHeight) * 100}%`,
                width: `${(noteSize / frameWidth) * 100}%`,
                height: `${(noteSize / frameHeight) * 100}%`,
                background: "#F9DE8B",
                boxShadow: "0 6px 16px rgba(0,0,0,0.28)",
                // Padding percentages resolve against the containing block (the full
                // frame), not this note's own size — so this is scaled down to read as
                // ~8% of the note.
                padding: `${((0.08 * noteSize) / frameWidth) * 100}%`,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                overflow: "hidden",
                transform: `rotate(${rotationFor(idx, phase)}deg)`,
                transition: `left ${intervalMs * 0.55}ms cubic-bezier(.4,0,.2,1), top ${
                  intervalMs * 0.55
                }ms cubic-bezier(.4,0,.2,1), transform ${intervalMs * 0.55}ms ease`,
                transitionDelay: `${(idx % 5) * 60}ms`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(8px, 0.85vw, 11px)",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: "#3A3115",
                  textAlign: "left",
                }}
              >
                {note.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
