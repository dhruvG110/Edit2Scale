"use client";
import Image from "next/image"
import { useState } from "react";
import { redirect } from "next/navigation";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Hero() {
   const { isLoaded, isSignedIn } = useAuth();
   const router = useRouter();
    const courses = [
{
title: "After Effects Mastery",
description: "Motion graphics, transitions, VFX & real-world projects",
price: "₹2,199",
mrp: "₹18,000",
accent: "from-purple-500 to-pink-500",
},
{
title: "CapCut Pro Editing",
description: "Short-form edits, viral reels & creator workflows",
price: "₹2,199",
mrp: "₹18,000",
accent: "from-pink-500 to-red-500",
},
{
title: "Social Media Marketing",
description: "Grow, monetize & scale your personal brand",
price: "₹2,199",
mrp: "₹18,000",
accent: "from-blue-500 to-purple-500",
},
];
    const testimonials = [
{
id: 1,
quote:
"MarketMix completely changed how I learned motion design. The structured projects and creator-led approach made complex After Effects concepts feel simple and practical.",
name: "Alexis Gauba",
role: "Motion Designer",
company: "Freelance Creator",
},
{
id: 2,
quote:
"I always struggled with CapCut consistency. MarketMix gave me real-world workflows and templates that instantly improved my edits and confidence.",
name: "Max Lu",
role: "Content Creator",
company: "YouTube Educator",
},
{
id: 3,
quote:
"Unlike traditional courses, MarketMix feels creator-native. It’s fast, modern, and focused on skills that actually matter today.",
name: "Sahil Verma",
role: "Video Editor",
company: "Short-form Specialist",
},
];


const [index, setIndex] = useState(1);


const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
const next = () => setIndex((i) => (i + 1) % testimonials.length);
    const sections = [
{
id: "profile",
title: "Profile",
arrow: "↓ Learn faster with curated creator profiles",
},
{
id: "repositories",
title: "Repositories",
arrow: "↓ Explore reusable editing assets",
},
{
id: "projects",
title: "Projects",
arrow: "↓ Real-world After Effects & CapCut projects",
},
{
id: "tech",
title: "Tech stack",
arrow: "↓ Tools creators actually use",
},
{
id: "assessment",
title: "Assessment Score",
arrow: "↓ Skill-based creator evaluation",
},
{
id: "experience",
title: "Experience",
arrow: "↓ Learn from industry creators",
},
];
 const [isOpen, setIsOpen] = useState(false);



const [active, setActive] = useState(sections[0]);
  return (
    <>
   <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <div className="w-[250px] h-[80px] relative ml-[-50px]">
            <Image
              src="/logo.jpeg"
              alt="MarketMix Logo"
              fill
              className="object-contain"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <Link href="/courses" className="hover:text-white transition">
              Courses
            </Link>
          </div>
        </div>

        {/* Right: Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <button
                className="text-sm text-zinc-300 hover:text-white transition"
                onClick={() => router.push("/sign-in")}
              >
                Log In
              </button>

              <button
                className="relative group overflow-hidden px-5 py-2 rounded-full border border-pink-500/40 text-sm text-white"
                onClick={() => router.push("/sign-up")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10">Sign Up</span>
              </button>
            </>
          ) : (
            <SignOutButton >
              <button className="relative group overflow-hidden px-5 py-2 rounded-full border border-pink-500/40 text-sm text-white">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10">Sign Out</span>
              </button>
            </SignOutButton>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/5 backdrop-blur-md w-full absolute top-20 left-0">
          <div className="flex flex-col items-start p-6 gap-4 text-white">
            <Link
              href="/courses"
              className="hover:text-pink-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>

            {!isSignedIn ? (
              <>
                <button
                  className="text-sm text-zinc-300 hover:text-white transition"
                  onClick={() => {
                    router.push("/sign-in");
                    setIsOpen(false);
                  }}
                >
                  Log In
                </button>

                <button
                  className="relative group overflow-hidden px-5 py-2 rounded-full border border-pink-500/40 text-sm text-white"
                  onClick={() => {
                    router.push("/sign-up");
                    setIsOpen(false);
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10">Sign Up</span>
                </button>
              </>
            ) : (
              <SignOutButton >
                <button
                  className="relative group overflow-hidden px-5 py-2 rounded-full border border-pink-500/40 text-sm text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10">Sign Out</span>
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      )}
    </nav>
    <section className="min-h-screen bg-black text-white flex items-center mt-24 px-6 md:px-16 section-hero " >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
        {/* Left Content */}
        <div  className="flex flex-col justify-center  ">
          

          <h1 className="text-4xl md:text-
          6xl font-bold leading-tight">
             {/* <br /> */}
           {/* Edit2Scale<br /> */}
            <span className="bg-linear-to-r from-[#ff5c00] to-[#BF00FF] bg-clip-text text-transparent text-6xl ">
           Where Editors Become Earners
            </span>
            <br />
            <span className="bg-linear-to-r from-[#fdf6f2] to-[#85698f] bg-clip-text text-transparent text-2xl">
           Become the top 1% of the kiln
            </span>
          </h1>

          <p className="mt-6 text-lg text-white">
           No random tutorials, No confusion, No wasted years
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="text-pink-500">✔</span> Master After Effects & CapCut
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500">✔</span>Project-based learning
            </li>
            <li className="flex items-center gap-3">
              <span className="text-pink-500">✔</span> Monetize your skills instantly
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="relative bg-gray-900 rounded-2xl p-8 shadow-xl text-black">
          <h2 className="text-xl font-semibold text-center text-white">
            Spice up your edits with the  <br />
            <span className="text-purple-500">Creator Asset Hub</span>
          </h2>

          <p className="text-center text-sm text-zinc-500 mt-2">
            Access a handpicked pool of vetted reusable assets from top creators
          </p>

          {/* Search */}
          <div className="mt-6 relative">
            <input
              className="w-full rounded-full border px-5 py-3 pr-28 text-sm focus:outline-none placeholder:text-zinc-400 text-white"
              placeholder="Video Editing Effects, Transitions, Templates..."
            />
            <button onClick={()=> router.push('/courses')} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full text-sm">
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
                "Shake Effect",
                "Glow Effect",
                "Beat Sync",
                "Auto Captions",
                
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
    <section className="min-h-screen flex flex-col items-center bg-black text-white px-6 md:px-16 pt-32">
<div className="max-w-7xl mx-auto">
{/* Heading */}
<h2 className="text-3xl md:text-5xl font-bold text-center mb-20">
A curated creator profile to help you master <br />
<span className="bg-linear-to-r from-[#ff5c00] to-[#BF00FF] bg-clip-text text-transparent">After Effects & CapCut</span>
</h2>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
{/* Left List */}
<div className="space-y-6">
{sections.map((item) => (
<button
key={item.id}
onClick={() => setActive(item)}
className={`block text-left text-2xl font-semibold transition ${
active.id === item.id
? "text-white"
: "text-zinc-500 hover:text-zinc-300"
}`}
>
{item.title}
</button>
))}
</div>


{/* Right Preview Ca9rd */}
<div className="relative bg-zinc-900 rounded-2xl p-6 border border-white/10">
<div className="h-72 w-full rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 text-lg">
{active.title} Preview
</div>
</div>
</div>


{/* Animated Arrow */}
<div className="mt-20 flex flex-col items-center text-zinc-400">
<span className="mb-3 text-sm">{active.arrow}</span>
<div className="animate-bounce text-purple-400 text-2xl">↓</div>
</div>
</div>
<button className=" max-w-412.5 h-16 mt-10 cursor-pointer text-xl bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition">
  Buy Now
</button>
</section>

<section className="bg-black text-white py-32  md:px-16 overflow-hidden ">
<div className="max-w-7xl mx-auto">
{/* Heading */}
<h3 className="text-3xl md:text-5xl font-bold text-center mb-20">
Helping creators find the <br />
<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
exact skills they need
</span>
</h3>


{/* Carousel */}
<div className="relative flex items-center justify-center gap-6">
{/* Prev */}
<button
onClick={prev}
className="absolute left-0 md:left-20 z-10 h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700"
>
←
</button>


{/* Cards */}
{testimonials.map((t, i) => {
const isActive = i === index;
return (
<div
key={t.id}
className={`transition-all duration-500 rounded-3xl p-8 max-w-xl w-full border border-white/10 ${
isActive
? "bg-zinc-900 scale-100 opacity-100"
: "bg-zinc-900/40 scale-90 opacity-40 hidden md:block"
}`}
>
<p className="text-lg leading-relaxed text-zinc-200">“{t.quote}”</p>


<div className="mt-8 flex items-center gap-4">
<div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
<div>
<p className="font-semibold">{t.name}</p>
<p className="text-sm text-zinc-400">
{t.role} · {t.company}
</p>
</div>
</div>
</div>
);
})}


{/* Next */}
<button
onClick={next}
className="absolute right-0 md:right-20 z-10 h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700"
>
→
</button>
</div>
</div>
</section>
<section className="bg-black text-white py-32 px-6 md:px-16">
<div className="max-w-7xl mx-auto">
{/* Heading */}
<h3 className="text-3xl md:text-5xl font-bold text-center mb-20">
Check out our <br />
<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
newest courses
</span>
</h3>


{/* Course Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
{courses.map((course, i) => (
<div
key={i}
className="group relative bg-zinc-900 rounded-3xl p-8 border border-white/10 overflow-hidden hover:scale-[1.03] transition-transform duration-500"
>
{/* Glow */}
<div
className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${course.accent}`}
/>


<div className="relative z-10">
<h4 className="text-2xl font-semibold mb-3">{course.title}</h4>

<p className="text-zinc-400 mb-6">{course.description}</p>
<div className="bg-black text-white text-center  w-full min-h-72 rounded-2xl">
    Course image
</div>

{/* Pricing */}
<div className="flex items-center gap-3 mb-8">
<span className="text-zinc-400 line-through">{course.mrp}</span>
<span className="text-3xl font-bold">{course.price}</span>
</div>


{/* CTA */}
<button className="w-full relative overflow-hidden rounded-full px-6 py-3 font-medium border border-white/20">
<span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
<span className="relative z-10">Buy Now</span>
</button>
</div>
</div>
))}
</div>
</div>
</section>
<footer className="bg-black text-zinc-400 border-t border-white/10 px-6 md:px-16 pt-20 pb-10">
<div className="max-w-7xl mx-auto">
{/* Top */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
{/* Brand */}
<div>
<h4 className="text-white text-xl font-bold mb-4">&lt;MarketMix /&gt;</h4>
<p className="text-sm leading-relaxed">
A creator-first learning platform to master <br />
After Effects, CapCut & modern social growth.
</p>
</div>


{/* Links */}
<div>
<h5 className="text-white font-semibold mb-4">Platform</h5>
<ul className="space-y-2 text-sm">
<li className="hover:text-white cursor-pointer">Courses</li>
<li className="hover:text-white cursor-pointer">Creators</li>
<li className="hover:text-white cursor-pointer">Community</li>
<li className="hover:text-white cursor-pointer">Pricing</li>
</ul>
</div>


<div>
<h5 className="text-white font-semibold mb-4">Resources</h5>
<ul className="space-y-2 text-sm">
<li className="hover:text-white cursor-pointer">Blog</li>
<li className="hover:text-white cursor-pointer">Help Center</li>
<li className="hover:text-white cursor-pointer">Affiliate</li>
<li className="hover:text-white cursor-pointer">Support</li>
</ul>
</div>


<div>
<h5 className="text-white font-semibold mb-4">Legal</h5>
<ul className="space-y-2 text-sm">
<li className="hover:text-white cursor-pointer">Privacy Policy</li>
<li className="hover:text-white cursor-pointer">Terms of Service</li>
<li className="hover:text-white cursor-pointer">Refund Policy</li>
</ul>
</div>
</div>


{/* Divider */}
<div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
<p className="text-sm">© {new Date().getFullYear()} MarketMix. All rights reserved.</p>


{/* Socials */}
<div className="flex items-center gap-4">
<span className="hover:text-white cursor-pointer">Instagram</span>
<span className="hover:text-white cursor-pointer">YouTube</span>
<span className="hover:text-white cursor-pointer">Twitter</span>
</div>
</div>
</div>
</footer>
    </>
  );
}
