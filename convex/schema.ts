import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    todos: defineTable({
        title: v.string(),
        description: v.string(),
        dueDate: v.string(),
        completed: v.boolean(),
        userId: v.string(),
        archived: v.boolean(),
    }).index("by_user_id", ["userId"]),
});