require("dotenv").config(); // 👈 مهم جدًا يكون الأول

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const analysisRoutes = require("./routes/analysisRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://admin-panel-three-blue-97.vercel.app"]
}));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", doctorRoutes);
app.use("/api", analysisRoutes);
app.use("/api", patientRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Dermalyze Backend Running...");
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
