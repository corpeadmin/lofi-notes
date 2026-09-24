import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNote, fetchNote, updateNote } from "../api.js";

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    try {
      const data = await fetchNote(id);
      setNote(data);
      setTitle(data.title);
      setContent(data.content);
    } catch {
      setNotFound(true);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  function startEditing() {
    setTitle(note.title);
    setContent(note.content);
    setEditing(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const updated = await updateNote(id, title.trim(), content.trim());
    setNote(updated);
    setEditing(false);
  }

  async function handleDelete() {
    if (!window.confirm("Delete this note for good?")) return;
    await deleteNote(id);
    navigate("/notes");
  }

  if (notFound) {
    return (
      <div className="page">
        <main className="content">
          <h1>Hmm, that note went missing.</h1>
          <p className="muted">It might have been deleted already.</p>
          <Link to="/notes" className="btn primary">
            Back to notes
          </Link>
        </main>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="page">
        <main className="content">
          <p className="muted">finding the right notebook...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="topbar">
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

      <main className="content note-detail">
        {editing ? (
          <form className="note-form" onSubmit={handleSave}>
            <h2>Editing note</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows="8"
              placeholder="A little thought, a plan, a doodle in words..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="row-actions">
              <button type="submit" className="btn primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1>{note.title}</h1>
            <p className="note-date">
              created {new Date(note.created_at).toLocaleString()} · updated{" "}
              {new Date(note.updated_at).toLocaleString()}
            </p>
            <p className="note-content">
              {note.content || <span className="muted">(empty note)</span>}
            </p>
            <div className="row-actions">
              <button className="btn primary" onClick={startEditing}>
                Edit
              </button>
              <button className="btn danger" onClick={handleDelete}>
                Delete
              </button>
              <Link to="/notes" className="btn ghost">
                Back to all notes
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}