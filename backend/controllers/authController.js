import User from '../model/userModel.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ error: 'All fields are required' });
    }
    // Add user to the database
    const newUser = new User({
        username,
        email,
        password
    });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });   
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}