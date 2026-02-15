import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#EFE7DE] flex items-center justify-center px-4">
      <div className="bg-[#F7F3EF] rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
        
      
        <div className="text-6xl mb-4">☕</div>

        <h1 className="text-5xl font-bold text-[#6F4E37] mb-2">
          404
        </h1>

        <h2 className="text-xl font-semibold text-[#6F4E37] mb-3">
          Oops! Page not found
        </h2>

        <p className="text-gray-600 mb-6">
          Looks like this page wandered off for a coffee break.
        </p>

        <Link
          to="/"
          className="inline-block bg-[#6F4E37] text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
