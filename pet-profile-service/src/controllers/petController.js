// src/controllers/petController.js
const svc = require('../services/pet.service');

exports.create = async (req,res,next) => {
  try { const pet = await svc.createPet(req.body); res.status(201).json(pet); }
  catch(e){ next(e); }
};

exports.get = async (req,res,next) => {
  try {
    const pet = await svc.getPet(req.params.id);
    if(!pet) return res.status(404).json({error:'Not found'});
    res.json(pet);
  } catch(e){ next(e); }
};

exports.update = async (req,res,next) => {
  try { const pet = await svc.updatePet(req.params.id,req.body); res.json(pet); }
  catch(e){ next(e); }
};

exports.remove = async (req,res,next) => {
  try { await svc.deletePet(req.params.id); res.status(204).end(); }
  catch(e){ next(e); }
};
// This controller handles requests related to pet profiles.
// It uses the pet service to perform operations like creating, retrieving, updating, and deleting pets.
// Each method corresponds to a specific HTTP request and uses the service methods to interact with the database.   