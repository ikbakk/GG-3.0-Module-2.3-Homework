const { getArtistById } = require('../services/artist.services');
const { getSongById } = require('../services/song.services');
const { writeJsonFile } = require('../utils/jsonFileHelper');
const { readJsonFile } = require('../utils/jsonFileHelper');
const { createPlaylist } = require('../models/playlist.models');

const playlists = readJsonFile('../data/playlists.json');

const getAllPlaylists = () => playlists;

const getPlaylistById = playlistId =>
  playlists.find(({ id }) => id === playlistId);

// Mentor once said to try if you can get song data in the playlist by id only, as a practice
const getPlaylistDetails = playlistId => {
  const playlist = getPlaylistById(playlistId);

  if (!playlist) {
    throw new Error(`Playlist with ID(${playlistId}) not found`);
  }

  const songs = playlist.songs.map(songId => getSongById(songId));
  const songsDetail = songs.map(song => ({
    ...song,
    artist: getArtistById(song.artist)
  }));

  return {
    ...playlist,
    songs: songsDetail
  };
};

// Get list of song from a playlist
const getSongsFromPlaylist = (playlistId, sortByCount) => {
  const playlist = getPlaylistById(playlistId);

  if (!playlist) {
    throw new Error(`Playlist with ID(${playlistId}) not found`);
  }

  const songs = playlist.songs.map(songId => getSongById(songId));
  const songsDetail = songs.map(song => ({
    ...song,
    artist: getArtistById(song.artist)
  }));

  // Add feature to get list of songs be sorted by most played
  if (sortByCount === 'least-played') {
    return songsDetail.sort((a, b) => a.totalPlayCount - b.totalPlayCount);
  } else if (sortByCount === 'most-played') {
    return songsDetail.sort((a, b) => b.totalPlayCount - a.totalPlayCount);
  } else {
    return songsDetail;
  }
};

// Add song to a playlist
const addSongToPlaylist = (playlistId, songId) => {
  const playlist = getPlaylistById(playlistId);
  const existingSong = playlist.songs.find(id => id === songId);

  if (!playlist) {
    throw new Error(`Playlist with ID(${playlistId}) not found`);
  }

  if (existingSong) {
    throw new Error(`Song with ID(${songId}) already exists in the playlist`);
  } else {
    playlist.songs.push(songId);

    const updatedJsonFile = [...playlists];

    writeJsonFile('../data/playlists.json', updatedJsonFile);

    return updatedJsonFile;
  }
};

// Make playlist as a model
const createNewPlaylist = name => {
  const possibleId = name.replace(/\s+/g, '').toLowerCase();
  const existingPlaylist = getPlaylistById(possibleId);

  if (existingPlaylist) {
    throw new Error(`Playlist with ID(${possibleId}) already exists`);
  }

  const newPlaylist = createPlaylist(name);
  const updatedJsonFile = [...playlists, newPlaylist];

  return updatedJsonFile;
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  getPlaylistDetails,
  getSongsFromPlaylist,
  addSongToPlaylist,
  createNewPlaylist
};
