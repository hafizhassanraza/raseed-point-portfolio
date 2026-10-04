import { useEffect, useState } from "react";

export default function Recording({ frames }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const frame = frames[index];
  const duration = 4200;

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
    setProgress(0);
  }, [frames]);

  useEffect(() => {
    if (!playing) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const next = Math.min(1, (now - start) / duration);
      setProgress(next);
      if (next >= 1) {
        setIndex((current) => (current + 1) % frames.length);
        setProgress(0);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, index, frames.length]);

  function go(next) {
    setIndex((next + frames.length) % frames.length);
    setProgress(0);
  }

  return (
    <div className="recording">
      <img key={frame.src} src={frame.src} alt={frame.title} />
      <div className="recording-copy">
        <strong>{frame.title}</strong>
        <p>{frame.caption}</p>
      </div>
      <ol className="chapters">
        {frames.map((item, itemIndex) => (
          <li key={item.title}>
            <button
              type="button"
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => go(itemIndex)}
            >
              <span>{String(itemIndex + 1).padStart(2, "0")}</span>
              {item.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="controls">
        <button type="button" className="btn btn-solid" onClick={() => setPlaying((value) => !value)}>
          {playing ? "Pause" : "Play"}
        </button>
        <button type="button" className="btn btn-line" onClick={() => go(index - 1)}>
          Previous
        </button>
        <button type="button" className="btn btn-line" onClick={() => go(index + 1)}>
          Next
        </button>
        <div className="scrub" aria-hidden="true">
          <span style={{ width: `${playing ? progress * 100 : 0}%` }} />
        </div>
        <span className="count">
          {String(index + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
