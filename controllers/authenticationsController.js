var User     = require("../models/user");
var passport = require("passport");
var secret   = require('../config/config').secret;
var config   = require("../config/config");
var rp       = require('request-promise');
var jwt      = require('jsonwebtoken');


function facebook(req, res) {
  console.log("FACEBOOK POST");
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: process.env.DEVISE_FACEBOOK_API_SECRET,
      redirect_uri: config.appUrl + "/"
    };

    console.log(params);

    rp.get({ url: config.oauth.facebook.accessTokenUrl, qs: params, json: true })
      .then(function(accessToken) {
        console.log("accessToken", accessToken);
        return rp.get({ url: config.oauth.facebook.profileUrl, qs: accessToken, json: true });
      })
      .then(function(profile) {
        console.log("profile",profile);
        return User.findOne({ email: profile.email })
          .then(function(user) {
            console.log("user", user);
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
          console.log("token", token);
          return res.send({ token: token });
        })
        .catch(function(err) {
          console.log("error",err);
          return res.status(500).json({ error: err });
        });
  }

  function register(req, res, next) {
  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).json({ message: 'Something went wrong!' });
    if (info) return res.status(401).json({ message: info.message });
    if (!user) return res.status(401).json({ message: 'User already exists!' });

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success: true,
      message: "Thank you for authenticating",
      token: token,
      user: user
    });
  });
  return localStrategy(req, res, next);
}

function login(req, res, next) {
  User.findOne({
    "email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(403).json({ message: 'No user found.' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: 'Authentication failed.' });

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token,
      user: user
    });
  });
}


module.exports = {
  facebook: facebook,
  login: login,
  register: register
};
