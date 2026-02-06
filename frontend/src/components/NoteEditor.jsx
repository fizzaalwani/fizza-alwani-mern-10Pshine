import JoditEditor from "jodit-react";
import { useRef, useMemo, useState, useEffect } from "react";
import { useNotes } from "../context/NotesContext";

export default function NoteEditor() {
  const editor = useRef(null);
  const { 
    activeNote, 
    isEditing, 
    isDraft,
    setIsEditing, 
    saveNote, 
    deleteNote,
    cancelEdit 
  } = useNotes();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: !isEditing,
      height: 450,
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "ul",
        "ol",
        "|",
        "align",
        "|",
        "link",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "eraser",
        "copyformat",
        "|",
        "hr",
        "fullsize",
      ],
      style: {
        fontFamily: "Inter, sans-serif",
      },
      placeholder: isEditing ? "Start writing your note..." : "",
    }),
    [isEditing]
  );

  // Sync local state with activeNote
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title || "");
      setContent(activeNote.content || "");
    }
  }, [activeNote]);

  const handleSave = async () => {
    if (activeNote) {
      const success = await saveNote({
        _id: activeNote._id,
        title: title || "Untitled",
        content
      });
      
      if (success) {
        console.log("Note saved successfully!");
      }
    }
  };

  const handleCancel = () => {
    cancelEdit();
  };

  const handleDelete = async () => {
    if (isDraft) {
      // If it's a draft, just discard it
      cancelEdit();
    } else if (activeNote && window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(activeNote._id);
    }
  };

  // No note selected
  if (!activeNote) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <svg 
            className="w-32 h-32 mx-auto mb-6 text-[#D4C4B0]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <p className="text-xl text-[#6B6258] mb-2">No note selected</p>
          <p className="text-sm text-[#9B8D7F]">
            Select a note from the sidebar or create a new one ✍️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 h-full">
      {/* HEADER */}
      <div className="flex justify-between items-start gap-4 border-b pb-4">
        <input
          className={`flex-1 text-2xl font-semibold outline-none ${
            isEditing 
              ? "border-b-2 border-[#6D5DFB] pb-2" 
              : "border-none text-[#3F3A34]"
          }`}
          value={title}
          placeholder="Note title"
          onChange={(e) => setTitle(e.target.value)}
          disabled={!isEditing}
        />

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#6D5DFB] text-white rounded-lg hover:bg-[#5A4DE0] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        )}
      </div>

      {/* RICH TEXT EDITOR */}
      <div className="flex-1 overflow-hidden">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {
            if (isEditing) {
              setContent(newContent);
            }
          }}
        />
      </div>

      {/* ACTIONS - Only show when editing */}
      {isEditing && (
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {isDraft ? "Discard" : "Delete"}
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#6D5DFB] text-white rounded-lg hover:bg-[#5A4DE0] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isDraft ? "Create Note" : "Save Note"}
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE INFO */}
      {!isEditing && !isDraft && (
        <div className="flex justify-between items-center pt-4 border-t text-sm text-[#9B8D7F]">
          <div className="flex items-center gap-4">
            <span>📅 Last updated: {new Date(activeNote.updatedAt).toLocaleDateString()}</span>
          </div>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Delete Note
          </button>
        </div>
      )}
    </div>
  );
}