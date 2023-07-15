const { readJsonFile, writeJsonFile } = require('../utils/jsonFileHelper');
const { getArtistById } = require('../services/artist.services');

const songs = readJsonFile('../data/songs.json');

const getAllSongs = () => songs;

const getSongById = songId => {
  return songs.find(({ id }) => id === songId);
};

// Try to get artist data only from the artist id from songs.json as a self practice
const songDetails = songId => {
  const songFound = getSongById(songId);

  if (!songFound) {
    throw new Error(`Song with ID(${songId}) not found`);
  }

  return {
    ...songFound,
    artist: getArtistById(songFound.artist)
  };
};

// Track song play count in the playlist
const playSong = songId => {
  const songFound = getSongById(songId);

  if (!songFound) {
    throw new Error(`Song with ID(${songId}) not found`);
  }

  songFound.totalPlayCount++;

  const updatedJsonFile = [...songs];

  writeJsonFile('../data/songs.json', updatedJsonFile);

  return songFound.url;
};

module.exports = { songDetails, playSong, getAllSongs, getSongById };
