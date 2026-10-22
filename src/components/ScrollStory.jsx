import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export const StoryNav = createContext({
  jump() {},
  progress: 0,
  reduced: false,
  claimStep() {
    return () => {};
  },
});

export function useStoryNav() {
  return useContext(StoryNav);
}

export function sceneMotion(index, progress) {
  const delta = progress - index;
  if (delta <= -1 || delta >= 1) {
    return { visible: false, enter: 0, exit: 1, active: false };
  }
  if (delta >= 0) {
    return { visible: delta < 0.992, enter: 1, exit: delta, active: delta < 0.58 };
  }
  const enter = delta + 1;
  return { visible: enter > 0.008, enter, exit: 0, active: enter > 0.58 };
}

const HELD = { visible: true, enter: 1, exit: 0, active: true };

function shownIndex(progress, count) {
  const index = Math.min(count - 1, Math.max(0, Math.floor(progress)));
  if (index >= count - 1) return count - 1;
  return progress - index < 0.5 ? index : index + 1;
}

export default function ScrollStory({ scenes }) {
  const rootRef = useRef(null);
  const progressRef = useRef(0);
  const proxy = useRef({ p: 0 });
  const tweenRef = useRef(null);
  const runRef = useRef(0);
  const busyRef = useRef(false);
  const stepHandler = useRef(null);
  const claimStep = useCallback((handler) => {
    stepHandler.current = handler;
    return () => {
      if (stepHandler.current === handler) stepHandler.current = null;
    };
  }, []);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const count = scenes.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  function goTo(goal, force) {
    const next = Math.max(0, Math.min(count - 1, goal));
    if (!force && busyRef.current) return;
    tweenRef.current?.kill();
    const from = progressRef.current;
    if (Math.abs(from - next) < 0.001) {
      progressRef.current = next;
      proxy.current.p = next;
      setProgress(next);
      busyRef.current = false;
      return;
    }
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progressRef.current = next;
      proxy.current.p = next;
      setProgress(next);
      busyRef.current = false;
      return;
    }
    let startFrom = from;
    if (force && Math.abs(next - from) > 1.01) {
      startFrom = next > from ? next - 1 : next + 1;
    }
    proxy.current.p = startFrom;
    progressRef.current = startFrom;
    setProgress(startFrom);
    const run = ++runRef.current;
    busyRef.current = true;
    tweenRef.current = gsap.to(proxy.current, {
      p: next,
      duration: 1.15,
      ease: "power3.inOut",
      onUpdate: () => {
        progressRef.current = proxy.current.p;
        setProgress(proxy.current.p);
      },
      onComplete: () => {
        if (runRef.current === run) busyRef.current = false;
      },
    });
  }

  function step(dir) {
    if (busyRef.current) return;
    if (stepHandler.current?.(dir)) return;
    goTo(Math.round(progressRef.current) + dir, false);
  }

  function jump(index) {
    goTo(index, true);
  }

  useLayoutEffect(() => {
    if (reduced) return undefined;
    document.documentElement.classList.add("landing-lock");
    window.scrollTo(0, 0);
    return () => document.documentElement.classList.remove("landing-lock");
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;
    let accum = 0;
    let touchX = 0;
    let touchY = 0;

    const scaled = (delta, mode) => (mode === 1 ? delta * 16 : mode === 2 ? delta * window.innerHeight : delta);

    const onWheel = (event) => {
      if (document.querySelector(".links.open")) return;
      event.preventDefault();
      const y = scaled(event.deltaY, event.deltaMode);
      const x = scaled(event.deltaX, event.deltaMode);
      const sideways = stepHandler.current && Math.abs(x) > Math.abs(y);
      accum += sideways ? x : y;
      if (Math.abs(accum) < 28) return;
      const dir = accum > 0 ? 1 : -1;
      accum = 0;
      step(dir);
    };

    const onTouchStart = (event) => {
      touchX = event.touches[0]?.clientX ?? 0;
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event) => {
      if (document.querySelector(".links.open")) return;
      event.preventDefault();
    };
    const onTouchEnd = (event) => {
      const endX = event.changedTouches[0]?.clientX ?? touchX;
      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const dx = touchX - endX;
      const dy = touchY - endY;
      if (Math.abs(dx) < 42 && Math.abs(dy) < 42) return;
      const sideways = stepHandler.current && Math.abs(dx) > Math.abs(dy);
      const delta = sideways ? dx : dy;
      step(delta > 0 ? 1 : -1);
    };
    const onKey = (event) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (document.querySelector(".links.open")) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      tweenRef.current?.kill();
      busyRef.current = false;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduced, count]);

  if (reduced) {
    const jump = (index) => {
      const id = scenes[index]?.id;
      if (!id) return;
      document.getElementById(`scene-${id}`)?.scrollIntoView();
    };
    return (
      <StoryNav.Provider value={{ jump, progress: 0, reduced: true, claimStep }}>
        <div className="story-flat">
          {scenes.map((scene) => (
            <section key={scene.id} id={`scene-${scene.id}`} className="story-flat-scene" aria-label={scene.label}>
              {scene.render(HELD)}
            </section>
          ))}
        </div>
      </StoryNav.Provider>
    );
  }

  const motions = scenes.map((_, index) => sceneMotion(index, progress));
  const active = shownIndex(progress, count);

  return (
    <StoryNav.Provider value={{ jump, progress, reduced: false, claimStep }}>
      <div className="story-scroll" ref={rootRef}>
        <div className="story-pin">
          {scenes.map((scene, index) => {
            const motion = motions[index];
            return (
              <section
                key={scene.id}
                className="story-scene"
                aria-label={scene.label}
                aria-hidden={!motion.visible}
                inert={!motion.active}
                style={{
                  visibility: motion.visible ? "visible" : "hidden",
                  pointerEvents: motion.active ? "auto" : "none",
                  zIndex: motion.exit > 0 ? 2 : 3,
                }}
              >
                {scene.render(motion)}
              </section>
            );
          })}
          <div className={progress > 0.2 ? "story-rail is-gone" : "story-rail"} aria-hidden="true">
            <span className="story-cue" />
          </div>
          <nav className="story-dots" aria-label="On this page">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                className={index === active ? "is-on" : undefined}
                aria-current={index === active ? "true" : undefined}
                aria-label={scene.label}
                onClick={() => jump(index)}
              />
            ))}
          </nav>
        </div>
      </div>
    </StoryNav.Provider>
  );
}
