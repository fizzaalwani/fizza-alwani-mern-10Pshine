export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#EFE7DE] p-6 hidden md:block">
      <h2 className="text-xl font-bold text-[#3F3A34] mb-6">
        Coffee Notes ☕
      </h2>

      <button className="w-full py-2 bg-[#6D5DFB] text-white rounded-lg mb-4">
        + New Note
      </button>

      <p className="text-sm text-[#5A5148]">
        Your personal note space
      </p>
    </aside>
  );
}
