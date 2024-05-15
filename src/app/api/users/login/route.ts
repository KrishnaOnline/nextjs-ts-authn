import { dbConnect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({
                success: false,
                error: "User Doesn't Exist",
            }, {status: 400});
        }
        const isValidPass = await bcryptjs.compare(password, user.password);
        if(!isValidPass) {
            return NextResponse.json({
                success: false,
                error: "Incorrect Password",
            }, {status: 400});
        }
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = jwt.sign(
            payload, 
            process.env.TOKEN_SECRET!,
            {expiresIn: '1h'}
        );
        const response = NextResponse.json({
            success: true,
            message: "Logged In Successfully"
        });
        response.cookies.set("token", token, {httpOnly: true});
        return response;
    } catch(err: any) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, {status: 500});
    }
}