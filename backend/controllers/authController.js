import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'Please provide all required fields'));
    }

    if(password.length < 6) {
        next(errorHandler(400, 'Password must be at least 6 characters long'));
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


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    // check if email and password are provided
    if (!email || !password) {
        return next(errorHandler(400, 'Please provide email and password'));
    }

    try {
       const validUser = await User.findOne({ email }); 
       if (!validUser) {
            return next(errorHandler(401, 'User not found or password is incorrect'));
       }
       const isPasswordCorrect = bcrypt.compareSync(password, validUser.password);
       if (!isPasswordCorrect) {
            return next(errorHandler(401, 'Invalid email or password'));
       }
       const token = jwt.sign({ 
        userId: validUser._id 
        },
        process.env.JWT_SECRET);
        res.status(200).cookie('my-token', token, {
            httpOnly: true,
        }).json(validUser);

    } catch (error) {
        next(error);
    }
}