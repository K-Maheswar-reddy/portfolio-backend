require('dotenv').config(); // load .env first
const cros = require('cors');

const mongoose = require("mongoose");
const express = require("express");

const profileRoute = require("./routes/profileRoutes");
const skillRoute = require("./routes/skillRoutes");
const experienceRoute = require("./routes/experienceRoutes");
const educationRoute = require("./routes/educationRoutes");
const certificationRoute = require("./routes/certificationsRoutes");
const sendEmailRoute = require("./routes/sendEmailRoutes")

const app = express();

// getting localhost link to allow to share data
app.use(cros({origin: process.env.CLIENT_URL}))

// middleware to parse JSON
app.use(express.json());

// Routes
app.use('/profile', profileRoute);
app.use("/skills", skillRoute);
app.use("/certifications", certificationRoute);
app.use("/experience", experienceRoute);
app.use("/education", educationRoute);
app.use("/send-email", sendEmailRoute)

// connect to mongoDB
const url = process.env.MONGO_URI;
const connectDB = async() => {
    try{
        await mongoose.connect(url);
        console.log("database is connected");
    } catch (err){
        console.log("error in connecting to database" + err);
        process.exit(1);
    }
}

// start server after DB connects
const port = 3000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running at ${port}`)
    })
});
