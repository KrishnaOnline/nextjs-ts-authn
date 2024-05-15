import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide Username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please Provide Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPassToken: String,
    forgotPassExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})