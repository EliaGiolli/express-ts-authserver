import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    nameTask: string,
    description?: string,
    tag?: string,
    completed: boolean, 
    dueDate: Date
}

const taskSchema = new Schema<ITask>({
    nameTask: { type: String, required: true},
    description: { type: String, required: false },
    tag: { type: String, required: false },
    completed: { type: Boolean, required: true },
    dueDate: { type: Date, required: true }
},
{ timestamps: true } // the timestamps automatically manage createdAt and updatedAt fields
)

export const Task = mongoose.model<ITask>("Task", taskSchema);