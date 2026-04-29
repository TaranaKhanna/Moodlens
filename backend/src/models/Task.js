import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Goal
    },
    title: String,
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: Date,
}, {timestamps: true});

const Task = mongoose.model("Task", taskSchema);

export default Task;