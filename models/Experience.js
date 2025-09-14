
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    company: String,
    role: String,
    year: String,
    description: [String]
})

const experienceModel = mongoose.model("Experience", experienceSchema, "experience");
module.exports = experienceModel;