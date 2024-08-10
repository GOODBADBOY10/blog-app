import { errorHandler } from "../utils/error.js";

import Comment from '../model/commentModel.js';


export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;
        if(userId !== req.user.id) {
            next(errorHandler(403, 'you are not allowed to comment'))
        }
        const newComment = new Comment({
            content,
            userId,
            postId
        });
        await newComment.save()
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
}