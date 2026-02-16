

// import { useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import NoteEditor from "../components/NoteEditor";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   return (
//     <div className="h-screen flex bg-[#F7F3EF] overflow-hidden">
//       <Sidebar />

//       <main className="flex-1 p-6">
//         <NoteEditor />
//       </main>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { notes, activeNote, selectNote, fetchNotes } = useNotes();
  const [initialized, setInitialized] = useState(false);

  // Fetch notes after login
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, [navigate, fetchNotes]);

  // Select first note only once
  useEffect(() => {
    if (!initialized && notes.length > 0) {
      selectNote(notes[0]);
      setInitialized(true); // Prevent infinite loop
    }
  }, [notes, initialized, selectNote]);

  return (
    <div className="h-screen flex bg-[#F7F3EF] ">
      <Sidebar />
      <main className="flex-1 p-6">
        <NoteEditor />
      </main>
    </div>
  );
}
