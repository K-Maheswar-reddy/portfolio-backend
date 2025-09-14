
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  profilePhoto: String,
  aboutMe: String,
  github: String,
  gmail: String,
  linkedin: String,
  location: String,
  phone: String,
  profileImg: String,
  about:String,
  outOfWork: String,
  codePen: String,
  sayHello: String,
  caption: String,
  capTitle: String
})

const profileModel = mongoose.model("Profile", profileSchema, "profile");

module.exports = profileModel