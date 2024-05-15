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
    forgotPassTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

// In Next.js, it doesn't know whether model exists already or not,
// So, if model exists already, give reference of the Model or else, creates Model...

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;