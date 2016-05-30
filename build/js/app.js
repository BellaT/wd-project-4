angular
  .module('party', ['satellizer', 'ui.router', 'angular-jwt', 'ngResource'])
  .constant('API_URL', 'http://localhost:3000/api')
  .constant('facebookClientId', "482249538632671")
  .config(oauthConfig)
  .config(Router)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

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
      templateUrl: "./views/home.html"
    })
    .state("partiesIndex", {
      url:      "/parties",
      templateUrl: "./views/parties/parties-index.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./views/users/show.html",
      controller: "UsersController as profile"
    });
  $urlRouterProvider.otherwise("/");
}
