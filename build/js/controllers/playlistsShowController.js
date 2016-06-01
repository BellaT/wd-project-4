angular
  .module("party")
  .controller("PlaylistsShowController", PlaylistsShowController);

PlaylistsShowController.$inject = ["YouTubePlayer", "$stateParams", "$state", "Playlist"];
function PlaylistsShowController(YouTubePlayer, $stateParams, $state, Playlist){

  var self = this;
  self.playNext     = YouTubePlayer.playNext;
  self.playPrevious = YouTubePlayer.playPrevious;
  self.setVideos    = YouTubePlayer.setVideos;
  self.deletePlaylist = deletePlaylist;
  self.addVideo    = addVideo;

  Playlist.get($stateParams, function(data){
    self.playlist = data.playlist;
    YouTubePlayer.setVideos(data.playlist.videos.map(function(video){
      return video.youtube_id;
    }));
  });

  function deletePlaylist(){
    var playlistId = $stateParams.id;
    Playlist.remove({id: playlistId});
    $state.go("playlistsIndex");
  }

  function addVideo(){
    Playlist.add($stateParams, { youtube_id: self.video }).$promise.then(function(data){
      console.log(data);
    });
  }

}
