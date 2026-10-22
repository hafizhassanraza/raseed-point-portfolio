import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Icon from "../components/Icons.jsx";
import ScrollStory, { useStoryNav } from "../components/ScrollStory.jsx";
import { industries, packages, pains, platformTour } from "../site.js";

const CARD_IN = [
  { x: 72, y: 28, scale: 0.9 },
  { x: 128, y: 8, scale: 0.9 },
  { x: 64, y: 72, scale: 0.9 },
  { x: 136, y: 56, scale: 0.9 },
];
const CARD_OUT = [
  { x: -86, y: -18, scale: 1.05 },
  { x: -150, y: -24, scale: 0.88 },
  { x: -64, y: -92, scale: 0.88 },
  { x: -168, y: -48, scale: 0.86 },
];

export default function Home() {
  const parts = platformTour.parts;
  const scenes = [
    { id: "hero", label: "Home", render: (motion) => <Hero motion={motion} /> },
    { id: "platform", label: "One platform", render: (motion) => <Platform motion={motion} parts={parts} /> },
    { id: "screens", label: "Screens", render: (motion) => <Parts motion={motion} parts={parts} /> },
    { id: "day", label: "The usual day", render: (motion) => <Day motion={motion} /> },
    { id: "industries", label: "Industries", render: (motion) => <Industries motion={motion} /> },
    { id: "pricing", label: "Pricing", render: (motion) => <Pricing motion={motion} /> },
    { id: "close", label: "Contact", render: (motion) => <Close motion={motion} /> },
  ];

  return <ScrollStory scenes={scenes} />;
}

function useIntro() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const next = Math.min(1, (now - start) / 760);
      setValue(1 - Math.pow(1 - next, 3));
      if (next < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return value;
}

function delayT(value, delay) {
  if (delay <= 0) return value;
  return Math.min(1, Math.max(0, (value - delay) / (1 - delay)));
}

function piece(motion, { from = {}, to = {}, enterDelay = 0, exitDelay = 0 } = {}) {
  const leaving = motion.exit > 0.001;
  const t = leaving ? delayT(motion.exit, exitDelay) : delayT(motion.enter, enterDelay);
  const source = leaving ? to : from;
  const amount = leaving ? t : 1 - t;
  const x = (source.x || 0) * amount;
  const y = (source.y || 0) * amount;
  const scale = 1 + ((source.scale ?? 1) - 1) * amount;
  const opacity = leaving ? 1 - t : t;
  if (opacity > 0.995 && Math.abs(x) < 0.4 && Math.abs(y) < 0.4 && Math.abs(scale - 1) < 0.004) return undefined;
  return {
    opacity,
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    transformOrigin: "center center",
  };
}

function Hero({ motion }) {
  const intro = useIntro();
  const play = motion.exit > 0.001 ? motion : { ...motion, enter: Math.min(motion.enter, intro) };
  return (
    <div className="story-move">
      <section className="hero">
        <div className="hero-copy" style={piece(play, { from: { y: 36 }, to: { y: -48 } })}>
          <h1>
            Business Software
            <br />
            for <em>Small Businesses</em>
          </h1>
          <p className="lede">
            Raseed Point keeps <strong>invoicing, accounting, and inventory</strong> in one system. The bill, the stock, and the balance stay under the shop’s own name.
          </p>
          <div className="actions">
            <Link className="btn btn-solid" to="/contact">
              Contact Us
            </Link>
            <Link className="btn btn-line" to="/demo">
              Watch the demo
            </Link>
          </div>
        </div>
        <div className="hero-stage" style={piece(play, { from: { x: 56, scale: 0.96 }, to: { x: 42, y: 18, scale: 0.86 }, enterDelay: 0.1 })}>
          <div className="shot-frame">
            <img src="/screenshots/dashboard.png" alt="The day, at a glance" />
          </div>
        </div>
      </section>
    </div>
  );
}

const PLATFORM_ICONS = {
  "inventory-management": "/icons/inventory.svg",
  invoicing: "/icons/invoicing.svg",
  accounting: "/icons/accounting.svg",
  pos: "/icons/pos.svg",
};

