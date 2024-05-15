import { dbConnect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

dbConnect();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logged Out Successfully",
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch(err: any) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, {status: 500});
    }
}