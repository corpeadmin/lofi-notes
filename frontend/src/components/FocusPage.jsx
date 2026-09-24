import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PRESETS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "25 min", seconds: 25 * 60 },
];

const VIBES = [
  "One thought at a time.",
  "Breathe in, breathe out.",
  "You've got this.",
  "Small steps count too.",
  "Stay loose, stay focused.",
];

const TICK = 1000;

function format(s) {
  const minutes = Math.floor(s / 60);
  const rest = s % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function FocusPage() {
  const [total, setTotal] = useState(15 * 60);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [vibe, setVibe] = useState(VIBES[0]);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      TICK
    );
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
    }
  }, [secondsLeft, isRunning]);

  function choosePreset(seconds) {
    setTotal(seconds);
    setSecondsLeft(seconds);
    setIsRunning(false);
    setVibe(VIBES[Math.floor(Math.random() * VIBES.length)]);
  }

  function handleStart() {
    if (secondsLeft === 0) setSecondsLeft(total);
    setVibe(VIBES[Math.floor(Math.random() * VIBES.length)]);
    setIsRunning(true);
  }

  function handleReset() {
    setSecondsLeft(total);
    setIsRunning(false);
  }

  const finished = secondsLeft === 0 && !isRunning;
  const started = secondsLeft < total || isRunning;
  const progress = total > 0 ? secondsLeft / total : 0;

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="brand">
          &#9834; Lofi Notes
        </Link>
        <nav>
          <Link to="/notes" className="nav-link">
            All notes
          </Link>
        </nav>
      </header>

      <main className="content focus-content">
        <p className="eyebrow">focus corner</p>
        <h1 className="focus-title">A quiet corner to focus.</h1>

        <div
          className={`focus-card${isRunning ? " running" : ""}${
            finished ? " done" : ""
          }`}
        >
          <div
            className="focus-ring"
            style={{
              background: isRunning
                ? `conic-gradient(var(--accent) ${progress * 360}deg, var(--line) 0deg)`
                : "var(--line)",
            }}
          >
            <div className="focus-ring-inner">
              <span className="focus-time">{format(secondsLeft)}</span>
              <span className="focus-state">
                {finished ? "well done" : isRunning ? "focusing..." : "paused"}
              </span>
            </div>
          </div>

          <p className="focus-vibe">
            {finished
              ? "You did it. Take a breath."
              : isRunning
                ? vibe
                : started
                  ? "Paused — the record still spins for you."
                  : "Pick a length and press start."}
          </p>

          <div className="focus-presets">
            {PRESETS.map((p) => (
              <button
                key={p.seconds}
                className={`btn preset${total === p.seconds ? " active" : ""}`}
                onClick={() => choosePreset(p.seconds)}
                disabled={isRunning}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="row-actions focus-actions">
            {!isRunning ? (
              <button className="btn primary" onClick={handleStart}>
                {finished ? "Go again" : started ? "Resume" : "Start"}
              </button>
            ) : (
              <button
                className="btn ghost"
                onClick={() => setIsRunning(false)}
              >
                Pause
              </button>
            )}
            <button className="btn ghost" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <p className="focus-footnote">
          &#9835; {finished ? "now playing: the sound of accomplishment" : isRunning ? "now playing: lo-fi while you focus" : "now playing: silence, and that is okay"}
        </p>
      </main>
    </div>
  );
}