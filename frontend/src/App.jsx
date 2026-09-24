import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import NotesPage from "./components/NotesPage.jsx";
import NoteDetailPage from "./components/NoteDetailPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:id" element={<NoteDetailPage />} />
    </Routes>
  );
}