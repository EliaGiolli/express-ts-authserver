import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    _id: string,
    nameTask: string,
    description: string,
    tag: string,
    createdAt: Date
}

const taskSchema = new Schema<ITask>({
    _id: { type:String, required:true, unique: true },
    nameTask: { type: String, required: true},
    description: { type: String, required: false },
    tag: { type: String, required: false },
    createdAt: { type: Date, required: true, unique: true}
})

export const Task = mongoose.model<ITask>("Task", taskSchema);