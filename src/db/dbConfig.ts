import mongoose, { mongo } from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB Connected");
        });
        connection.on('error', (err) => {
            console.log("MongoDB Connection Error: "+err);
            process.exit();
        });
    } catch(err) {
        console.log("Soemthing Went Wrong, while Connecting to DB");
        console.log(err);
    }
}