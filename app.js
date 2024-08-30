import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
