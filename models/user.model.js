import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    otp: {
      type: DataTypes.STRING,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "User", timestamps: true }
);
export default User;
