import bcrypt from "bcrypt";
import { User } from "../models/User";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const hash = bcrypt.hash(password, 10);

    const newToken = crypto.randomBytes(32).toString("hex");

    const newUser = { username, password: hash, token: newToken };

    const createdUser = await User.create(newUser);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(201).json({ username: createdUser.username });
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: "server error" });
  }
};
