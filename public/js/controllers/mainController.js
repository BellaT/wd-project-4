angular
  .module('party')
  .controller('MainController', MainController);

MainController.$inject = ['$auth'];
function MainController($auth) {

  this.authenticate = function(provider) {
    $auth.authenticate(provider);
  }

}
