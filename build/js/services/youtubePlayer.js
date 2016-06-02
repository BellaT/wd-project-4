angular
  .module('party')
  .factory('YouTubePlayer', YouTubePlayer);

YouTubePlayer.$inject = ["$window"];
function YouTubePlayer($window) {

  var self = this;

  self.current = 0;
  self.player = null;
  self.videos = [];

  self.setVideos = function(videosArray){
    self.videos = videosArray;
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
    console.log("Running");
    self.createPlayer();
  };

  self.createPlayer = function(){
    self.player = new YT.Player('player', {
      height: '500',
      width: '780',
      events: {
        'onReady': self.onReady,
        'onStateChange': self.onStateChange
      }
    });
  };

  return self;
}
