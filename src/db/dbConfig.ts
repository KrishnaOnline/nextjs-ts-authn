import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export async function dbConnect() {
    try {
        console.log(process.env.MONGO_URI);
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB Connected Successfully");
        });
        connection.on('error', (err) => {
            console.log("MongoDB Connection Error: "+err);
            process.exit();
        });
    } catch(err) {
        console.log("Something Went Wrong, while Connecting to DB");
        console.log(err);
    }
}