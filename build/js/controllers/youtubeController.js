angular
  .module("party")
  .controller("YouTubeController", YouTubeController);

YouTubeController.$inject = ["YouTubePlayer"];
function YouTubeController(YouTubePlayer){

  function onYouTubeIframeAPIReady() {
    YouTubePlayer.player = new YT.Player('player', {
      height: '350',
      width: '425',
      events: {
        'onReady': YouTubePlayer.onReady,
        'onStateChange': YouTubePlayer.onStateChange
      }
    });
  }
}
