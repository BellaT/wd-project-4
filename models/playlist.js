var mongoose = require("mongoose");

var playlistSchema = mongoose.Schema({
  title:  { type: String, required: true },
  users:  [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  videos: [{ type: mongoose.Schema.ObjectId, ref: 'Video' }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model("Playlist", playlistSchema);
