import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";

export function ToDoList() {
  const todos = useQuery(api.functions.listTodos);
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);
  const archiveTodo = useMutation(api.functions.archiveTodo);

const handleCompleteChange = async (id: Id<"todos">, newValue: boolean) => {
    console.log(`Updating todo ${id} to ${newValue ? "completed" : "not completed"}`);
    await updateTodo({ id, completed: newValue });
};

const handleRemove = async (id: Id<"todos">) => {
    console.log(`Removing todo with id ${id}`);
    await deleteTodo({ id });
};

const handleArchive = async (id: Id<"todos">) => {
    console.log(`Archiving todo with id ${id}`);
    await archiveTodo({ id });
};

const getColorBasedOnDueDate = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (diffDays < 0) return "bg-red-200"; // Past due
    if (diffDays <= 3) return "bg-red-100";
    if (diffDays <= 7) return "bg-yellow-100";
    return "bg-green-100";
};

useEffect(() => {
    todos?.forEach(todo => {
    if (new Date(todo.dueDate) < new Date()) {
        handleArchive(todo._id);
    }
    });
}, [todos]);

if (!todos) {
    return <p className="text-gray-500 text-lg font-medium">Loading your tasks...</p>;
}

return (
    <ul className="space-y-4">
    {todos.map(({ _id, title, description, completed, dueDate }) => (
        <ToDoItem
        key={_id}
        id={_id}
        title={title}
        description={description}
        completed={completed}
        dueDate={dueDate}
        color={getColorBasedOnDueDate(dueDate)}
        onCompleteChanged={(newValue) => handleCompleteChange(_id, newValue)}
        onRemove={() => handleRemove(_id)}
        />
    ))}
    </ul>
);
}

function ToDoItem({
title,
description,
completed,
dueDate,
color,
onCompleteChanged,
onRemove,
}: {
id: Id<"todos">;
title: string;
description: string;
completed: boolean;
dueDate: string;
color: string;
onCompleteChanged: (newValue: boolean) => void;
onRemove: () => void;
}) {
return (
    <li className={`w-full flex items-center gap-4 p-4 ${color} rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:ring-2 hover:ring-gray-300`}>
    <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChanged(e.target.checked)}
        className="w-6 h-6 rounded border-gray-300 focus:ring-blue-500 transition-transform transform hover:scale-110"
    />
    <div className="flex-1">
        <p
        className={`font-bold transition-colors ${
            completed ? "line-through text-gray-500" : "text-black"
        }`}
        >
        {title}
        </p>
        <p
        className={`text-sm transition-colors ${
            completed ? "line-through text-gray-500" : "text-gray-600"
        }`}
        >
        {description}
        </p>
        <p className="text-xs text-gray-500">Due: {new Date(dueDate).toLocaleDateString()}</p>
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