angular
.module('party')
.controller('StaticsController', StaticsController);

StaticsController.$inject = ['$state'];
function StaticsController($state) {

  TweenMax.from('img#vinyl', 1, {
    opacity: 0,
    ease: Power0.easeNone
  });

}
