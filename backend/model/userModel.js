import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        maxLength: [35, 'Username must not be over 15'],
        minLength: [3, 'Username must not less that 3']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    profilePicture: {
        type: String,
        default: 'https://th.bing.com/th/id/OIP.-ZJQJ7Fk0WGhlxrD_SqkQQHaHa?w=680&h=680&rs=1&pid=ImgDetMain'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: [6, 'Password must be at least 6 characters']
    }
}, {timestamps: true}
);


const User = mongoose.model('User', userSchema);


export default User;

