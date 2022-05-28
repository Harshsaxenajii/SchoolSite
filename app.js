//express specific code
const express = require("express");
const path = require("path");
const app = express();
var PORT = process.env.PORT || 5000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

//mongoose
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SchoolSignup");
  console.log("we are connected");
}

const signup = require("./model/signup");

//express static declearation
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// pug specific stuff
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//endpoints
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/payment", (req, res) => {
  res.render("payment");
});

//post backend request
//ALSO USE NPM I BODY PARSER
app.post("/signup", (req, res) => {
  var myData = new signup(req.body);
  myData
    .save()
    .then(() => {
      // res.send("this all data is saved in database");
      res.render("login")
    })
    .catch(() => {
      res.status(400).send("this item is not saved in our database");
    });
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const Password = req.body.Password;

    let useremail = await signup.findOne({ email: email });
    // res.send(useremail);
    // console.log(useremail);
    if (useremail.Password === Password) {
      res.render("index");
    }
  } catch (error) {
    res.status(404).send("invalid details");
  }
});

//start the server
app.listen(PORT, () => {
  console.log(`this app is started successfully on ${PORT}`);
});
