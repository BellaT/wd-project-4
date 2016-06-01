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

  socket.on("updateVideo", function(data){
    alert(data);
    // YouTubePlayer.setVideos(self.videos.push(data));
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
      self.video = null;
      self.playlist = data.playlist;
      YouTubePlayer.setVideos(mapVideos(data.playlist));
      var socketData = {
        youtube_id: data.playlist.videos[data.playlist.videos.length-1].youtube_id,
        channel_id: $stateParams.id,
      };
      socket.emit("addVideo", socketData);
    });
  }

}
