export default function NoteEditor({ note }) {
  if (!note) {
    return (
      <div className="text-[#6B6258] text-center mt-20">
        Select or create a note ✍️
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <input
        className="w-full text-xl font-semibold outline-none mb-4"
        value={note.title}
        placeholder="Note title"
      />

      <textarea
        className="w-full h-64 outline-none resize-none"
        value={note.content}
        placeholder="Start writing..."
      />

      <div className="flex justify-end gap-3 mt-4">
        <button className="px-4 py-2 bg-red-100 text-red-600 rounded">
          Delete
        </button>
        <button className="px-4 py-2 bg-[#6D5DFB] text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
}
