import mongoose from "mongoose";

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGOURI);
       console.log("!! Mongo DB connected !!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;