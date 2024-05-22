const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator  = require('validator');
const userRoles = require("../utilities/user_roles")
// Create User schema
const personSchema = new Schema({
  Name: 
  {
    type: String,
    required: true 
  },
  Age:
  {
    type: Number,
    required: true
  },
  National_id:
  {
    type: String,
    required: true
  },
  birthDate:
  {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Person', personSchema);