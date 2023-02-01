import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config';

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparepassword(candidatepassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

// For Login
userSchema.methods.comparepassword = async function (candidatepassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatepassword, user.password).catch(() => false);
};

userSchema.pre('save', async function (next): Promise<void> {
    const user = this as UserDocument;

    //only hash the password if it's new or being modified
    if (!user.isModified('password')) {
        return next();
    }
    //add Random additonal date
    const salt = await bcrypt.genSalt(config.salt.number);
    const hash = await bcrypt.hashSync(user.password, salt);
    //Replace the password with hash
    user.password = hash;

    return next();
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
