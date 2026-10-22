import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useReducedMotion, AnimatePresence } from "motion/react";

/* Draggable image carousel, modelled on Motion's carousel example
   (examples.motion.dev/react/carousel): a horizontal track that overflows to the
   right so the next slide peeks in, a page snap on a zero-bounce spring, and
   prev/next arrows that fade out at either end. One slide moves per step and the
   caption under the track follows the active slide. */

const GAP = 20;
// The example settles ~90% of a page move in ~350ms with no overshoot.
const SPRING = { type: "spring", visualDuration: 0.4, bounce: 0 };

function Chevron({ flip }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d={flip ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Carousel({ block }) {
  const { slides } = block;
  const viewport = useRef(null);
  const [slideW, setSlideW] = useState(0);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const step = slideW + GAP;
  const last = slides.length - 1;

  // Slides are a fixed share of the column so the next one always peeks in,
  // whatever the column width.
  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return undefined;
    const measure = () => setSlideW(Math.round(el.clientWidth * (el.clientWidth < 600 ? 0.88 : 0.82)));
    measure();
    // Deferred a frame: resizing the slides inside the observer's own callback
    // trips the browser's "ResizeObserver loop" error.
    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  // Re-pin the track when the column resizes, without animating.
  useEffect(() => {
    x.set(-index * step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const goTo = (i) => {
    const next = Math.max(0, Math.min(last, i));
    setIndex(next);
    animate(x, -next * step, reduceMotion ? { duration: 0 } : SPRING);
  };

  const onDragEnd = (_, info) => {
    // A flick advances a slide even when it was short; otherwise snap to the nearest.
    const projected = -x.get() - info.velocity.x * 0.2;
    let next = Math.round(projected / step);
    if (next === index && Math.abs(info.offset.x) > 40) next += info.offset.x < 0 ? 1 : -1;
    goTo(next);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  };

  return (
    <figure
      className="cs-carousel"
      aria-roledescription="carousel"
      aria-label={block.label || "Image carousel"}
      onKeyDown={onKeyDown}
    >
      <div className="cs-carousel-viewport" ref={viewport}>
        <motion.ul
          className="cs-carousel-track"
          style={{ x, gap: GAP }}
          drag="x"
          dragConstraints={{ left: -last * step, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={onDragEnd}
        >
          {slides.map((slide, i) => (
            <li
              key={slide.src}
              className="cs-carousel-slide"
              style={{ width: slideW || "82%" }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
              onClick={() => i !== index && goTo(i)}
            >
              <img src={slide.src} alt={slide.alt || ""} draggable={false} />
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="cs-carousel-controls">
        <div className="cs-carousel-arrows">
          <button
            type="button"
            aria-label="Previous slide"
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
          >
            <Chevron flip />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={index === last}
            onClick={() => goTo(index + 1)}
          >
            <Chevron />
          </button>
        </div>
        <p className="cs-carousel-count" aria-live="polite">
          {index + 1} / {slides.length}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {slides[index].caption && (
          <motion.figcaption
            key={index}
            className="cs-media-caption"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            {slides[index].caption}
          </motion.figcaption>
        )}
      </AnimatePresence>
    </figure>
  );
}
