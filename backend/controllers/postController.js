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


export const getposts = async (req, res, next) => {
    try {
        // getting the start index
       const startIndex = parseInt(req.query.startIndex) || 0; 
    //    getting the limit for pagination
       const limit = parseInt(req.query.limit) || 9;
    //    geting the sort direction (asc or desc)
       const sortDirection = req.query.order === 'asc' ? 1 : -1;
       // getting the posts based on query parameters (like userId, category, slug, postId, searchTerm)
       const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { category: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && { 
            $or: [  
            {title: { $regex: req.query.searchTerm, $options: 'i' }},
            {content: { $regex: req.query.searchTerm, $options: 'i' }},
        ],
       }),
    }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

    const totalPosts = await Post.countDocuments();

    // calculate the number of posts created in the last month and send it in the response as well.
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(), 
        now.getMonth() - 1, 
        now.getDate(),
    );

    const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
    console.log(posts);
    } catch (error) {
        next(error);
    }
}