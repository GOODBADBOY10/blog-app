import { errorHandler } from "../utils/error.js";
import Post from '../model/postModel.js';


export const create = async (req, res, next) => {
    if(!req.user.isAdmin) {
        return next(errorHandler(401, 'You are not authorized to create a new blog post'));
    }
    if(!req.body.title ||!req.body.content) {
        return next(errorHandler(400, 'Please provide a title and content for the blog post'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
       const savedPost = await newPost.save();
       res.status(201).json(savedPost); 
    } catch (error) {
       next(error); 
    }
};
