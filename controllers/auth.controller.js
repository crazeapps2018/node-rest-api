import { registerUser, loginUser } from "../services/auth.services.js";
import User from "../models/user.model.js";
import { where } from "sequelize";

export const signup = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
