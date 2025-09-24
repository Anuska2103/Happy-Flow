import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import { authAdmin } from "@/app/lib/firebaseAdmin";
import  * as motion from "motion/react-client"

export default async function Home() {
  const session = cookies().get("session")?.value;

  // Only proceed if a session cookie exists
  if (session) {
    let isSessionValid = false;
    try {
      // 1. Await the verification inside the 'try' block.
      // If this doesn't throw an error, the session is valid.
      await authAdmin.verifySessionCookie(session, true);
      isSessionValid = true;
    } catch (error) {
      // 2. If it throws, the cookie is invalid. Silently ignore and let the page render.
      isSessionValid = false;
    }

    // 3. Only redirect if the session was successfully verified.
    // This is now OUTSIDE the try...catch block.
    if (isSessionValid) {
      redirect("/dashboard");
    }
  }

  // Render the homepage if no session exists or if the session is invalid
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
      <div className="flex items-center space-x-6">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-orange-400 to-blue-300" 
            animate={{ rotate: 360 }}>
            Happy Flow
          </motion.span>
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-600">Your gentle cycle tracking companion.</p>
    </main>
  );
}