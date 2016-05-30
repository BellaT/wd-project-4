angular
  .module('party')
  .config(Interceptor);

Interceptor.$inject = ["$httpProvider"];
function Interceptor($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
}
