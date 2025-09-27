require('dotenv').config(); // load .env first

const cors = require('cors');
const mongoose = require("mongoose");
const express = require("express");

const profileRoute = require("./routes/profileRoutes");
const skillRoute = require("./routes/skillRoutes");
const experienceRoute = require("./routes/experienceRoutes");
const educationRoute = require("./routes/educationRoutes");
const certificationRoute = require("./routes/certificationsRoutes");
const sendEmailRoute = require("./routes/sendEmailRoutes");

const app = express();

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL,  // your Vercel frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/profile', profileRoute);
app.use("/skills", skillRoute);
app.use("/certifications", certificationRoute);
app.use("/experience", experienceRoute);
app.use("/education", educationRoute);
app.use("/send-email", sendEmailRoute);

// Connect to MongoDB
const url = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database is connected");
  } catch (err) {
    console.error("Error in connecting to database: " + err);
    process.exit(1);
  }
};

// Start server after DB connects
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});

