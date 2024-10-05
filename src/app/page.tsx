"use client";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ToDoList } from "./_components/to-do-list";
import { NewToDoForm } from "./_components/new-todo-form";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-100 transition-opacity duration-700 ${isMounted ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-screen-md mx-auto p-8 space-y-12">
        <Authenticated>
          <div className="flex items-center justify-between">
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-extrabold text-black animate-bounce tracking-tight drop-shadow-lg text-right">
                Get Things Done
              </h1>
              <p className="text-lg text-black font-medium tracking-wide leading-relaxed text-right">
                Power up your productivity and stay on top of your tasks with ease!
              </p>
            </div>
            <UserButton />
          </div>
          <div className="mt-10 space-y-8">
            <ToDoList /> 
            <NewToDoForm />
          </div>
        </Authenticated>

        <Unauthenticated>
          <div className="text-center space-y-4">
            <p className="text-gray-700 text-xl font-semibold">
              Ready to organize your day? Sign in to get started.
            </p>
            <SignInButton>
              <button className="px-8 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </div>
        </Unauthenticated>

        <AuthLoading>
          <div className="text-center">
            <p className="text-gray-500 text-lg font-medium">Loading your tasks...</p>
          </div>
        </AuthLoading>
      </div>
    </div>
  );
}
