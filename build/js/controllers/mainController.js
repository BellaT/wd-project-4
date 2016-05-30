angular
  .module('party')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state'];
function MainController($auth, $state) {

  this.authenticate = function(provider) {
    $auth.authenticate(provider);
    $state.go("home");
  };

}
