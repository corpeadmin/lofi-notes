import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page landing">
      <header className="topbar landing-topbar">
        <Link to="/" className="brand">
          &#9834; Lofi Notes
        </Link>
        <nav className="topbar-nav">
          <Link to="/notes" className="nav-link">
            All notes
          </Link>
          <Link to="/focus" className="nav-link">
            Focus corner
          </Link>
        </nav>
      </header>
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
          <Link to="/focus" className="btn ghost">
            Visit the focus corner
          </Link>
        </div>
        <div className="now-playing">now playing: your notes, on vinyl</div>
      </main>
    </div>
  );
}