const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Only needed once at app start (e.g., in server.js)

const JWT_SECRET = process.env.JWT_SECRET || "987654321!@#$";

const registerUser = async (req, res) => {
  const { name, email, password, role, phone, experience, coverLetter } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      experience,
      coverLetter,
      cv: req.file ? req.file.filename : null,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user._id,      // <-- Make sure this is included
          name: user.name,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      
      res.json({ user, token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { registerUser, loginUser };
