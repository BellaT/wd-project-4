angular
  .module("party")
  .controller("PlaylistsIndexController", PlaylistsIndexController);

PlaylistsIndexController.$inject = ["Playlist", "CurrentUser"];
function PlaylistsIndexController(Playlist, CurrentUser){

  var self = this;
  Playlist.query().$promise.then(function(data){

    self.myLists = data.playlists.filter(function(playlist) {
      return playlist.owner === CurrentUser.getUser()._id;
    });

    self.friendsLists = data.playlists.filter(function(playlist) {
      return playlist.owner !== CurrentUser.getUser()._id;
    });
  });
}
