import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { requireUser } from "./helpers";

export const listTodos = query({
    handler: async (ctx) => {
        const user = await requireUser(ctx);
        return await ctx.db.query("todos")
            .withIndex("by_user_id", q => q.eq("userId", user.tokenIdentifier))
            .collect();
    }
});


export const createTodo = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        dueDate: v.string(), 
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        await ctx.db.insert("todos", {
            title: args.title,
            description: args.description,
            dueDate: args.dueDate, 
            completed: false,
            userId: user.tokenIdentifier,
            archived: false 
        });
    },
});


export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        if (todo.userId !== user.tokenIdentifier) {
            throw new Error("Unauthorized");
        }
        await ctx.db.patch(args.id, {
            completed: args.completed
        });
    }
});

export const deleteTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        if (todo.userId !== user.tokenIdentifier) {
            throw new Error("Unauthorized");
        }
        await ctx.db.delete(args.id);
    }
});

export const archiveTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        if (todo.userId !== user.tokenIdentifier) {
            throw new Error("Unauthorized");
        }
        // Assuming archiving means setting a specific field, e.g., `archived: true`
        await ctx.db.patch(args.id, {
            archived: true
        });
    }
});

export const createManyTodos = internalMutation({
    args: {
        userId: v.string(),
        todos: v.array(v.object({
            title: v.string(),
            description: v.string(),
            dueDate: v.string() // Add dueDate to the expected object structure
        }))
    },
    handler: async (ctx, args) => {
        for (const todo of args.todos) {
            await ctx.db.insert("todos", {
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate, // Include dueDate in the inserted object
                completed: false,
                userId: args.userId,
                archived: false 
            });
        }
    }
});
