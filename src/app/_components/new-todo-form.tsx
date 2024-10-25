import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function NewToDoForm() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const createTodo = useMutation(api.functions.createTodo);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ title, description });
    setTitle("");
    setDescription("");
};

return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
    <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700" htmlFor="title">
        Title
        </label>
        <input
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        required
        />
    </div>

    <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700" htmlFor="description">
        Description
        </label>
        <input
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
        required
        />
    </div>

    <button
        className="w-full bg-blue-600 p-3 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
        type="submit"
    >
        Create
    </button>
    </form>
);
}