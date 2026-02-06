import { useNotes } from "../context/NotesContext";

export default function NotesList({ searchQuery = "" }) {
  const { notes, activeNote, selectNote, editNote, deleteNote, loading } = useNotes();

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center text-[#9B8D7F] py-4">
        Loading notes...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredNotes.length === 0 ? (
        <p className="text-center text-[#9B8D7F] py-4">
          {searchQuery ? "No notes found" : "No notes yet"}
        </p>
      ) : (
        filteredNotes.map((note) => (
          <div
            key={note._id}
            onClick={() => selectNote(note)}
            className={`group p-4 bg-white rounded-xl shadow cursor-pointer transition-all relative ${
              activeNote?._id === note._id 
                ? 'ring-2 ring-[#6D5DFB] bg-[#F7F3EF]' 
                : 'hover:bg-[#F7F3EF]'
            }`}
          >
            {/* Note Content */}
            <div className="pr-14">
              <h3 className="font-semibold text-[#3F3A34] mb-1">
                {note.title || "Untitled"}
              </h3>
              {/* <p className="text-sm text-[#6B6258] truncate">
                {note.content || "No content"}
              </p> */}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Edit Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  editNote(note);
                }}
                className="p-1.5 bg-[#6D5DFB] text-white rounded-lg hover:bg-[#5A4DE0] transition-colors"
                title="Edit note"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Are you sure you want to delete this note?")) {
                    deleteNote(note._id);
                  }
                }}
                className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                title="Delete note"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}