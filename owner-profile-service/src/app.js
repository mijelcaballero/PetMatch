// src/app.js
const express = require('express');
const ownerRoutes = require('./routes/ownerRoutes');
const app = express();

app.use(express.json());
app.use('/api', ownerRoutes);

app.get('/health',(req,res)=>res.json({status:'OK',service:'owner-profile-service'}));

// Error y 404
app.use((req,res)=>res.status(404).json({error:'Not found'}));
app.use((err,_,res,_)=>res.status(err.statusCode||500).json({error:err.message}));

module.exports = app;
