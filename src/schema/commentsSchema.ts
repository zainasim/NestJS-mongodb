import { object, string } from 'yup';

export const createCommentSchema = object({
    body: object({
        postID: string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required('Post ID is required'),
        userID: string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required('User ID is required'),
        body: string().required('Comment body is required')
    })
});
