import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
    getTask, 
    getAllTasks, 
    removeTask, 
    updateTask, 
    createTask
} from '../controllers/taskController.js';

export const taskRouter = express.Router();

// Protect all /tasks routes
taskRouter.use(authMiddleware);

taskRouter.get('/', getAllTasks);
taskRouter.get('/:id', getTask);
taskRouter.post('/', createTask);
taskRouter.delete('/:id', removeTask);
taskRouter.put('/:id', updateTask);