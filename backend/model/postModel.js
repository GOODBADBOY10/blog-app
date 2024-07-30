import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    }, 
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://www.hallaminternet.com/wp-content/uploads/2020/01/Is-blogging-relevant-anymore.jpeg',
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    }
}, {timestamps: true}
)

const Post = mongoose.model('Post', postSchema);


export default Post;

