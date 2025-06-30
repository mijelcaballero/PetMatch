// src/services/owner.service.js
const Owner = require('../models/owner');

async function createOwner(data) { return Owner.create(data); }
async function getOwner(id)     { return Owner.findById(id); }
async function updateOwner(id,data) { return Owner.update(id,data); }
async function deleteOwner(id)  { return Owner.delete(id); }

module.exports = { createOwner, getOwner, updateOwner, deleteOwner };
// This service provides functions to create, retrieve, update, and delete owners.
// It uses the Owner model to interact with the database. 