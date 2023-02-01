import mongoose from 'mongoose';
import { UserDocument } from './userModel';

export interface PostDocument extends mongoose.Document {
    userID: UserDocument['_id'];
    title: string;
    description: string;
    relatedTags: Array<string>;
    likedBy: UserDocument['_id'];
    postID: PostDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema(
    {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        description: { type: String, required: true },
        relatedTags: { type: [String], required: true },
        likedBy: { type: mongoose.Schema.Types.Array, ref: 'User' },
        postID: { type: mongoose.Schema.Types.Array, ref: 'Post' }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model<PostDocument>('Post', postSchema);

export default Post;
