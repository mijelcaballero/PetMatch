// src/controllers/ownerController.js
const svc = require('../services/owner.service');

exports.create = async (req,res,next) => {
  try {
    const owner = await svc.createOwner(req.body);
    res.status(201).json(owner);
  } catch(e){ next(e); }
};

exports.get = async (req,res,next) => {
  try {
    const owner = await svc.getOwner(req.params.id);
    if(!owner) return res.status(404).json({error:'Not found'});
    res.json(owner);
  } catch(e){ next(e); }
};

exports.update = async (req,res,next) => {
  try {
    const owner = await svc.updateOwner(req.params.id,req.body);
    res.json(owner);
  } catch(e){ next(e); }
};

exports.remove = async (req,res,next) => {
  try {
    await svc.deleteOwner(req.params.id);
    res.status(204).end();
  } catch(e){ next(e); }
};
