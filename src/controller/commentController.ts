import { Request, Response } from 'express';
import { CommentDocument } from '../model/commentsModel';
import { createComment } from '../service/commentService';

export async function createCommentHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const comment: CommentDocument | boolean = await createComment(req.body);
        return res.status(200).json({ comment });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}
