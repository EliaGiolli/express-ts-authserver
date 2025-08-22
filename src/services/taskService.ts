import { Task, ITask } from "../models/taskModel.js";

export class TaskService {

    constructor(){}
    //get tasks
    async getSingleTask(id:string): Promise<ITask | null>{
        return await Task.findOne({ _id: id })
    }

    //get all tasks 
    async getTasks():Promise<ITask[]>{
        return await Task.find();
    }

    //create tasks
    async createNewTask(nameTask:string, description:string, tag:string, completed:boolean,dueDate:Date): Promise<ITask>{
        
        const newTask = new Task({
            nameTask, 
            description, 
            tag, 
            completed, 
            dueDate
        });

        if(!newTask) throw new Error('Unable to find the new task');

        await newTask.save();

        return newTask;
    }

    //remove tasks
    async removeTasks(id:string): Promise<ITask | null>{

        const removedTask = Task.findOneAndDelete({_id: id});

        if(!removedTask){
            return removedTask;
        }else{
            throw new Error('Unable to delete this task')
        }
        

    }
    //update tasks
    async updateTask(id: string, updateData: Partial<ITask>): Promise<ITask | null> {
        const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
        return updatedTask;
    }
}