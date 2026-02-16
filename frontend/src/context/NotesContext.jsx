

// import { createContext, useContext, useEffect, useState } from "react";
// import { useCallback } from "react";
// import API from "../services/api";

// const NotesContext = createContext();

// export const NotesProvider = ({ children }) => {
//   const [notes, setNotes] = useState([]);
//   const [activeNote, setActiveNote] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isDraft, setIsDraft] = useState(false); // New: Track if it's a draft

//   // Fetch all notes
//   // const fetchNotes = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await API.get('/notes/get');
//   //     console.log("Notes api response:", response.data);

//   //     if (response.data.success) {
//   //       const sortedNotes = response.data.notes.sort(
//   //         (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//   //       );
//   //       setNotes(sortedNotes);
//   //     }
//   //   } catch (err) {
//   //     console.log(err.message || "Failed to fetch notes");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   // Inside NotesProvider
//   const fetchNotes = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await API.get("/notes/get");
//       if (response.data.success) {
//         const sortedNotes = response.data.notes.sort(
//           (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//         );
//         setNotes(sortedNotes);
//       }
//     } catch (err) {
//       console.log(err.message || "Failed to fetch notes");
//     } finally {
//       setLoading(false);
//     }
//   }, []);


//   // Create new DRAFT note (doesn't save to DB yet)
//   const createNote = () => {
//     const draftNote = {
//       _id: `draft-${Date.now()}`, // Temporary ID
//       title: "",
//       content: "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     setActiveNote(draftNote);
//     setIsEditing(true);
//     setIsDraft(true); // Mark as draft
//   };

//   // Save note (creates or updates in DB)
//   const saveNote = async (noteData) => {
//     try {
//       // If it's a draft (new note), create it
//       if (isDraft) {
//         const response = await API.post('/notes/create', {
//           title: noteData.title || "Untitled",
//           content: noteData.content || " "
//         });

//         if (response.data.success) {
//           const newNote = response.data.note;
//           setNotes([newNote, ...notes]);
//           setActiveNote(newNote);
//           setIsDraft(false);
//           setIsEditing(false);
//           return true;
//         }
//       }
//       // Otherwise, update existing note
//       else {
//         const response = await API.post(`/notes/update/${noteData._id}`, {
//           title: noteData.title,
//           content: noteData.content
//         });

//         if (response.data.success) {
//           const updatedNote = response.data.note;
//           const updatedNotes = notes.map(note =>
//             note._id === noteData._id ? updatedNote : note
//           ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

//           setNotes(updatedNotes);
//           setActiveNote(updatedNote);
//           setIsEditing(false);
//           return true;
//         }
//       }
//     } catch (err) {
//       console.log(err.message || "Failed to save note");
//       return false;
//     }
//   };

//   // Update note (for existing notes)
//   const updateNote = async (noteId, updates) => {
//     try {
//       const response = await API.post(`/notes/update/${noteId}`, updates);
//       if (response.data.success) {
//         const updatedNote = response.data.note;
//         setNotes(notes.map(note =>
//           note._id === noteId ? updatedNote : note
//         ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
//         setActiveNote(updatedNote);
//       }
//     } catch (err) {
//       console.log(err.message || "Failed to update note");
//     }
//   };

//   // Delete note
//   const deleteNote = async (noteId) => {
//     try {
//       if (isDraft) {
//         setActiveNote(null);
//         setIsEditing(false);
//         setIsDraft(false);
//         return;
//       }

//       const response = await API.post(`/notes/delete/${noteId}`);

//       if (response.data.success) {
//         setNotes(prevNotes =>
//           prevNotes.filter(note => note._id !== noteId)
//         );

//         if (activeNote?._id === noteId) {
//           setActiveNote(null);
//           setIsEditing(false);
//         }
//       }
//     } catch (err) {
//       console.log(err.message || "Failed to delete note");
//     }
//   };


//   // Select note
//   const selectNote = (note) => {
//     setActiveNote(note);
//     setIsEditing(false);
//     setIsDraft(false);
//   };

//   // Edit note
//   const editNote = (note) => {
//     setActiveNote(note);
//     setIsEditing(true);
//     setIsDraft(false);
//   };

