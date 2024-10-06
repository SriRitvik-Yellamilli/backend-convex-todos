"use client";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ToDoList } from "./_components/to-do-list";
import { NewToDoForm } from "./_components/new-todo-form";
import { GenerateTodosForm } from "./_components/generate-todos-form";
import { motion } from "framer-motion";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-100 transition-opacity duration-700 ${isMounted ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-screen-md mx-auto p-8 space-y-12">
        <Authenticated>
          <motion.div
            className="flex items-center justify-between"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h1 
                className="text-6xl font-extrabold text-black tracking-tight drop-shadow-lg text-right"
                animate={{ scale: [0.8, 1.1, 1], rotate: [0, 0, 0, 0] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                Get Things Done
              </motion.h1>
              <p className="text-lg text-black font-medium tracking-wide leading-relaxed text-right">
                Power up your productivity and stay on top of your tasks with ease!
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserButton />
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-10 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <ToDoList /> 
            <GenerateTodosForm />
            <NewToDoForm />
          </motion.div>
        </Authenticated>

        <Unauthenticated>
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-gray-700 text-xl font-semibold">
            Unlock a new way to organize your day. Log in to get started Today!
            </p>
            <SignInButton>
              <motion.button
                className="px-8 py-3 bg-black text-semibold text-white rounded-md shadow-md hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </SignInButton>
          </motion.div>
        </Unauthenticated>

        <AuthLoading>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-gray-500 text-lg font-medium">Loading your tasks...</p>
          </motion.div>
        </AuthLoading>
      </div>
    </div>
  );
}
