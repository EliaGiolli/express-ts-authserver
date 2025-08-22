import { Request, Response } from "express";
import { TaskService } from "../services/taskService.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskControllerSchema.js";
import { ITask } from "../models/taskModel.js";

const taskService = new TaskService();

// getTask
export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const singleTask = await taskService.getSingleTask(id);
        if (singleTask) {
            return res.status(200).json(singleTask);
        } else {
            return res.status(404).json({ error: 'No task found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}

// getAllTasks
export const getAllTasks = async (req:Request, res: Response) => {
    try {
        const tasks = await taskService.getTasks();
        return res.status(200).json(tasks); // Always return array, even if empty
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}

// createTask
export const createTask = async (req:Request, res:Response) => {
    try {
        
        const { nameTask, description, tag, completed, dueDate } = createTaskSchema.parse(req.body);
        
        if (!nameTask || !description || !tag || typeof completed !== "boolean" || !dueDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        const newTask = await taskService.createNewTask(
            nameTask, description, tag, completed, new Date(dueDate)
        );
        return res.status(201).json(newTask);
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

// removeTask
export const removeTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const removedTask = await taskService.removeTasks(id);
        if (removedTask) {
            return res.status(200).json(removedTask);
        } else {
            return res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// updateTask
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = updateTaskSchema.parse(req.body);

        // Convert dueDate to Date if present and is a string
        if (updateData.dueDate && typeof updateData.dueDate === "string") {
            // Use a temporary variable to avoid type conflict
            const { dueDate, ...rest } = updateData;
            const updateDataWithDate: Partial<ITask> = {
                ...rest,
                dueDate: new Date(dueDate)
            };
            const updatedTask = await taskService.updateTask(id, updateDataWithDate);
            if (updatedTask) {
                return res.status(200).json(updatedTask);
            } else {
                return res.status(404).json({ error: 'Task not found' });
            }
        } else {
            const updatedTask = await taskService.updateTask(id, updateData as Partial<ITask>);
            if (updatedTask) {
                return res.status(200).json(updatedTask);
            } else {
                return res.status(404).json({ error: 'Task not found' });
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}