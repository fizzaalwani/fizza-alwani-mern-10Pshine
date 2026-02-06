// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import NotesList from "../components/NotesList";
// import NoteEditor from "../components/NoteEditor";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [notes, setNotes] = useState([]);
//   const [activeNote, setActiveNote] = useState(null);

//   const navigate = useNavigate()


//   useEffect(() => {
//     const token = localStorage.getItem("accessToken")
//     if (!token) {
//       navigate('/login')
//     }
//   }, [])

//   return (
//     <div className="min-h-screen flex bg-[#F7F3EF]">
//       <Sidebar />

//       <main className="flex-1 p-6 grid grid-cols-1  gap-6">
//         {/* <NotesList notes={notes} onSelect={setActiveNote} /> */}
//         {/* <NoteEditor note={activeNote} /> */}
//         <NoteEditor
//           note={{ title: "Test", content: "" }}
//           onChange={() => { }}
//           onSave={() => { }}
//           onDelete={() => { }}
//         />
//       </main>
//     </div>
//   );
// }

import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="h-screen flex bg-[#F7F3EF] overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-6">
        <NoteEditor />
      </main>
    </div>
  );
}