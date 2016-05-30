var express         = require("express");
var parser          = require("body-parser");
var morgan          = require("morgan");
var methodOverride  = require("method-override");
var qs              = require('qs');
var mongoose        = require('mongoose');
var app             = express();

var User            = require('./models/user');
var routes          = require('./config/routes');
var config          = require('./config/config');

mongoose.connect(config.databaseUrl);

app.use(morgan("dev"));
app.use(parser.json({urlencoded: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));

app.use("/", routes);

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port);
console.log("Express is listening on port " + config.port);
