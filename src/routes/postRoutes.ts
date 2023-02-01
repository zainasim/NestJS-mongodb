import express from 'express';
import PostController from '../controller/postController';
import { authorizeUser } from '../middleware/authorization';
import validateRequest from '../middleware/validateRequest';
import { createPostSchema, likePostSchema, sharePostSchema, searchPostSchema } from '../schema/postSchema';

const router = express.Router();

router.post('/create', authorizeUser, validateRequest(createPostSchema), PostController.createPostHandler);

router.post('/like/:postID', authorizeUser, validateRequest(likePostSchema), PostController.likePostHandler);

router.post('/sharePost/', authorizeUser, validateRequest(sharePostSchema), PostController.sharePostHandler);

router.get('/getAllPosts', PostController.getAllPostsHandler);

router.get('/search', authorizeUser, validateRequest(searchPostSchema), PostController.searchPostHandler);

export default router;
