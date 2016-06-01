angular
  .module("party")
  .controller("PlaylistsShowController", PlaylistsShowController);

PlaylistsShowController.$inject = ["YouTubePlayer", "$stateParams", "$state", "Playlist"];
function PlaylistsShowController(YouTubePlayer, $stateParams, $state, Playlist){

  var self = this;
  self.playlists = Playlist.query();
  self.playlist = {};
  self.deletePlaylist = deletePlaylist;
  self.playNext = YouTubePlayer.playNext;
  self.playPrevious = YouTubePlayer.playPrevious;
  self.setVideos = YouTubePlayer.setVideos;
  self.getPlaylist = getPlaylist;



  function getPlaylist(){
    var playlistId = $stateParams.id;

    Playlist.get({id: playlistId }, function(data){
      console.log('data: \n', data);
    });
  }

  var finalPlaylist = [
    'de4_vbntd50',
    'F-mjl63e0ms',
    '5X-Mrc2l1d0'
  ];

  function deletePlaylist(){
    var playlistId = $stateParams.id;
    Playlist.remove({id: playlistId});
    $state.go("playlistsIndex");
  }

  YouTubePlayer.setVideos(finalPlaylist);
}
