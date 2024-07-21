import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'Please provide all required fields'));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    // Add user to the database
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });   
    } catch (error) {
        next(error);
    }
}