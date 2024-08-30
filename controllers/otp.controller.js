import {
  sendOtp as sendOtpService,
  verifyOtp as verifyOtpService,
} from "../services/otp.service.js";

export const sendOtpToUser = async (req, res) => {
  try {
    console.log("Check request", req.body); // Use req.body to see the actual data
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or Phone is required" });
    }

    const result = await sendOtpService({ email, phone });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;

    if (!otp || (!email && !phone)) {
      return res
        .status(400)
        .json({ message: "OTP, email or phone is required" });
    }
    const result = await verifyOtpService({ email, phone, otp });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
