const TESTING_HOST = "localhost";
const TESTING_PORT = 3000;
const TESTING_URL = `http://${TESTING_HOST}:${TESTING_PORT}`;

// --------------------------------- MongoDb connection -----------------------------//

// Mongodb connection
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/unitTesting';

function connect() {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI,
            { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            })
        })
    } else {
      mongoose.connect(DB_URI,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        })
    }
  });
}

function close() {
  return mongoose.disconnect();
}

//----------------------------------------------------------------------------------------------------//

//---------------------------------- Redis server connection -----------------------------------------//

// Redis connection
const redis = require('redis');
const redisPort = process.env.PORT || 6379;

const redisClient = redis.createClient({
  host: 'localhost',
  port: redisPort
});

redisClient.on('connect', () => {
  console.log('Redis - Connection status: connected');
});

redisClient.on('end', () => {
  console.log('Redis - Connection status: disconnected');
});

redisClient.on('reconnecting', () => {
  console.log('Redis - Connection status: reconnecting');
});

redisClient.on('error', (err) => {
  console.log('Redis - Connection status: error ', { err });
});

// ----------------------------------------------------------------------------------//

module.exports = {
  TESTING_HOST,
  TESTING_PORT,
  TESTING_URL,
  connect,
  close,
  redisClient
}