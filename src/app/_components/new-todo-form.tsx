import { useState } from "react";

type ToDoFormProps = {
onCreate: (title: string, description: string) => void;
};

export function NewToDoForm({ onCreate }: ToDoFormProps) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(title, description);
    setTitle("");
    setDescription("");
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="title">
        Title
        </label>
        <input
        className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        required
        />
    </div>

    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="description">
        Description
        </label>
        <input
        className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
        className="w-full bg-blue-500 p-2 rounded-md text-white font-semibold hover:bg-blue-600 transition"
        type="submit"
    >
        Create
    </button>
    </form>
);
}
