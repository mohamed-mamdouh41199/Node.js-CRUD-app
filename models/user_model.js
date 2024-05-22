const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator  = require('validator');
const userRoles = require("../utilities/user_roles")
// Create User schema
const userSchema = new Schema({
  first_name: 
  {
    type: String,
    required: true 
  },
  last_name: 
  {
    type: String,
    required: true 
  },
  email: 
  {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail , "Invalid Email Address"]
  },
  password: 
  {
    type: String,
    required: true 
  },
  token:
  {
    type : String
  },
  role: 
  {
    type: String, // ["USER", "ADMIN", "MANGER"]
    enum: [userRoles.USER, userRoles.ADMIN],
    default: userRoles.USER
  },
  avatar:
  {
    type: String,
    default: "uploads/profile.jpg"
  }
});

module.exports = mongoose.model('User', userSchema);