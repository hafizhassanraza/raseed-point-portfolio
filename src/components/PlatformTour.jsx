import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icons.jsx";
import { platformTour } from "../site.js";

const STICKY_TOP = 74;
const PARTS = platformTour.parts;
const HOLD = 0.18;
const MOVE = 0.32;
const DRIFT = [
  { x: 0, y: 0 },
  { x: -104, y: 0 },
  { x: 0, y: -108 },
  { x: -104, y: -108 },
];

function scene(progress) {
  if (progress <= HOLD) return { shift: 0, tour: 0 };
  if (progress <= MOVE) {
    const t = (progress - HOLD) / (MOVE - HOLD);
    return { shift: ease(t), tour: 0 };
  }
  return { shift: 1, tour: (progress - MOVE) / (1 - MOVE) };
}

function ease(value) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

function opensFor(progress) {
  const count = PARTS.length;
  const scaled = Math.min(count - 0.0001, Math.max(0, progress) * count);
  const index = Math.floor(scaled);
  const local = scaled - index;
  const opens = Array(count).fill(0);
  const closeAt = 0.78;
  const openAt = 0.2;

  if (index === 0) {
    if (local < 0.18) opens[0] = ease(local / 0.18);
    else if (local > closeAt) opens[0] = ease(1 - (local - closeAt) / (1 - closeAt));
    else opens[0] = 1;
    return opens;
  }

  if (index === count - 1) {
    opens[index] = local < openAt ? ease(local / openAt) : 1;
    return opens;
  }

  if (local < openAt) opens[index] = ease(local / openAt);
  else if (local > closeAt) opens[index] = ease(1 - (local - closeAt) / (1 - closeAt));
  else opens[index] = 1;
  return opens;
}

function TourBody({ opens, progress, shown, shift }) {
  const openNow = Math.max(...opens);
  const part = PARTS[shown];

  return (
    <div
      className="visit-layout"
      style={{ opacity: shift, pointerEvents: shift > 0.85 ? "auto" : "none" }}
      aria-hidden={shift < 0.4}
    >
      <div className="visit-rail">
        <span className="visit-meter" style={{ transform: `scaleY(${progress})` }} aria-hidden="true" />
        <ol>
        {PARTS.map((item, index) => {
          const open = opens[index];
          const content = Math.max(0, (open - 0.15) / 0.85);
          const current = index === shown;
          return (
            <li
              key={item.id}
              className={current ? "visit-item is-current" : "visit-item"}
              style={{ "--open": open }}
              aria-current={current ? "true" : undefined}
            >
              <div className="visit-item-top">
                <span className="visit-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="fcard-icon">
                  <Icon name={item.icon} />
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.disc}</em>
                </span>
              </div>
              <div className="visit-extra" style={{ gridTemplateRows: `${content}fr` }}>
                <div style={{ opacity: content }}>
                  <p>{item.detail}</p>
                  <ul>
                    {item.components.map((component) => (
                      <li key={component.name}>
                        <Link to={component.to}>
                          <strong>{component.name}</strong>
                          <span>{component.line}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="visit-more" to={item.to}>
                    See this screen
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
        </ol>
      </div>

      <div className="visit-stage">
        <div className="visit-screen" style={{ "--open": openNow }}>
          <div className="visit-screen-bar">
            <i />
            <span>{part.name}</span>
            <b>
              {String(shown + 1).padStart(2, "0")} / {String(PARTS.length).padStart(2, "0")}
            </b>
          </div>
          <div className="visit-screen-body">
            {PARTS.map((item, index) => (
              <img
                key={item.id}
                src={item.shot}
                alt={opens[index] > 0.35 ? item.alt : ""}
                aria-hidden={opens[index] < 0.35}
                style={{
                  opacity: opens[index],
                  transform: `scale(${0.94 + opens[index] * 0.06}) translateY(${(1 - opens[index]) * 18}px)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformTour() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [opens, setOpens] = useState(() => opensFor(0));
  const [reduced, setReduced] = useState(false);
  const keyRef = useRef("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    let frame = 0;
    const update = () => {
      const node = scrollRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(1, node.offsetHeight - (window.innerHeight - STICKY_TOP));
      const passed = Math.min(Math.max(STICKY_TOP - rect.top, 0), travel);
      const next = passed / travel;
      const { tour } = scene(next);
      const nextOpens = opensFor(tour);
      const key = `${next.toFixed(3)}|${nextOpens.map((value) => value.toFixed(3)).join(",")}`;
      if (key === keyRef.current) return;
      keyRef.current = key;
      setProgress(next);
      setOpens(nextOpens);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const { shift, tour } = scene(progress);
  const focus = opens.findIndex((value) => value > 0.2);
  const shown = focus === -1 ? Math.min(PARTS.length - 1, Math.floor(tour * PARTS.length + 0.001)) : focus;
  const boardOpacity = shift < 0.55 ? 1 : 1 - (shift - 0.55) / 0.45;

  const board = (
    <div className="visit-board" aria-hidden={shift > 0.8} style={{ opacity: boardOpacity }}>
      {PARTS.map((part, index) => (
        <article
          className="board-card"
          key={part.id}
          style={{
            transform: `translate(${shift * DRIFT[index].x}%, ${shift * DRIFT[index].y}%) scale(${1 - shift * 0.42})`,
          }}
        >
          <div className="visit-item-top">
            <span className="visit-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="fcard-icon">
              <Icon name={part.icon} />
            </span>
            <span>
              <strong>{part.name}</strong>
              <em>{part.disc}</em>
            </span>
          </div>
          <ul>
            {part.components.map((component) => (
              <li key={component.name}>
                <Link to={component.to}>
                  <strong>{component.name}</strong>
                  <span>{component.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );

  return (
    <div className="platform" id="platform">
      {reduced ? (
        <section className="section">
          <div className="platform-head">
            <p className="eyebrow">One platform</p>
            <h2>
              {platformTour.titleLead} <em>{platformTour.titleMark}</em>
            </h2>
          </div>
          <div className="visit-board visit-board-static">{board.props.children}</div>
        </section>
      ) : (
        <div className="visit-scroll" ref={scrollRef}>
          <div className="visit-pin">
            <div
              className="platform-head"
              style={{
                opacity: 1 - shift,
                maxHeight: `${(1 - shift) * 168}px`,
                marginBottom: `${(1 - shift) * 12}px`,
                overflow: "hidden",
                pointerEvents: shift > 0.6 ? "none" : "auto",
              }}
            >
              <p className="eyebrow">One platform</p>
              <h2>
                {platformTour.titleLead} <em>{platformTour.titleMark}</em>
              </h2>
            </div>
            <div className="visit-frame">
              {board}
              <p className="visually-hidden" aria-live="polite">
                {shift > 0.85 ? PARTS[shown].name : "All four parts"}
              </p>
              <TourBody opens={opens} progress={tour} shown={shown} shift={shift} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
