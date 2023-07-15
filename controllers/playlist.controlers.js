const playlistRouter = require('express').Router();
const {
  getAllPlaylists,
  getPlaylistDetails,
  getSongsFromPlaylist,
  addSongToPlaylist,
  createNewPlaylist
} = require('../services/playlist.services');

playlistRouter.get('/', (req, res) => {
  try {
    const playlists = getAllPlaylists();
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

playlistRouter.get('/:playlistId', (req, res) => {
  const { playlistId } = req.params;
  try {
    const playlist = getPlaylistDetails(playlistId);
    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get List of songs from your playlist and add feature to get list of songs be sorted by most played
playlistRouter.get('/:playlistId/songs', (req, res) => {
  const { playlistId } = req.params;
  const { sortByCount } = req.query;
  try {
    const songs = getSongsFromPlaylist(playlistId, sortByCount);
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add song to your playlist
playlistRouter.post('/addSong', (req, res) => {
  const { songId, playlistId } = req.body;
  try {
    if (!songId || !playlistId) {
      throw new Error('Invalid parameters');
    }
    const newPlaylist = addSongToPlaylist(playlistId, songId);
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Make playlist as a model
playlistRouter.post('/create', (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      throw new Error('Please provide a name for new playlist');
    }
    const newPlaylist = createNewPlaylist(name);
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = playlistRouter;
