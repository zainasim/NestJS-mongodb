import { Request, Response } from 'express';
import { UpdateResult } from 'mongodb';
import { PostDocument } from '../model/postsModel';
import { createPost, likedPost, getAllPosts, sharePost, searchPost } from '../service/postService';

async function createPostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const post: PostDocument = await createPost(req.body);
        return res.status(200).json({ post });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function likePostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const post: boolean | UpdateResult = await likedPost(req.params.postID, req.body.likedBy);
        return res.status(200).json({ post });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function getAllPostsHandler(res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const posts: PostDocument[] = await getAllPosts();
        return res.status(200).json({ posts });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function sharePostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const post: PostDocument | boolean = await sharePost(req.body.userID, req.body.postID);
        return res.status(200).json({ post });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function searchPostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const posts: PostDocument[] = await searchPost(req.body.searchText);
        return res.status(200).json({ posts });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

export default {
    createPostHandler,
    likePostHandler,
    getAllPostsHandler,
    sharePostHandler,
    searchPostHandler
};
