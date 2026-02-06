export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#F7F3EF]">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-[#EFE7DE]">
        <h1 className="text-4xl font-bold text-[#3F3A34] mb-4">
          Coffee Notes ☕
        </h1>
        <p className="text-lg text-[#5A5148] leading-relaxed">
          A calm, distraction-free place to write your thoughts, ideas,
          and daily notes. Simple. Secure. Beautiful.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-[#3F3A34] mb-2">
            {title}
          </h2>
          <p className="text-sm text-[#6B6258] mb-6">
            {subtitle}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}
