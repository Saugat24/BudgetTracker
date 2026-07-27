import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const COOKIE_OPTS = { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 };

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.cookie("token", signToken(user._id), COOKIE_OPTS);
    res.status(201).json({ user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    res.cookie("token", signToken(user._id), COOKIE_OPTS);
    res.json({ user: { id: user._id, name: user.name, email } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
