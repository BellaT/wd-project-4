angular
  .module("party")
  .controller("YouTubeController", YouTubeController);

YouTubeController.$inject = ["YouTubePlayer"];
function YouTubeController(YouTubePlayer){

  var self = this;
  self.playNext = YouTubePlayer.playNext;
  self.playPrevious = YouTubePlayer.playPrevious;

  YouTubePlayer.setVideos([
    'de4_vbntd50',
    'F-mjl63e0ms',
    '5X-Mrc2l1d0'
  ]);
}
