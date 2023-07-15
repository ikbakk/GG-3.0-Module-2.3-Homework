const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const pathResolve = yourPath => path.resolve(__dirname, yourPath);
const readJsonFile = path => JSON.parse(readFileSync(pathResolve(path)));
const writeJsonFile = (path, data) => {
  const dataString = Buffer.from(JSON.stringify(data)).toString();
  writeFileSync(pathResolve(path), dataString);
};

module.exports = { readJsonFile, writeJsonFile };
