import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { FiTrash2 } from "react-icons/fi";

export function ToDoList() {
const todos = useQuery(api.functions.listTodos);
const updateTodo = useMutation(api.functions.updateTodo);
const deleteTodo = useMutation(api.functions.deleteTodo);

const handleCompleteChange = async (id: Id<"todos">, newValue: boolean) => {
    console.log(`Updating todo ${id} to ${newValue ? "completed" : "not completed"}`);
    await updateTodo({ id, completed: newValue });
};

const handleRemove = async (id: Id<"todos">) => {
    console.log(`Removing todo with id ${id}`);
    await deleteTodo({ id });
};

if (!todos) {
    return <p className="text-gray-500 text-lg font-medium">Loading your tasks...</p>;
}

return (
    <ul className="space-y-4">
    {todos.map(({ _id, title, description, completed }) => (
        <ToDoItem
        key={_id}
        id={_id}
        title={title}
        description={description}
        completed={completed}
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
    <li className="w-full flex items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:ring-2 hover:ring-gray-300">
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
