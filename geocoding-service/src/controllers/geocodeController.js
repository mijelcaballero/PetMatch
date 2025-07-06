const { geocodeAddress } = require('../services/geocodeService');

async function getGeocode(req, res, next) {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: 'address query parameter is required' });
    }
    const result = await geocodeAddress(address);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { getGeocode };
