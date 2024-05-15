import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({email, emailType, userID}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);
        if(emailType==="VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now()+3600000,
            })
        } else if(emailType==="RESET") {
            await User.findByIdAndUpdate(userID, {
                forgotPassToken: hashedToken,
                forgotPassTokenExpiry: Date.now()+3600000,
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            }
        });
        const mailOptions = {
            from: 'krishna@krish.ai',
            to: email,
            subject: emailType==="VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${hashedToken}
            </p>`,
        }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch(err: any) {
        throw new Error(err.message);
    }
}