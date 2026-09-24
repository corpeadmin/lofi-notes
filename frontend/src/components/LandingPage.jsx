import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark-mode");
    } else if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark-mode");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark-mode", prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    document.documentElement.classList.toggle("dark-mode", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className="page landing">
      <main className="landing-card">
        <p className="eyebrow">a cozy little place for your thoughts</p>

        <h1>Lofi Notes</h1>

        <p className="tagline">
          Soft beats in the background, and a quiet corner to write things
          down. Keep your notes saved in one calm, simple place.
        </p>

        <div className="landing-actions">
          <Link to="/notes" className="btn primary">
            Open my notes
          </Link>

          <Link to="/notes" className="btn ghost">
            Peek inside
          </Link>

          <button className="btn ghost" onClick={toggleDarkMode}>
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <div className="now-playing">
          now playing: your notes, on vinyl
        </div>
      </main>
    </div>
  );
}
