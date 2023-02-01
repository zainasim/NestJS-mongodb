import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser, createOTP, resetPassword } from '../service/userService';
import { UserDocument } from '../model/userModel';
import { OTPDocument } from 'model/generateOTPModel';

export async function createUserHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const user: UserDocument = await createUser(req.body);
        return res.send(omit(user.toJSON(), 'password'));
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

// export async function getUsersHandler(req: Request, res: Response) {
//     try {
//         const users = await getAllUsers();
//         return res.status(200).json({ users });
//     } catch (error: any) {
//         return res.status(500).send(error.message);
//     }
// }

export async function createOTPHandler(req: Request, res: Response) {
    try {
        const otpRecord: boolean | OTPDocument = await createOTP(req.body);
        res.status(200).json({ otpRecord });
    } catch (error: any) {
        res.status(409).send(error.message);
    }
}

export async function createResetPasswordHandler(req: Request, res: Response) {
    try {
        const updatePassword: string = await resetPassword(req.body);
        res.status(200).json({ updatePassword });
    } catch (error: any) {
        res.status(404).send(error.message);
    }
}
