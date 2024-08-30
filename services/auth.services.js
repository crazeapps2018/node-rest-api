import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { where } from "sequelize";

export const registerUser = async (userData) => {
  //Check if user already exist

  const existingUser = await User.findOne({ where: { email: userData.email } });

  if (existingUser) {
    throw new Error("User with email already exists.");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await User.create({ ...userData, password: hashedPassword });
  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};
