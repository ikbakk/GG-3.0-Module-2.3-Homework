const createPlaylist = name => {
  const id = name.replace(/\s+/g, '').toLowerCase();
  return {
    id,
    name,
    songs: []
  };
};

module.exports = { createPlaylist };
