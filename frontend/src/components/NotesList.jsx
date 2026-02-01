export default function NotesList({ notes, onSelect }) {
  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note._id}
          onClick={() => onSelect(note)}
          className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-[#F7F3EF]"
        >
          <h3 className="font-semibold text-[#3F3A34]">
            {note.title}
          </h3>
          <p className="text-sm text-[#6B6258] truncate">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  );
}
