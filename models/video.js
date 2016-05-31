var mongoose = require("mongoose");

var videoSchema = mongoose.Schema({
  youtube_title: { type: String, required: true },
  youtube_id: { type: String, required: true }
});

// Getter
videoSchema.path('youtube_id')
.set(function(value) {
  return youtube_parser(value);
});

function youtube_parser(url){
  var regExp = /^.*(youtu.be\/|youtube(-nocookie)?.com\/(v\/|.*u\/\w\/|embed\/|.*v=))([\w-]{11}‌​).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return null;
  }
}

module.exports = mongoose.model("Video", videoSchema);
