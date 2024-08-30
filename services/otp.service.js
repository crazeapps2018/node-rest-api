import User from "../models/user.model.js";

const HARD_CODED_OTP = "1234";

export const sendOtp = async ({ email, phone }) => {
  // Validate that either email or phone is provided
  if (!email && !phone) {
    throw new Error("Email or phone is required");
  }

  // Find the user and update the OTP field
  let user;
  if (email) {
    user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    user.otp = HARD_CODED_OTP;
  } else if (phone) {
    user = await User.findOne({ where: { phone } });
    if (!user) throw new Error("User not found");
    user.otp = HARD_CODED_OTP;
  }

  await user.save();

  return {
    success: true,
    message: "OTP sent successfully",
    otp: HARD_CODED_OTP, // This will be sent back for testing purposes
  };
};

export const verifyOtp = async ({ email, phone, otp }) => {
  // Validate that OTP and either email or phone are provided
  if (!otp || (!email && !phone)) {
    throw new Error("OTP, email, or phone is required");
  }

  // Find the user based on provided criteria
  let user;
  if (email) {
    user = await User.findOne({ where: { email, otp } });
  } else if (phone) {
    user = await User.findOne({ where: { phone, otp } });
  }

  if (!user) throw new Error("Invalid OTP");

  // OTP is verified, reset OTP field
  user.otp = null;
  await user.save();

  return { success: true, message: "OTP verified successfully" };
};
