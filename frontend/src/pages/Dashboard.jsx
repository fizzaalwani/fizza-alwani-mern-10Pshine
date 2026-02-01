import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  return (
    <div className="min-h-screen flex bg-[#F7F3EF]">
      <Sidebar />

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <NotesList notes={notes} onSelect={setActiveNote} />
        <NoteEditor note={activeNote} />
      </main>
    </div>
  );
}
