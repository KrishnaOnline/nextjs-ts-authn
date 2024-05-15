import { dbConnect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();    // gets body data if any...
        const {username, email, password} = reqBody;
        // Not Valid Request data as of now...
        console.log(reqBody);
        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({
                success: false,
                error: "User Already Exists"
            }, {status: 400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPass,
        })
        const createdUser = await newUser.save();
        console.log(createdUser);
        await sendMail({email, emailType: "VERIFY", userID: createdUser._id});
        return NextResponse.json({
            success: true,
            message: "User Registered Successfully",
            data: createdUser,
        }, {status: 201});
    } catch(err: any) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, {status: 500})
    }
}