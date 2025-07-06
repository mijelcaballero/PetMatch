require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3018,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  googleMapsApiUrl: process.env.GOOGLE_MAPS_API_URL || 'https://maps.googleapis.com/maps/api/geocode/json'
};
