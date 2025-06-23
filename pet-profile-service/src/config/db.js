// src/config/db.js
const mongoose = require('mongoose');
const { mongoUri } = require('./index');

mongoose.connect(mongoUri, {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
});

// This code connects to a MongoDB database using Mongoose.
// It imports the connection URI from the configuration file and establishes a connection.
// The connection is exported for use in other parts of the application.
// This is essential for the pet-profile-service to interact with the MongoDB database.
// Add error handling to manage connection errors gracefully.
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully');
});    

module.exports = mongoose;