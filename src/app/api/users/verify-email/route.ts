import { dbConnect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);
        const user = await User.findOne({
            verifyToken: token, 
            verifyTokenExpiry: {$gt: Date.now()}
        })
        if(!user) {
            return NextResponse.json({
                success: false,
                error: "Invalid Token",
            }, {status: 400})
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            success: true,
            message: "Email Verified Successfully",
        }, {status: 200});
    } catch(err: any) {
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}