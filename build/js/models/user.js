angular
  .module('party')
  .factory('User', User);

User.$inject = ['$resource', 'API_URL'];
function User($resource, API_URL){

  return $resource(
    API_URL+'/users/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'register': {
        url: API_URL +'/register',
        method: "POST"
      },
      'login': {
        url: API_URL + '/login',
        method: "POST"
      },
      'search': {
        url: API_URL + '/users/search',
        method: 'POST'
      }
    }
  );
}
