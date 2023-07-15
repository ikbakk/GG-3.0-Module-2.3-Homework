const songRouter = require('express').Router();
const {
  songDetails,
  playSong,
  getAllSongs
} = require('../services/song.services');

songRouter.get('/', (req, res) => {
  try {
    const songs = getAllSongs();
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

songRouter.get('/:songId', (req, res) => {
  const { songId } = req.params;
  try {
    const details = songDetails(songId);
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

songRouter.get('/:songId/play', (req, res) => {
  const { songId } = req.params;
  try {
    const url = playSong(songId);
    res.status(200).send(url);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = songRouter;
