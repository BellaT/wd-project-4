angular
  .module('party')
  .config(Router);

Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);
    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./views/home.html"
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
      controller: "UsersController",
      controllerAs: "profile"
    })
    .state('playlistsIndex', {
      url: "/playlists",
      templateUrl: "./views/playlists/index.html",
      controller: "PlaylistsIndexController",
      controllerAs: "playlistsIndex"
    })
    .state('playlistsNew', {
      url: "/playlists/new",
      templateUrl: "./views/playlists/new.html",
      controller: "PlaylistsNewController",
      controllerAs: "playlistsNew"
    })
    .state('playlistsShow', {
      url: "/playlists/:id",
      templateUrl: "./views/playlists/show.html",
      controller: "PlaylistsShowController",
      controllerAs: "playlistsShow"
    });

  $urlRouterProvider.otherwise("/");
}
