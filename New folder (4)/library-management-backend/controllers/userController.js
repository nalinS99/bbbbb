const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExistsEmail = await User.findOne({ email });
        const userExistsUsername = await User.findOne({ username });

        if (userExistsEmail) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        if (userExistsUsername) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user: { id: user._id, username, email: user.email }, token });
    } catch (err) {
        res.status(500).json({ message: "Error registering user: " + err.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log('Retrieved User:', user);
        console.log('Password from DB:', user.password);
        console.log('Password from Request:', password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: { id: user._id, username, email: user.email }, token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in: " + err.message });
    }
};

module.exports = { registerUser, loginUser };
