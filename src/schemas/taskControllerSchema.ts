import { z } from 'zod'

export const createTaskSchema = z.object({
    nameTask: z.string(),
    description: z.string().optional(),
    tag: z.string().max(10).optional(),
    completed: z.boolean(),
     //usually HTTP requests send dates as strings
    dueDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" })
});

export const updateTaskSchema = z.object({
    nameTask: z.string().optional(),
    description: z.string().optional(),
    tag: z.string().max(10).optional(),
    completed: z.boolean().optional(),
    dueDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }).optional()
});