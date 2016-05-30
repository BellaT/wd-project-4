var Playlist = require("../models/playlist");

function playlistsIndex(req, res, next){
  Playlist
  .find({ user: req.user._id }, function(err, playlists){
    if (err) return res.status(500).json({message: "Something went wrong."});
    return res.status(201).json({playlists: playlists});
  });
}

/*
 * user:
 */
function playlistsCreate(req, res, next){
  var playlist  = new Playlist(req.body);
  playlist.user = req.user;

  playlist.save(function(err, playlist){
    if (err) return res.status(500).json({message: "Something went wrong."});
    return res.status(201).json({playlist: playlist});
  });
}

function playlistsShow(req, res, next){

}

module.exports = {
  playlistsIndex:  playlistsIndex,
  playlistsCreate: playlistsCreate,
  playlistsShow:   playlistsShow
};
