
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    languages: [String], // array of strings
    frontend: [String],
    backend: [String],
    apisAndLibraries: [String],
    tools: [String],
    testing: [String]
})

const skillModel = mongoose.model("Skills", skillSchema, "skills");

module.exports = skillModel;