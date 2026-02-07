"use client";
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-black">
    <SignUp
  redirectUrl="/"
  appearance={{
    variables: {
      colorBackground: "#0f0f0f",
      colorPrimary: "#ec4899", // pink-500
      colorText: "",
      colorTextSecondary: "#a1a1aa", // zinc-400
      colorInputBackground: "#18181b",
      colorInputText: "#ffffff",
      borderRadius: "12px",
    },
    elements: {
      card: "bg-zinc-950 border border-white/10 shadow-xl",
      headerTitle: "text-white text-2xl font-semibold",
      headerSubtitle: "text-zinc-400",

      formFieldLabel: "text-zinc-300",
      formFieldInput:
        "bg-zinc-900 border border-white/10 text-white focus:border-pink-500 focus:ring-pink-500",

      formButtonPrimary:
        "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-all",

      footerActionText: "text-zinc-400",
      footerActionLink: "text-pink-400 hover:text-pink-300",

      socialButtonsBlockButton:
        "bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition",
        socialButtonsBlockButtonText: "text-white",
      socialButtonsProviderIcon__google: "invert",
      dividerLine: "bg-white/10",
      dividerText: "text-zinc-400",

      additionalViewMoreButton: "text-pink-400 hover:text-pink-300",
    },
  }}
/>

    </div>
  )
}

export default page
