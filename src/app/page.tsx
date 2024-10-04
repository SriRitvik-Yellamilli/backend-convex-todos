"use client";

import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { NewToDoForm } from "./_components/new-todo-form";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);
  const todos = useQuery(api.functions.listTodos);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-screen-md mx-auto p-6 space-y-8">

        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-black animate-bounce">
            To-Do App!
          </h1>
          <p className="text-lg text-black mt-4 font-medium tracking-wide leading-relaxed">
            Stay organized, stay productive. Let’s get things done!
          </p>
        </div>

        <ul className="space-y-4">
          {todos?.map(({ _id, title, description, completed }, index) => (
            <ToDoItem
              key={index}
              id={_id}
              title={title}
              description={description}
              completed={completed}
              onCompleteChanged={(newValue) => handleCompleteChange(_id, newValue)}
              onRemove={() => handleRemove(_id)}
            />
          ))}
        </ul>

        {/* Removed Floating Add Button */}
        <NewToDoForm />
      </div>
    </div>
  );

  function handleCompleteChange(id: Id<"todos">, newValue: boolean) {
    updateTodo({ id, completed: newValue });
  }

  function handleRemove(id: Id<"todos">) {
    deleteTodo({ id });
  }

  function openModal() {
    // Functionality to open modal for adding new to-do
  }
}

function ToDoItem({
  id,
  title,
  description,
  completed,
  onCompleteChanged,
  onRemove,
}: {
  id: Id<"todos">;
  title: string;
  description: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
}) {
  return (
    <li className="w-full flex items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-gray-100 hover:shadow-lg hover:ring-2 hover:ring-gray-300">
      <input
        type="checkbox"
        checked={completed}
        onChange={e => onCompleteChanged(e.target.checked)}
        className="w-6 h-6 rounded border-gray-300 focus:ring-black transition-transform transform hover:scale-110"
      />
      <div className="flex-1">
        <p className={`font-bold transition-colors ${completed ? "line-through text-gray-500" : "text-black"}`}>
          {title}
        </p>
        <p className={`text-sm transition-colors ${completed ? "line-through text-gray-500" : "text-gray-600"}`}>
          {description}
        </p>
      </div>
      <button
        type="button"
        className="text-red-500 transition-transform transform hover:scale-125 hover:text-red-700"
        onClick={onRemove}
      >
        <FiTrash2 />
      </button>
    </li>
  );
}
