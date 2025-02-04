const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Ensure .env variables are loaded

const registerUser = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    console.log("Incoming Request Body:", req.body);  // 🔍 Debugging log

    // ✅ Validate all fields
    if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // ✅ Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Create a new user (without confirmPassword)
        const newUser = new User({ fullName, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 🚨 Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 🚨 Check if password is correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // ✅ Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { registerUser, loginUser };
