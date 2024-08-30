import multer from "multer";
import path from "path";
import fs from "fs";
import User from "../models/user.model.js";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads/profile_images/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Uploads will go into 'uploads/profile_images'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Images Only!"));
    }
  },
}).single("profileImage");

// Controller to handle profile update
export const updateProfile = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { email, phone, name } = req.body;

      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user details
      user.phone = phone || user.phone;
      user.name = name || user.name;

      // If file was uploaded, update profileImage field
      if (req.file) {
        user.profileImage = req.file.path;
      }

      // Save the user
      await user.save();

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
