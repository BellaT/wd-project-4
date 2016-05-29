angular
  .module('party', ['satellizer'])
  .constant('API_URL', 'http://localhost:3000')
  .constant('facebookClientId', "482249538632671")
  .config(oauthConfig);

oauthConfig.$inject = ['API_URL', '$authProvider', 'facebookClientId'];
function oauthConfig(API_URL, $authProvider, facebookClientId) {
  $authProvider.facebook({
    url: API_URL + '/auth/facebook',
    clientId: facebookClientId // replace with your facebook client id
  });
}
