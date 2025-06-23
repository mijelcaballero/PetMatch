// src/app.js
const express = require('express');
const petRoutes = require('./routes/pet.routes');
const app = express();
app.use(express.json());
app.use('/api', petRoutes);
app.get('/health',(req,res)=>res.json({status:'OK',service:'pet-profile-service'}));
app.use((req,res)=>res.status(404).json({error:'Not found'}));
app.use((err,_,res,_)=>res.status(500).json({error:err.message}));
module.exports = app;
// This code sets up an Express application for the pet profile service.
// It includes routes for handling pet-related requests, a health check endpoint, and error handling.   