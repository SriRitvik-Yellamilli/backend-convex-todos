import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { motion } from "framer-motion";

export function GenerateTodosForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTodos = useAction(api.actions.generateTodos);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const todos = await generateTodos({ prompt });
      console.log(todos);
      setPrompt("");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      {loading ? (
        <motion.div 
          className="flex justify-center items-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <p className="text-gray-700 text-xl font-semibold">Generating AI tasks...</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <motion.h2 
              className="font-semibold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Generate Tasks with AI
            </motion.h2>

            <label className="text-sm font-semibold text-gray-700" htmlFor="prompt">
              Prompt
            </label>

            <motion.input
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              name="prompt"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter Prompt"
              required
              whileHover={{ scale: 1.05 }}
              whileFocus={{ borderColor: "#3b82f6", boxShadow: "0 0 8px rgba(59, 130, 246, 0.8)" }}
            />
          </div>

          <motion.button
            className="w-full bg-blue-600 p-3 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Generating..." : "Create"}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}