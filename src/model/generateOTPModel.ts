import mongoose from 'mongoose';

export interface OTPDocument extends mongoose.Document {
    email: string;
    otp: string;
    createdAt: Date;
    updatedAt: Date;
}

const generateOTPSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        otp: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const OTP = mongoose.model<OTPDocument>('Otp', generateOTPSchema);

export default OTP;
