// http://stackoverflow.com/questions/15199437/get-multiple-embedded-youtube-videos-to-play-automatically-in-sequence

/**
* Push your video IDs in this array
* If it's not already there
*/
var videoIDs = [
  'de4_vbntd50',
  'F-mjl63e0ms',
  '5X-Mrc2l1d0'
];

var player, currentVideoId = 0;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '420',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.loadVideoById(videoIDs[currentVideoId]);
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    currentVideoId++;
    if (currentVideoId < videoIDs.length) {
      player.loadVideoById(videoIDs[currentVideoId]);
    }
  }
}
