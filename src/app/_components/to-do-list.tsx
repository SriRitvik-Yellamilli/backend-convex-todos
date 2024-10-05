import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { FiTrash2 } from "react-icons/fi";

export function ToDoList({
onCompleteChange,
onRemove,
}: {
onCompleteChange: (id: Id<"todos">, newValue: boolean) => void;
onRemove: (id: Id<"todos">) => void;
}) {
const todos = useQuery(api.functions.listTodos);
const updateTodo = useMutation(api.functions.updateTodo);
const deleteTodo = useMutation(api.functions.deleteTodo);

return (
    <ul className="space-y-4">
    {todos?.map(({ _id, title, description, completed }) => (
        <ToDoItem
          key={_id} // Use _id as the key instead of index for better performance
        id={_id}
        title={title}
        description={description}
        completed={completed}
          onCompleteChanged={(newValue) => onCompleteChange(_id, newValue)} // Use the prop function
          onRemove={() => onRemove(_id)} // Use the prop function
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
    <li className="w-full flex items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:ring-2 hover:ring-gray-300 animate-pop">
    <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChanged(e.target.checked)}
        className="w-6 h-6 rounded border-gray-300 focus:ring-blue-500 transition-transform transform hover:scale-110"
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
