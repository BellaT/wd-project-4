angular
  .module("party")
  .controller("PlaylistsShowController", PlaylistsShowController);

PlaylistsShowController.$inject = ["YouTubePlayer", "$stateParams", "$state", "Playlist", "$window"];
function PlaylistsShowController(YouTubePlayer, $stateParams, $state, Playlist, $window){

  var self            = this;
  self.playNext       = YouTubePlayer.playNext;
  self.playPrevious   = YouTubePlayer.playPrevious;
  self.setVideos      = YouTubePlayer.setVideos;
  self.deletePlaylist = deletePlaylist;
  self.addVideo       = addVideo;

  Playlist.get($stateParams, function(data){
    self.playlist = data.playlist;
    setVideos(data.playlist);
  });

  function deletePlaylist(){
    var playlistId = $stateParams.id;
    Playlist.remove({id: playlistId});
    $state.go("playlistsIndex");
  }

  function setVideos(playlist){
    YouTubePlayer.setVideos(playlist.videos.map(function(video){
      return video.youtube_id;
    }));
  }

  function addVideo(){
    Playlist.add($stateParams, { youtube_id: self.video }).$promise.then(function(data){
      self.video = null;
      self.playlist = data.playlist;
      setVideos(data.playlist);
    });
  }

}
