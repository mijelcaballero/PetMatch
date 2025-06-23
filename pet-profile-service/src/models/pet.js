// src/models/pet.js
const mongoose = require('../config/db');

const petSchema = new mongoose.Schema({
  ownerId:   { type: String, required: true },
  name:      { type: String, required: true },
  species:   { type: String, enum: ['dog','cat'], required: true },
  breed:     String,
  age:       Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', petSchema);
// This code defines a Mongoose schema for a Pet model, which includes fields for ownerId, name, species, breed, age, and createdAt. The species field is restricted to 'dog' or 'cat'. The model is then exported for use in other parts of the application.
// Ensure that the MongoDB connection is established before using this model.   