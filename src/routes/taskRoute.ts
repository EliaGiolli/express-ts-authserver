import {
    getTask, 
    getAllTasks, 
    removeTask, 
    updateTask, 
    createTask
} from '../controllers/taskController.js'
import express from 'express'

export const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:id', getTask);
taskRouter.post('/', createTask);
taskRouter.delete('/:id', removeTask);
taskRouter.put('/:id', updateTask);