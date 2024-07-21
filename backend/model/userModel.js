import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        maxLength: [15, 'Username must not be over 15'],
        minLength: [3, 'Username must not less that 3']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
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

