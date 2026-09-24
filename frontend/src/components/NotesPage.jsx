import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createNote, deleteNote, fetchNotes } from "../api.js";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    setLoading(true);
    setNotes(await fetchNotes());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const note = await createNote(title.trim(), content.trim());
    setTitle("");
    setContent("");
    await load();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this note for good?")) return;
    await deleteNote(id);
    await load();
  }

  function formatDate(value) {
    if (!value) return "";
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="brand">
          &#9834; Lofi Notes
        </Link>
        <nav className="topbar-nav">
          <Link to="/focus" className="nav-link">
            Focus corner
          </Link>
        </nav>
      </header>

      <main className="content">
        <form className="note-form" onSubmit={handleCreate}>
          <h2>Write a new note</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="4"
            placeholder="A little thought, a plan, a doodle in words..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="btn primary">
            Save note
          </button>
        </form>

        {/* Gentle reminder to write things down (Git exercise: Option 2). */}
        <p className="notes-helper">Write something down.</p>

        <section className="notes-list">
          <h2>Notes</h2>
          {loading ? (
            <p className="muted">warming up the record player...</p>
          ) : notes.length === 0 ? (
            <p className="muted">no notes yet — write your first one above.</p>
          ) : (
            <ul>
              {notes.map((note) => (
                <li key={note.id} className="note-item">
                  <Link to={`/notes/${note.id}`} className="note-link">
                    <span className="note-title">{note.title}</span>
                    <span className="note-date">
                      {formatDate(note.updated_at)}
                    </span>
                  </Link>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}