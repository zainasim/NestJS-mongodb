import { UpdateResult } from 'mongodb';
import { DocumentDefinition } from 'mongoose';
import Post, { PostDocument } from '../model/postsModel';

export async function createPost(input: DocumentDefinition<PostDocument>): Promise<PostDocument> {
    try {
        return await Post.create(input);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function likedPost(id: string, input: string): Promise<boolean | UpdateResult> {
    try {
        const post: UpdateResult = await Post.updateOne({ _id: id }, { $push: { likedBy: input } });
        if (post) {
            return post;
        }
        return false;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function sharePost(userId: string, postId: string): Promise<PostDocument | boolean> {
    try {
        const post: PostDocument | null = await Post.findById(postId);
        if (post) {
            const newPostTemplate: PostDocument = new Post({
                userID: userId,
                title: post.title,
                description: post.description,
                relatedTags: post.relatedTags
            });
            const newPost: PostDocument = await newPostTemplate.save();
            await Post.updateOne({ _id: postId }, { $push: { postID: newPost._id } });
            return newPost;
        }
        return false;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getAllPosts(): Promise<PostDocument[]> {
    try {
        return await Post.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postID',
                    as: 'comments'
                }
            }
        ]);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function searchPost(data: string): Promise<PostDocument[]> {
    try {
        return await Post.find({ relatedTags: data });
    } catch (error: any) {
        throw new Error(error);
    }
}
