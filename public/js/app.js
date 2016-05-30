angular
  .module('party', ['satellizer'])
  .constant('API_URL', 'http://localhost:3000')
  .constant('facebookClientId', "482249538632671")
  .config(oauthConfig)
  .config(Router);

oauthConfig.$inject = ['API_URL', '$authProvider', 'facebookClientId'];
function oauthConfig(API_URL, $authProvider, facebookClientId) {
  $authProvider.facebook({
    url: API_URL + '/auth/facebook',
    clientId: facebookClientId // replace with your facebook client id
  });
}

Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);
    $stateProvider
    .state("home", {
      url:    "/",
      templateUrl: "/views/home.html"
    })
    .state("partiesIndex", {
      url:      "/parties",
      templateUrl: "/views/parties-index.html",
      controller: "partiesIndexController",
      controllerAs: "partiesIX"
    });
}
