// To start running, type 'node index.js'

const dotenv = require('dotenv');
const mongodb = require('mongodb');
const app = require('./server.js');
const apiDAO = require('./dao/api.DAO.js');

// DAO = Data Access Object
const { MongoClient } = mongodb;

dotenv.config();

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.uttfwkz.mongodb.net/?retryWrites=true&w=majority`;
const port = 8000;

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50, // max people allowed at once
    wtimeoutMS: 2500, // milliseconds to connect
    useNewUrlParser: true,
  },
)
  .catch((err) => { // will catch any errors that occur in connection
    console.error(err.stack);// logs the error that comes from the connection
    process.exit(1);// will end the program
  })
  .then(async (client) => { // can run at the same time as other things
    await apiDAO.injectDB(client);// function will send the db to the ReviewsDAO
    app.listen(port, () => {
      console.log(`listneing on port ${port}`);
    });// passed in the port and the function
  });
