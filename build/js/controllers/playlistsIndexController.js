angular
  .module("party")
  .controller("PlaylistsIndexController", PlaylistsIndexController);

PlaylistsIndexController.$inject = ["Playlist"];
function PlaylistsIndexController(Playlist){

  var self = this;
  Playlist.query().$promise.then(function(data){
    self.all = data.playlists;
  });
}
