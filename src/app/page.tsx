"use client";

import { useState, useEffect } from "react";
import { NewToDoForm } from "./_components/new-todo-form";
import { FiTrash2 } from "react-icons/fi";

type ToDoItem = {
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { title: "Example", description: "This is an example", completed: false },
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-100 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-screen-md mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-black">To-Do List</h1>
        </div>

        <ul className="space-y-4">
          {todos.map(({ title, description, completed }, index) => (
            <ToDoItem
              key={index}
              title={title}
              description={description}
              completed={completed}
              onCompleteChanged={(newValue) => handleCompleteChange(index, newValue)}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </ul>

        <NewToDoForm onCreate={handleCreate} />
      </div>
    </div>
  );

  function handleCompleteChange(index: number, newValue: boolean) {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos[index].completed = newValue;
      return newTodos;
    });
  }

  function handleRemove(index: number) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  }

  function handleCreate(title: string, description: string) {
    setTodos((prev) => [...prev, { title, description, completed: false }]);
  }
}

function ToDoItem({
  title,
  description,
  completed,
  onCompleteChanged,
  onRemove,
}: {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
}) {
  return (
    <li className="w-full flex items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:ring-2 hover:ring-gray-300 animate-pop">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChanged(e.target.checked)}
        className="w-6 h-6 rounded border-gray-300 focus:ring-blue-500 transition-transform transform hover:scale-110"
      />
      <div className="flex-1">
        <p className={`font-bold text-black transition-colors ${completed ? "line-through text-gray-500" : "text-black"}`}>{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
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
