import Session, { SessionDocument } from '../model/sessionModel';
import { UserDocument } from '../model/userModel';
import { sign } from '../utils/jwt.utils';
import config from '../config/config';

export async function createSession(userId: string, userAgent: string): Promise<SessionDocument> {
    const session: SessionDocument = await Session.create({ user: userId, userAgent });

    return session;
}

export function createAccessToken({ user, session }: { user: UserDocument; session: SessionDocument }) {
    //build and return the new access token

    const payload: object = {
        user_id: user._id,
        user_name: user.name,
        user_email: user.email,
        session: session._id
    };
    const accessToken: string = sign({ payload }, { expiresIn: config.token.accessTokenTtl });

    return accessToken;
}
