/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer"
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000})
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgetPasswordToken: hashedToken, 
                forgetPasswordTokenExpiry: Date.now() + 3600000})
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        // Looking to send emails in production? Check out our Email API/SMTP product!
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 465,
            auth: {
            user: "3bff1694ef388b",
            pass: "d5e3847e9280c5"
            }
        });

        const mailOptions = {
            from: 'mohammedwaheed238@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        };
        
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}