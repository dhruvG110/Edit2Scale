'use client';

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CoursePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);

  // Mock API call to fetch purchased courses
  useEffect(() => {
    if (isSignedIn) {
      fetch(`/api/purchased_courses`)
        .then(res => res.json())
        .then(data => setPurchasedCourses(data.courses || []))
        .catch(err => console.error(err));
    }
  }, [isSignedIn, user]);

  const courses = [
    {
      id: "101",
      title: "Alight Motion Course Mastery",
      description: "Motion graphics, transitions, VFX & real-world projects",
      price: 2199,
      mrp: "₹18,000",
      accent: "from-purple-500 to-pink-500",
    },
    {
      id: "102",
      title: "CapCut Pro Editing",
      description: "Short-form edits, viral reels & creator workflows",
      price: 2199,
      mrp: "₹18,000",
      accent: "from-pink-500 to-red-500",
    },
    {
      id: "103",
      title: "How to Find Clients and Scale ",
      description: "Grow, monetize & scale your personal brand",
      price: 2199,
      mrp: "₹18,000",
      accent: "from-blue-500 to-purple-500",
    },
  ];

  async function handleBuyNow(course: any) {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // Create Razorpay order
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: course.id }),
    });

    const order = await res.json();
    if (!res.ok) {
      alert(order.error || "Checkout failed");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Edit2Scale",
      description: course.title,
      order_id: order.id,
      handler: async function (response: any) {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course.id,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok) {
          alert(verifyData.error || "Payment verification failed");
          return;
        }

        // Update purchased courses locally
        setPurchasedCourses(prev => [...prev, course.id]);
        router.push(`/courses/${course.id}`);
      },
      prefill: {
        name: user?.fullName ?? "",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
      },
      theme: {
        color: "#7c3aed",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  return (
    <>
    
    <div className="min-h-screen bg-zinc-900 text-white py-10">
        <div className="ml-5 mt-2">
      <span
        className="cursor-pointer text-sm text-white px-3 py-1 border border-zinc-600 rounded hover:bg-zinc-800 hover:border-pink-500 transition-all inline-block -translate-y-2"
        onClick={() => router.push("/")}
      >
        ← Back
      </span>
    </div>
      <h1 className="text-center text-4xl font-bold mb-4">
        {user ? `${user.firstName}'s` : "Available"} Courses
      </h1>
     <h2 className="text-center text-xl text-zinc-400 mb-10">
  {purchasedCourses.length === 0
    ? "You haven't purchased any courses yet. Checkout from the list below."
    : "You have purchased some courses. Checkout other courses below."}
</h2>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-10">
        {courses.map((course) => {
          const purchased = purchasedCourses.includes(course.id);
          return (
            <div
              key={course.id}
              className="group relative bg-zinc-800 rounded-3xl p-8 border border-white/10 overflow-hidden hover:scale-[1.03] transition-transform duration-500"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${course.accent}`}
              />
              <div className="relative z-10 flex flex-col">
                <h4 className="text-2xl font-semibold mb-3">{course.title}</h4>
                <p className="text-zinc-400 mb-6">{course.description}</p>

                <div className="bg-black text-white text-center w-full min-h-72 rounded-2xl flex items-center justify-center mb-6">
                  Course image
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-zinc-400 line-through">{course.mrp}</span>
                  <span className="text-3xl font-bold">₹{course.price}</span>
                </div>

                {purchased ? (
                  <button
                    onClick={() => router.push(`/courses/${course.id}`)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-medium transition"
                  >
                    Go to Course
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuyNow(course)}
                    className="w-full relative overflow-hidden rounded-full px-6 py-3 font-medium border border-white/20"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10">Buy Now</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
