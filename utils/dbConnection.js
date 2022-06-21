const connection = require('mongoose');
const address = process.env.MONGODB_URI || 'mongodb://localhost:27017/binds_challenge';

const dbConnection = () => {
  return connection.connect(address);
}


module.exports = dbConnection;