// Tried to use a middleware to know how it works
const reqLogger = (req, res, next) => {
  console.log(`Method: ${req.method}, Path: ${req.path}`);
  console.log('Body:');
  console.log(Object.keys(req.body).length > 0 ? req.body : 'No body');
  console.log('\n');
  next();
};

const errorLogger = (error, req, res, next) => {
  const { message, name, stack } = error;

  console.log(`Error name: ${name}`);
  console.log(`Error message: ${message}`);
  console.log(`Error stack: ${stack}`);
  next(error);
};

const invalidPath = (req, res, next) => {
  res.status(404).send('Endpoint Not Found');
};

module.exports = {
  errorLogger,
  invalidPath,
  reqLogger
};
