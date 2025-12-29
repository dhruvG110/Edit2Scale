"use client";

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center px-6 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-900 text-sm w-fit mb-6">
            <span className="h-2 w-2 bg-pink-500 rounded-full" /> For Companies
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hire Top Remote <br />
            Developers Using The <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              World’s First AI Recruiter
            </span>
          </h1>

          <p className="mt-6 text-zinc-400">
            No job posting, No screening, No headaches
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="text-pink-500">✔</span> Match instantly
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500">✔</span> Transparent pricing
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500">✔</span> Curated developers using AI
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="relative bg-white rounded-2xl p-8 shadow-xl text-black">
          <h2 className="text-xl font-semibold text-center">
            Simplify your hiring with <br />
            <span className="text-purple-500">Pesto’s AI assistant!</span>
          </h2>

          <p className="text-center text-sm text-zinc-500 mt-2">
            Access a handpicked pool of vetted developers,
            perfectly matched to your job criteria
          </p>

          {/* Search */}
          <div className="mt-6 relative">
            <input
              className="w-full rounded-full border px-5 py-3 pr-28 text-sm focus:outline-none"
              placeholder="Python developer with 5 years of work experience"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full text-sm">
              Search
            </button>
          </div>

          {/* Video */}
          <div className="mt-8 rounded-xl overflow-hidden">
            <video
              autoPlay
              muted
              loop
              className="w-full h-48 object-cover"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Suggestions */}
          <div className="mt-6">
            <p className="text-xs text-zinc-500 mb-3">Try these searches</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Python developer (3+ yrs)",
                "React developer",
                "QA engineer",
                "Data engineer (Bangalore)",
                "Java developer",
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs rounded-full border bg-zinc-50"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
