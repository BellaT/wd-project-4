var express         = require("express");
var parser          = require("body-parser");
var morgan          = require("morgan");
var methodOverride  = require("method-override");
var cors            = require('cors');
var jwt             = require('jsonwebtoken');
var request         = require('request-promise');
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
app.use(cors({
  origin: config.databaseUrl,
  credentials: true
}));
app.use("/", express.static("public"));
app.use("/", express.static("bower_components"));

app.post('/auth/facebook', function(req, res) {
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.DEVISE_FACEBOOK_API_SECRET,
    redirect_uri: config.databaseUrl + "/"
  };

  request.get({ url: config.oauth.facebook.accessTokenUrl, qs: params, json: true })
    .then(function(accessToken) {
      return request.get({ url: config.oauth.facebook.profileUrl, qs: accessToken, json: true });
    })
    .then(function(profile) {
      return User.findOne({ email: profile.email })
        .then(function(user) {
          if(user) {
            user.facebookId = profile.id;
            user.picture = user.picture || profile.picture.data.url;
          }
          else {
            user = new User({
              facebookId: profile.id,
              name: profile.name,
              picture: profile.picture.data.url,
              email: profile.email
            });
          }
          return user.save();
        });
      })
      .then(function(user) {
        var token = jwt.sign(user, config.secret, { expiresIn: '24h' });
        return res.send({ token: token });
      })
      .catch(function(err) {
        return res.status(500).json({ error: err });
      });
});

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port);
console.log("Express is listening on port " + config.port);
