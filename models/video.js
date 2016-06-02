var mongoose      = require("mongoose");

var videoSchema = mongoose.Schema({
  youtube_id: { type: String, required: true },
  title: { type: String }
});

// Getter
videoSchema.path('youtube_id')
.set(function(value) {
  return youtube_parser(value);
});

function youtube_parser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

module.exports = mongoose.model("Video", videoSchema);
