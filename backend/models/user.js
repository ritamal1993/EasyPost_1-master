const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
