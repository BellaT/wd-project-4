var Playlist = require("../models/playlist");
var Video    = require("../models/video");

function playlistsIndex(req, res, next){
  Playlist
  .find({ $or: [{ owner: req.user._id }, { users: req.user._id }] }, function(err, playlists){
    if (err) return res.status(500).json({message: "Something went wrong."});
    return res.status(201).json({playlists: playlists});
  });
}

function playlistsCreate(req, res, next){
  var playlist  = new Playlist(req.body);
  playlist.owner = req.user;
  playlist.users = [req.user];

  playlist.save(function(err, playlist){
    console.log(err, playlist);
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

    Playlist.findByIdAndUpdate(id, req.body, { new: true }, function(err, playlist){
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
  console.log("PLAYLISTS DELETE");
  var id = req.params.id;

  Playlist.findById(id, function(err, playlist) {
    console.log(playlist.owner, playlist._id);
    if(playlist.owner !== playlist._id) return res.sendStatus(401);
    playlist.remove(function(err){
      if (err) return res.status(500).json(err);
      res.status(200).json();
    });
  });
}

function playlistsUsers(req, res, next){
  var user = req.body;

}

module.exports = {
  playlistsIndex:    playlistsIndex,
  playlistsCreate:   playlistsCreate,
  playlistsShow:     playlistsShow,
  playlistsUpdate:   playlistsUpdate,
  playlistsDelete:   playlistsDelete,
  playlistsAddVideo: playlistsAddVideo
};
