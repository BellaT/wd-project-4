angular
  .module("party")
  .controller("PlaylistsShowController", PlaylistsShowController);

PlaylistsShowController.$inject = ["YouTubePlayer", "$stateParams", "$state", "Playlist", "$window", "socket"];
function PlaylistsShowController(YouTubePlayer, $stateParams, $state, Playlist, $window, socket){

  var self            = this;
  self.playNext       = YouTubePlayer.playNext;
  self.playPrevious   = YouTubePlayer.playPrevious;
  self.setVideos      = YouTubePlayer.setVideos;
  self.deletePlaylist = deletePlaylist;
  self.addVideo       = addVideo;

  Playlist.get($stateParams, function(data){
    self.playlist = data.playlist;
    self.videos   = mapVideos(data.playlist);
    YouTubePlayer.setVideos(self.videos);
  });

  socket.on('connect', function(socket) {
    console.log('Connected!');
  });

  socket.emit("joinRoom", $stateParams.id);

  socket.on("updateVideo", function(videosArray){
    console.log("updateVideo", videosArray);
    YouTubePlayer.setVideos(videosArray);
  });

  function deletePlaylist(){
    var playlistId = $stateParams.id;
    Playlist.remove({id: playlistId});
    $state.go("playlistsIndex");
  }

  function mapVideos(playlist){
    return playlist.videos.map(function(video){
      return video.youtube_id;
    });
  }

  function addVideo(){
    Playlist.add($stateParams, { youtube_id: self.video }).$promise.then(function(data){
      var videosArray = mapVideos(data.playlist);
      self.video = null;
      self.playlist = data.playlist;
      YouTubePlayer.setVideos(videosArray);
      var socketData = {
        videos_array: videosArray,
        channel_id: $stateParams.id,
      };
      socket.emit("addVideo", socketData);
    });
  }

}
