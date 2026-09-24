const API_BASE = "/api";

async function handle(res) {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchNotes() {
  try {
    const res = await fetch(`${API_BASE}/notes/`);
    return await handle(res);
  } catch {
    return [];
  }
}

export async function fetchNote(id) {
  const res = await fetch(`${API_BASE}/notes/${id}/`);
  return handle(res);
}

export async function createNote(title, content) {
  const res = await fetch(`${API_BASE}/notes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return handle(res);
}

export async function updateNote(id, title, content) {
  const res = await fetch(`${API_BASE}/notes/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return handle(res);
}

export async function deleteNote(id) {
  const res = await fetch(`${API_BASE}/notes/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Delete failed with status ${res.status}`);
  }
}