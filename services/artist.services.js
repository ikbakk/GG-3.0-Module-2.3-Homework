const { readJsonFile } = require('../utils/jsonFileHelper');

const artists = readJsonFile('../data/artists.json');

const getAllArtists = () => artists;

const getArtistById = artistId => artists.find(({ id }) => id === artistId);

module.exports = {
  getAllArtists,
  getArtistById
};
