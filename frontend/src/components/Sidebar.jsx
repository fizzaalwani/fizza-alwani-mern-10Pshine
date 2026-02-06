

import { useState } from "react";
import NotesList from "./NotesList";
import UserProfileModal from "./UserProfileModal";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { createNote } = useNotes();
  const { user } = useAuth();

  return (
    <>
      <aside className="w-64 bg-[#EFE7DE] p-5 hidden md:block flex flex-col h-screen">
        {/* Header with Settings */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#3F3A34]">
            Coffee Notes ☕
          </h2>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="p-2 rounded-lg hover:bg-[#D4C4B0] transition-colors"
            title="Settings"
          >
            <svg className="w-5 h-5 text-[#3F3A34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="mb-4 p-3 bg-white rounded-lg">
            <p className="text-sm font-medium text-[#3F3A34] truncate">
              {user.name}
            </p>
            <p className="text-xs text-[#9B8D7F] truncate">
              {user.email}
            </p>
          </div>
        )}

        <button 
          onClick={createNote}
          className="w-full py-2 bg-[#6D5DFB] text-white rounded-lg mb-4 hover:bg-[#5A4DE0] transition-colors"
        >
          + New Note
        </button>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 bg-white rounded-lg border border-[#D4C4B0] focus:outline-none focus:ring-2 focus:ring-[#6D5DFB] focus:border-transparent text-[#3F3A34] placeholder-[#9B8D7F]"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9B8D7F]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <p className="text-sm text-[#5A5148] py-4">
          Your personal note space
        </p>

        {/* Scrollable notes container */}
        {/* <div className="flex-1 overflow-y-auto pr-2 
          scrollbar-thin 
          scrollbar-track-transparent 
          scrollbar-thumb-[#6D5DFB] 
          scrollbar-thumb-rounded-full
          hover:scrollbar-thumb-[#5A4DE0]
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#6D5DFB]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb:hover]:bg-[#5A4DE0]">
          <NotesList searchQuery={searchQuery} />
        </div> */}

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#6D5DFB] scrollbar-track-transparent hover:scrollbar-thumb-[#5A4DE0]">
  <NotesList searchQuery={searchQuery} />
</div>
      </aside>

      {/* Profile Modal */}
      <UserProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
}