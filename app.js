//express specific code
const express = require("express");
const path = require("path");
const app = express();
var PORT = 5000;



app.use("/static", express.static("static"));
app.use(express.urlencoded());

// pug specific stuff
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//endpoints
app.get("/", (req, res) => {
  res.render("index");
});

//start the server
app.listen(PORT, () => {
  console.log(`this app is started successfully on ${PORT}`);
});
