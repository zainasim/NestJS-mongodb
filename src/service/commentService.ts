import { DocumentDefinition } from 'mongoose';
import Comment, { CommentDocument } from '../model/commentsModel';
import Post, { PostDocument } from '../model/postsModel';

export async function createComment(input: DocumentDefinition<CommentDocument>): Promise<CommentDocument | boolean> {
    try {
        const post: PostDocument | null = await Post.findById(input.postID);
        if (post) {
            const comment: CommentDocument = new Comment(input);
            await comment.save();
            return comment;
        }
        return false;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
