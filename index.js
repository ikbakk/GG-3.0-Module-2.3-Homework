const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./utils/middleware');
const songRouter = require('./controllers/song.controlers');
const playlistRouter = require('./controllers/playlist.controlers');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(middleware.reqLogger);

app.use('/api/songs', songRouter);
app.use('/api/playlists', playlistRouter);

app.use(middleware.invalidPath);
app.use(middleware.errorLogger);

app.listen(3000, () => {
  console.log('Server runs in port 3000');
});
