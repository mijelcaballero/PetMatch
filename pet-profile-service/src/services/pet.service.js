// src/services/pet.service.js
const Pet = require('../models/pet');

async function createPet(data) { return Pet.create(data); }
async function getPet(id)      { return Pet.findById(id); }
async function updatePet(id,data){ 
  return Pet.findByIdAndUpdate(id,data,{ new:true });
}
async function deletePet(id)   { return Pet.findByIdAndDelete(id); }

module.exports = { createPet, getPet, updatePet, deletePet };
// This service provides functions to create, retrieve, update, and delete pets.
// It uses the Pet model to interact with the database.
// The functions return promises that resolve to the created, retrieved, updated, or deleted pet data.
// The `updatePet` function uses `{ new: true }` to return the updated document instead
// of the original document before the update.
// Ensure that the Pet model is properly defined and connected to the database before using this service.
// This service can be used in your application to manage pet profiles, allowing you to create, retrieve, update, and delete pet information.