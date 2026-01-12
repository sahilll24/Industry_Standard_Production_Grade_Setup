const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", async (_req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB not connected");
    }

    res.status(200).json({
      status: "UP",
      service: "doctor-app-backend",
      database: "CONNECTED",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: "DOWN",
      service: "doctor-app-backend",
      database: "DISCONNECTED",
      error: err.message,
    });
  }
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// 404 handler for API routes (must be after all routes)
// Express 5 doesn't support /api/* pattern, so we check the path manually
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    console.log("❌ 404 - Route not found:", req.method, req.originalUrl);
    return res.status(404).json({ message: `API route not found: ${req.method} ${req.originalUrl}` });
  }
  next();
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected error", error: err.message });
});

module.exports = app;

