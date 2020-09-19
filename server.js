// Required Dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Set up port
var PORT = process.env.PORT || 3000;

var app = express();

// Routes
var routes = require("./routes");
//random comment

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware
app.use(routes);

// If deployed, use deployed database. Otherwise use local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(function() {
  console.log("connected")
})
.catch(function(err){
  console.log(err)
})

// Listen on port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
