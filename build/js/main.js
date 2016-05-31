$(document).ready(function(){

  var vinyl = angular.element('#vinyl');
  console.log(vinyl);
  TweenMax.from(vinyl, 4, {
    // rotation:360, x:300
    opacity: 0,
    ease: Power0.easeNone
  });

});
