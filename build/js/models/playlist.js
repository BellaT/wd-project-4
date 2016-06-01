angular
  .module('party')
  .factory('Playlist', Playlist);

Playlist.$inject = ['$resource', 'API_URL'];
function Playlist($resource, API_URL){

  return $resource(
    API_URL+'/playlists/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'update':    { method: 'PUT' },
      'add': {
        url: API_URL + '/playlists/:id/add',
        method: 'PUT'
      }
    }
  );
}
