import { dbConnect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import { decodeToken } from "@/helpers/decodeToken";

dbConnect();

export async function POST(request: NextRequest) {
    const userID = await decodeToken(request);
    const user = await User.findOne({_id: userID}).select("-password");   // excluding passowrd...
    return NextResponse.json({
        success: true,
        message: "User Found",
        data: user,
    }, {status: 200});
}