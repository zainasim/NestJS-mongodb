import { Request, Response } from 'express';
import { validatePassword } from '../service/userService';
import { createAccessToken, createSession } from '../service/sessionService';
import { sign } from '../utils/jwt.utils';
import config from '../config/config';
import { UserDocument } from '../model/userModel';
import { SessionDocument } from '../model/sessionModel';

export async function createUserSessionHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    //validate email and password
    const user: UserDocument | boolean = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }

    // //create session
    const session: SessionDocument = await createSession(user._id, req.get('user-agent') || '');

    // //create Access Token
    const accessToken: string = createAccessToken({
        user,
        session
    });

    //Refresh Token
    const sessionObj: object = {
        _id: session._id,
        userId: session.user,
        valid: session.valid,
        userAgent: session.userAgent,
        email: user.email
    };
    const refreshToken = sign(sessionObj, {
        expiresIn: config.token.refreashTokenTtl
    });

    return res.send({ accessToken, refreshToken });
}
