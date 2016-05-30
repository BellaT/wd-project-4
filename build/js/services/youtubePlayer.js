angular
  .module('party')
  .factory('YouTubePlayer', YouTubePlayer);

YouTubePlayer.$inject = ["$window"];
function YouTubePlayer($window) {

  var self = this;

  self.current = 0;
  self.player = null;

  self.setVideos = function(videos){
    self.videos = videos;
  };

  self.currentlyPlaying = function(){
    return self.videos[self.current];
  };

  self.playNext = function() {
    self.increaseTrack();
    if (self.player) {
      self.currentlyPlaying();
      self.player.loadVideoById(self.videos[self.current]);
    } else {
      alert('Please Wait! Player is loading');
    }
  };

  self.playPrevious = function() {
    self.decreaseTrack();
    if (self.player) {
      self.currentlyPlaying();
      self.player.loadVideoById(self.videos[self.current]);
    } else {
      alert('Please Wait! Player is loading');
    }
  };

  self.increaseTrack = function () {
    self.current = self.current + 1;
    if (self.current >= self.videos.length) {
      self.current = 0;
    }
  };

  self.decreaseTrack = function() {
    self.current = self.current - 1;
    if (self.current < 0) {
      self.current = self.videos.length - 1;
    }
  };

  self.onReady = function(event) {
    event.target.loadVideoById(self.videos[self.current]);
  };

  self.onStateChange = function(event) {
    if (event.data == YT.PlayerState.ENDED) {
      self.playNext();
    }
  };

  $window.onYouTubeIframeAPIReady = function() {
    self.player = new YT.Player('player', {
      height: '350',
      width: '425',
      events: {
        'onReady': self.onReady,
        'onStateChange': self.onStateChange
      }
    });
  };

  return self;
}
