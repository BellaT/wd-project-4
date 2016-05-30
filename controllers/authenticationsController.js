var User = require("../models/user");
var config = require("../config/config");
var rp = require('request-promise');
var jwt = require('jsonwebtoken');


  function facebook(req, res) {
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: process.env.DEVISE_FACEBOOK_API_SECRET,
      redirect_uri: config.appUrl + "/"
    };

    rp.get({ url: config.oauth.facebook.accessTokenUrl, qs: params, json: true })
      .then(function(accessToken) {
        return rp.get({ url: config.oauth.facebook.profileUrl, qs: accessToken, json: true });
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
          console.log(token);
          return res.send({ token: token });
        })
        .catch(function(err) {
          console.log(err);
          return res.status(500).json({ error: err });
        });
  }

module.exports = {
  facebook: facebook
};
