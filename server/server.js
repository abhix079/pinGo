import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js"; // <-- new

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
 
// Routes
app.use("/auth", authRoutes);
app.use("/urls", urlRoutes); // <-- new route

app.listen(8000, () => console.log("Backend running at http://localhost:8000"));
