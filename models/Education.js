const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: String,
    college: String,
    place: String,
    year: String,
    cgpa: String
})

const educationModel = mongoose.model("Education", educationSchema, "education")

module.exports = educationModel;