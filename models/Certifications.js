
const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    name: String,
    from: String,
    year: String,
    certificationLink: String
})

const certificationModel = mongoose.model("Certifications", certificationSchema, "certifications");
module.exports = certificationModel;