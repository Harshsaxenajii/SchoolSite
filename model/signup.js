const mongoose = require("mongoose");
var signupSchema = new mongoose.Schema({
  name: "String",
  last_name: "String",
  age: "Number",
  email: "String",
  Password: "string",
});

var signup = mongoose.model("signup", signupSchema);
module.exports = signup;