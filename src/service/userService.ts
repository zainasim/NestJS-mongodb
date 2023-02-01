import OTP, { OTPDocument } from '../model/generateOTPModel';
import { DocumentDefinition } from 'mongoose';
import User, { UserDocument } from '../model/userModel';
import transporter from '../config/emailConfig';

export async function createUser(input: DocumentDefinition<UserDocument>): Promise<UserDocument> {
    try {
        return await User.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function validatePassword({ email, password }: { email: UserDocument['email']; password: string }): Promise<false | UserDocument> {
    const user: UserDocument | null = await User.findOne({ email });
    if (!user) {
        return false;
    }

    const isValid: boolean = await user.comparepassword(password);
    if (!isValid) {
        return false;
    }

    return user;
}

export async function createOTP(input: OTPDocument): Promise<OTPDocument | boolean> {
    try {
        const otp: string = `${Math.floor(1000 + Math.random() * 9000)}`;
        const email: string = input.email;
        const mailOptions: object = {
            from: 'zainasim222@gmail.com',
            to: email,
            subject: 'Please confirm your Email account',
            html: 'Hello,<br> your OTP ' + otp + '.<br><a>Click here to verify</a>'
        };
        await transporter.sendMail(mailOptions);
        const mailchecker: OTPDocument | boolean | null = await checkEmailExist(email, otp);
        if (!mailchecker) {
            const otpRecordTemplate: OTPDocument = new OTP({
                email: input.email,
                otp
            });
            const otpRecord: OTPDocument = await otpRecordTemplate.save();
            return otpRecord;
        }
        return mailchecker;
    } catch (error: any) {
        throw new Error(error);
    }
}

//Helper function for function createOTP
async function checkEmailExist(email: string, otp: string): Promise<OTPDocument | boolean | null> {
    const existingOTP: OTPDocument | null = await OTP.findOne({ email });
    if (existingOTP) {
        const filter: object = { email };
        const update: object = { otp };
        return await OTP.findOneAndUpdate(filter, update, { new: true });
    }
    return false;
}

export async function resetPassword(input: OTPDocument): Promise<string> {
    try {
        const userEmail: string = input.email;
        const userOTP: string = input.otp;
        const dbOTPRecord = await OTP.findOne({ userEmail });
        if (dbOTPRecord) {
            const dbOTP: string = dbOTPRecord.otp;
            if (userOTP === dbOTP) {
                const filter: object = { email: userEmail };
                const update: object = { otp: userOTP };
                await User.findOneAndUpdate(filter, update);
                return 'Password Updated Successfully';
            }
        }
        return 'InCorrect OTP, Check your email';
    } catch (error: any) {
        throw new Error(error);
    }
}

// export async function getAllUsers() {
//     try {
//         return await User.find();
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }
