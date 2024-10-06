import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";
import { requireUser } from "./helpers";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateTodos = action({
    args: {
        prompt: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const user = await requireUser(ctx);

            const response = await openai.chat.completions.create({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content:
                            "Generate three to-dos based on the given prompt. Please include a title and description. Return a JSON object in the format: { todos: [{ title: string, description: string }] }",
                    },
                    {
                        role: "user",
                        content: `Prompt: ${args.prompt}`,
                    },
                ],
            });

            const message = response.choices?.[0]?.message?.content;
            if (!message) {
                throw new Error("Failed to retrieve todos from OpenAI response.");
            }

            const content = JSON.parse(message) as {
                todos: { title: string; description: string }[];
            };

            await ctx.runMutation(internal.functions.createManyTodos, {
                todos: content.todos,
                userId: user.tokenIdentifier,
            });

            return content.todos;
        } catch (error) {
            console.error("Error in generateTodos action:", error);
            throw new Error("Failed to generate todos.");
        }
    },
});
