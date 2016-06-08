module.exports = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost/party',
  secret: 'notVerySecret',
  appUrl: 'http://shindigsharing.herokuapp.com',
  oauth: {
    facebook: {
      accessTokenUrl: 'https://graph.facebook.com/v2.5/oauth/access_token',
      profileUrl: 'https://graph.facebook.com/v2.5/me?fields=id,email,name,picture'
    }
  }
};
