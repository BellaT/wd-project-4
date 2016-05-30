var mongoose = require("mongoose");

var playlistSchema = mongoose.Schema({
  title:  { type: String, required: true },
  user:   { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  videos: [{ type: mongoose.Schema.ObjectId, ref: 'Video' }]
});

module.exports = mongoose.model("Playlist", playlistSchema);
