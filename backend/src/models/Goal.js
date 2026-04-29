import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    duration: Number,
    subjects: [String],
    topics: [String],
}, { timestamps: true });

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;