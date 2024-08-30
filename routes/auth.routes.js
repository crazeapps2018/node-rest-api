import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { sendOtpToUser, verifyOtp } from "../controllers/otp.controller.js"; // Adjust path
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtpToUser);
router.post("/verify-otp", verifyOtp);
router.post("/update-profile", updateProfile);
export default router;
