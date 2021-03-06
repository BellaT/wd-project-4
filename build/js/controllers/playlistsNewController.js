angular
  .module("party")
  .controller("PlaylistsNewController", PlaylistsNewController);

PlaylistsNewController.$inject = ["Playlist", "$state"];
function PlaylistsNewController(Playlist, $state){

  var self = this;

  self.create = function(){
    Playlist.save(self.playlist).$promise.then(function(data){
      $state.go("playlistsShow", { id: data.playlist._id });
    });
  };
}
