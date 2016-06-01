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
  console.log("playlistShow: \n", req.params);

  Playlist.findById(req.params.id, function(err, playlist){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ playlist: playlist });
    console.log("PLAYLIST: \n", playlist);
  });
}

function playlistsUpdate(req, res, next){
  var id = req.params.id;

    console.log("req.body.playlist: \n", req.body.playlist);

    Playlist.findByIdAndUpdate({ _id: id }, req.body.playlist, { new: true }, function(err, playlist){
      if (err) return res.status(500).send(err);
      if (!playlist) return res.status(404).send(err);
      res.status(200).send(playlist);
      console.log('playlistsUpdate() in back-end controller');
    });
}

function playlistsDelete(req, res, next){
  var id = req.params.id;

  Playlist.remove({ _id: id}, function(err){
    if (err) return res.status(500).send(err);
    res.status(200).send();
  });
}

module.exports = {
  playlistsIndex:  playlistsIndex,
  playlistsCreate: playlistsCreate,
  playlistsShow:   playlistsShow,
  playlistsUpdate: playlistsUpdate,
  playlistsDelete: playlistsDelete
};
