import mongoose from 'mongoose';
import { PostDocument } from './postsModel';
import { UserDocument } from './userModel';

export interface CommentDocument extends mongoose.Document {
    postID: PostDocument['_id'];
    userID: UserDocument['_id'];
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentsSchema = new mongoose.Schema(
    {
        postID: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
        userID: { type: mongoose.Schema.Types.Array, ref: 'User', required: true },
        body: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model<CommentDocument>('Comment', commentsSchema);

export default Comment;