//   // Cancel editing/creating
//   const cancelEdit = () => {
//     if (isDraft) {
//       // If it's a draft, discard it
//       setActiveNote(null);
//       setIsDraft(false);
//     } else {
//       // If editing existing note, just exit edit mode
//       setIsEditing(false);
//     }
//   };

//   useEffect(() => {
//     console.log("Fetching notes:");
//     fetchNotes();
//   }, []);

//   return (
//     <NotesContext.Provider
//       value={{
//         notes,
//         activeNote,
//         loading,
//         isEditing,
//         isDraft,
//         setIsEditing,
//         fetchNotes,
//         createNote,
//         saveNote,
//         updateNote,
//         deleteNote,
//         selectNote,
//         editNote,
//         cancelEdit,
//       }}
//     >
//       {children}
//     </NotesContext.Provider>
//   );
// };

// export const useNotes = () => useContext(NotesContext);

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  // Fetch notes only when user is available
  const fetchNotes = useCallback(async () => {
    console.log("checking for user data")
    if (!user) return; // don't fetch if not logged in

    try {
      setLoading(true);
      const response = await API.get("/notes/get");
      if (response.data.success) {
        const sortedNotes = response.data.notes.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setNotes(sortedNotes);
      }
    } catch (err) {
      console.log(err.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch notes whenever user becomes available
  useEffect(() => {
    if (!authLoading && user) {
      fetchNotes();
    }
  }, [user, authLoading, fetchNotes]);

  const createNote = () => {
    const draftNote = {
      _id: `draft-${Date.now()}`,
      title: "",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setActiveNote(draftNote);
    setIsEditing(true);
    setIsDraft(true);
  };

  const saveNote = async (noteData) => {
    try {
      if (isDraft) {
        const response = await API.post("/notes/create", {
          title: noteData.title || "Untitled",
          content: noteData.content || " ",
        });

        if (response.data.success) {
          const newNote = response.data.note;
          setNotes([newNote, ...notes]);
          setActiveNote(newNote);
          setIsDraft(false);
          setIsEditing(false);
          return true;
        }
      } else {
        const response = await API.post(`/notes/update/${noteData._id}`, {
          title: noteData.title,
          content: noteData.content,
        });

        if (response.data.success) {
          const updatedNote = response.data.note;
          setNotes(
            notes
              .map((note) => (note._id === noteData._id ? updatedNote : note))
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          );
          setActiveNote(updatedNote);
          setIsEditing(false);
          return true;
        }
      }
    } catch (err) {
      console.log(err.message || "Failed to save note");
      return false;
    }
  };

  const updateNote = async (noteId, updates) => {
    try {
      const response = await API.post(`/notes/update/${noteId}`, updates);
      if (response.data.success) {
        const updatedNote = response.data.note;
        setNotes(
          notes
            .map((note) => (note._id === noteId ? updatedNote : note))
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        );
        setActiveNote(updatedNote);
      }
    } catch (err) {
      console.log(err.message || "Failed to update note");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      if (isDraft) {
        setActiveNote(null);
        setIsEditing(false);
        setIsDraft(false);
        return;
      }

      const response = await API.post(`/notes/delete/${noteId}`);
      if (response.data.success) {
        setNotes((prev) => prev.filter((note) => note._id !== noteId));
        if (activeNote?._id === noteId) {
          setActiveNote(null);
          setIsEditing(false);
        }
      }
    } catch (err) {
      console.log(err.message || "Failed to delete note");
    }
  };

  const selectNote = (note) => {
    setActiveNote(note);
    setIsEditing(false);
    setIsDraft(false);
  };

  const editNote = (note) => {
    setActiveNote(note);
    setIsEditing(true);
    setIsDraft(false);
  };

  const cancelEdit = () => {
    if (isDraft) {
      setActiveNote(null);
      setIsDraft(false);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        activeNote,
        loading,
        isEditing,
        isDraft,
        setIsEditing,
        fetchNotes,
        createNote,
        saveNote,
        updateNote,
        deleteNote,
        selectNote,
        editNote,
        cancelEdit,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
