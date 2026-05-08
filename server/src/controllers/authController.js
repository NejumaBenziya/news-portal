const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        console.log("ENV:", process.env.JWT_SECRET);
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        console.log(token)
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};