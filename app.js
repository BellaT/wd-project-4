var express         = require("express");
var parser          = require("body-parser");
var morgan          = require("morgan");
var methodOverride  = require("method-override");
var qs              = require('qs');
var mongoose        = require('mongoose');
var cors            = require('cors');
var path            = require('path');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var cookieParser    = require("cookie-parser");
var jwt             = require('jsonwebtoken');
var expressJWT      = require('express-jwt');
var app             = express();

var User            = require('./models/user');
var routes          = require('./config/routes');
var config          = require('./config/config');
var secret          = require('./config/config').secret;

mongoose.connect(config.databaseUrl);

require('./config/passport')(passport);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
app.use(parser.json({urlencoded: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));
  app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});
app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));

app.use("/api", routes);

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port);
console.log("Express is listening on port " + config.port);
