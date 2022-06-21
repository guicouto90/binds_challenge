const mongoose = require('mongoose');
const address = process.env.MONGODB_URI || 'mongodb://localhost:27017/binds_challenge';

const dbConnection = async (_req, _res, next) => {
  try {
    await mongoose.connect(address, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
    next()
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
  
}


module.exports = dbConnection;