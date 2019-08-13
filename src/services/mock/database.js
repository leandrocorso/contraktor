function database(mock) {
  const data = require(`./${mock}`);
  return new Promise(resolve => resolve(data));
}

export default database;
