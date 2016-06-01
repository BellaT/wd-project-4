var Playlist = require("../models/playlist");
var Video    = require("../models/video");

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
  Playlist.findById(req.params.id)
  .populate("videos")
  .exec(function(err, playlist){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ playlist: playlist });
  });
}

function playlistsUpdate(req, res, next){
  var id = req.params.id;
    Playlist.findByIdAndUpdate({ _id: id }, req.body.playlist, { new: true }, function(err, playlist){
      if (err) return res.status(500).json(err);
      if (!playlist) return res.status(404).json(err);
      res.status(200).json({playlist: playlist});
    });
}

function playlistsAddVideo(req, res, next){
  var id = req.params.id;

  Video.create(req.body, function(err, video){
    if (err) return res.status(500).json(err);
    Playlist.findByIdAndUpdate({ _id: id }, {
      $addToSet: {
        videos: video._id
      }
    }, { new: true })
    .populate("videos")
    .exec(function(err, playlist){
      if (err) return res.status(500).json(err);
      if (!playlist) return res.status(404).json(err);
      return res.status(200).json({playlist: playlist});
    });
  });
}

function playlistsDelete(req, res, next){
  var id = req.params.id;

  Playlist.remove({ _id: id}, function(err){
    if (err) return res.status(500).json(err);
    res.status(200).json();
  });
}

module.exports = {
  playlistsIndex:    playlistsIndex,
  playlistsCreate:   playlistsCreate,
  playlistsShow:     playlistsShow,
  playlistsUpdate:   playlistsUpdate,
  playlistsDelete:   playlistsDelete,
  playlistsAddVideo: playlistsAddVideo
};
