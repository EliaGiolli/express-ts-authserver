import { Request, Response } from "express";
import { TaskService } from "../services/TaskService.js";

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
    try{
        const tasks = await taskService.getTasks();

        if(tasks){
            return res.status(200).json(tasks);
        }else{
            return res.status(500).json( { error: 'No tasks found'});
        }
    }catch(err){
        return res.status(500).json({ error: 'Server error' });
    }
}

// createTask
export const createTask = async (req:Request, res:Response) => {
    try{
        const { 
        nameTask, 
        description, 
        tag, 
        completed, 
        dueDate
    } = req.body;

    const newTask = await taskService.createNewTask(nameTask, description, tag, completed, dueDate);

    if(newTask){
        return res.status(200).json(newTask);
    }else{
        return res.status(500).json({ error: 'Unable to create the task' });
    }
    }catch(err){
        res.status(500).json({ message: 'Server error'});
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
        const updateData = req.body;
        const updatedTask = await taskService.updateTask(id, updateData);
        if (updatedTask) {
            return res.status(200).json(updatedTask);
        } else {
            return res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}