angular
  .module('party')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state'];
function MainController($auth, $state) {

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
    $state.go("home");
  };

}