function Platform({ motion, parts }) {
  return (
    <div className="story-move">
      <div className="story-platform">
        <div className="platform-head" style={piece(motion, { from: { y: 26 }, to: { y: -40 } })}>
          <h2>
            {platformTour.titleLead} <em>{platformTour.titleMark}</em>
          </h2>
        </div>
        <div className="platform-grid">
          {parts.map((part, index) => (
            <article
              className="platform-card"
              key={part.id}
              style={piece(motion, {
                from: CARD_IN[index],
                to: CARD_OUT[index],
                enterDelay: 0.06 + index * 0.07,
                exitDelay: index === 0 ? 0.16 : 0,
              })}
            >
              <header>
                <img src={PLATFORM_ICONS[part.id]} alt="" width="80" height="80" />
                <div>
                  <h3>{part.name}</h3>
                  <p>{part.disc}</p>
                </div>
              </header>
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
      </div>
    </div>
  );
}

function Pane({ part }) {
  return (
    <>
      <div>
        <h2>{part.name}</h2>
        <p className="story-detail">{part.detail}</p>
        <ul className="story-links">
          {part.components.map((component) => (
            <li key={component.name}>
              <Link to={component.to}>
                <strong>{component.name}</strong>
                <span>{component.line}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="visit-more" to={part.to}>
          See this screen
        </Link>
      </div>
      <div className="story-shot">
        <div className="visit-screen" style={{ "--open": 1 }}>
          <div className="visit-screen-bar">
            <i />
            <span>{part.name}</span>
          </div>
          <div className="visit-screen-body">
            <img src={part.shot} alt={part.alt} />
          </div>
        </div>
      </div>
    </>
  );
}

function Parts({ motion, parts }) {
  const { claimStep, reduced } = useStoryNav();
  const frameRef = useRef(null);
  const trackRef = useRef(null);
  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const tweenRef = useRef(null);
  const [index, setIndex] = useState(0);
  const wasActive = useRef(false);

  const place = (next, animate) => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track) return;
    const x = -next * frame.clientWidth;
    tweenRef.current?.kill();
    if (!animate) {
      gsap.set(track, { x });
      busyRef.current = false;
      return;
    }
    busyRef.current = true;
    tweenRef.current = gsap.to(track, {
      x,
      duration: 0.85,
      ease: "power3.inOut",
      roundProps: "x",
      onComplete: () => {
        busyRef.current = false;
      },
    });
  };

  const go = (next, force) => {
    const clamped = Math.max(0, Math.min(parts.length - 1, next));
    if (!force && busyRef.current) return;
    if (clamped === indexRef.current) return;
    indexRef.current = clamped;
    setIndex(clamped);
    place(clamped, !reduced);
  };

  useLayoutEffect(() => {
    place(indexRef.current, false);
  }, []);

  useEffect(() => {
    if (!motion.active) {
      wasActive.current = false;
      return;
    }
    if (wasActive.current) return;
    wasActive.current = true;
    const next = motion.exit > 0.02 ? parts.length - 1 : 0;
    indexRef.current = next;
    setIndex(next);
    place(next, false);
  }, [motion.active, motion.exit, parts.length]);

  useEffect(() => {
    if (!motion.active || reduced) return undefined;
    return claimStep((dir) => {
      const next = indexRef.current + dir;
      if (next < 0 || next >= parts.length) return false;
      go(next, false);
      return true;
    });
  }, [motion.active, reduced, parts.length, claimStep]);

  useEffect(() => {
    if (!motion.active || reduced) return undefined;
    const onKey = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(indexRef.current + 1, false);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(indexRef.current - 1, false);
      }
    };
    const onResize = () => place(indexRef.current, false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [motion.active, reduced]);

  useEffect(() => () => tweenRef.current?.kill(), []);

  const dock = (
    <nav className="mac-dock" aria-label="Platform">
      {parts.map((part, itemIndex) => (
        <button
          key={part.id}
          type="button"
          className={itemIndex === index ? "is-on" : undefined}
          aria-current={itemIndex === index ? "true" : undefined}
          aria-label={part.name}
          onClick={() => {
            if (reduced) {
              indexRef.current = itemIndex;
              setIndex(itemIndex);
              document.getElementById(`part-${part.id}`)?.scrollIntoView();
              return;
            }
            go(itemIndex, true);
          }}
        >
          <img src={PLATFORM_ICONS[part.id]} alt="" />
        </button>
      ))}
    </nav>
  );

  if (reduced) {
    return (
      <div className="dock-flat">
        {dock}
        {parts.map((part) => (
          <article className="dock-pane" id={`part-${part.id}`} key={part.id}>
            <Pane part={part} />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="story-move">
      <div className="dock-stage" style={piece(motion, { from: { x: 56 }, to: { y: -120, scale: 0.96 } })}>
        {dock}
        <div className="dock-window" ref={frameRef}>
          <div className="dock-track" ref={trackRef}>
            {parts.map((part) => (
              <article className="dock-pane" key={part.id} aria-hidden={part.id !== parts[index].id}>
                <Pane part={part} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Day({ motion }) {
  return (
    <div className="story-move" style={piece(motion, { from: { y: 110 }, to: { y: -120 } })}>
      <div className="story-block">
        <div className="section-head" style={piece(motion, { from: { y: 28 }, to: { y: -24 }, enterDelay: 0.06 })}>
          <p className="eyebrow">The usual day</p>
          <h2>
            Still running the shop on Excel, <em>WhatsApp, and paper?</em>
          </h2>
        </div>
        <ul className="problem-grid">
          {pains.map((item, index) => (
            <li
              key={item.title}
              style={piece(motion, {
                from: { y: 48, scale: 0.96 },
                to: { y: -20, scale: 0.96 },
                enterDelay: 0.1 + index * 0.06,
              })}
            >
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Industries({ motion }) {
  return (
    <div className="story-move" style={piece(motion, { from: { y: 110 }, to: { y: -120 } })}>
      <div className="story-block">
        <div className="section-head" style={piece(motion, { from: { y: 24 }, to: { y: -20 }, enterDelay: 0.05 })}>
          <p className="eyebrow">Industries</p>
          <h2>
            Counters that buy, <em>stock, and sell.</em>
          </h2>
          <p>The same system. The catalog is the shop’s.</p>
          <Link className="story-more" to="/industries">
            All industries
          </Link>
        </div>
        <ul className="industry-grid">
          {industries.map((item, index) => (
            <li
              key={item.name}
              style={piece(motion, {
                from: { y: 36, scale: 0.96 },
                to: { y: -16, scale: 0.96 },
                enterDelay: 0.08 + (index % 4) * 0.04,
              })}
            >
              <span className="fcard-icon">
                <Icon name={item.icon} />
              </span>
              <strong>{item.name}</strong>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Pricing({ motion }) {
  return (
    <div className="story-move" style={piece(motion, { from: { y: 110 }, to: { y: -120 } })}>
      <div className="story-block">
        <div className="section-head" style={piece(motion, { from: { y: 22 }, to: { y: -18 }, enterDelay: 0.05 })}>
          <p className="eyebrow">Pricing</p>
          <h2>
            Three ways <em>to start.</em>
          </h2>
          <p>The price is quoted for the shop. No rate is printed here.</p>
          <Link className="story-more" to="/pricing">
            Pricing details
          </Link>
        </div>
        <div className="package-grid">
          {packages.map((item, index) => (
            <article
              className={item.featured ? "package featured" : "package"}
              key={item.id}
              style={piece(motion, {
                from: { y: 28 + index * 16, scale: 0.96 },
                to: { y: -18, scale: 0.96 },
                enterDelay: 0.08 + index * 0.07,
              })}
            >
              {item.featured ? <span className="package-tag">Most shops</span> : null}
              <h3>{item.name}</h3>
              <p>{item.line}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="btn btn-solid" to={`/contact?package=${item.id}`}>
                Ask for {item.name}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Close({ motion }) {
  return (
    <div className="story-move">
      <div className="close-cta" style={piece(motion, { from: { y: 110, scale: 0.94 }, to: { y: -90, scale: 0.96 }, enterDelay: 0.04 })}>
        <p className="eyebrow">Next</p>
        <h2>
          See it on <em>your own catalog.</em>
        </h2>
        <p>Contact us. Bring the kind of parts you sell. The price is quoted for that shop.</p>
        <Link className="btn btn-solid" to="/contact">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
