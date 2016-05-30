angular
  .module("party")
  .controller("PlaylistsNewController", PlaylistsNewController);

PlaylistsNewController.$inject = ["Playlist"];
function PlaylistsNewController(Playlist){

  var self = this;
  self.create = function(){
    Playlist.save(self.playlist).$promise.then(function(data){
      console.log(data);
    });
  };
}
