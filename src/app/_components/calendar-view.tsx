import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface Todo {
dueDate: string;
  // Add other properties of Todo if needed
}

export function CalendarView() {
const todos = useQuery(api.functions.listTodos);

const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
    const dayTodos = todos?.filter((todo: Todo) => new Date(todo.dueDate).toDateString() === date.toDateString());
    return dayTodos?.length ? <span className="text-xs">{dayTodos.length} tasks</span> : null;
    }
    return null;
};

return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
    <Calendar tileContent={tileContent} />
    </div>
);
}