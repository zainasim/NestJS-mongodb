import { object, string, array } from 'yup';

export const createPostSchema = object({
    body: object({
        userID: string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required('User ID is required'),
        title: string().required('Title is required'),
        description: string().required('Description is required'),
        relatedTags: array().min(1).required('At least one Related tags is required')
    })
});

export const likePostSchema = object({
    body: object({
        likedBy: string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required('Liked by id is required')
    })
});

export const sharePostSchema = object({
    body: object({
        userID: string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required('User id is required'),
        postID: string()
            .matches(/^[0-9a-fA-F]{24}$/)
            .required('Shared by id is required')
    })
});

export const searchPostSchema = object({
    body: object({
        searchText: string().required('Text to be searched is required to perform a search')
    })
});
