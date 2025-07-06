const axios = require('axios');
const { googleMapsApiKey, googleMapsApiUrl } = require('../config');

async function geocodeAddress(address) {
  const params = {
    address,
    key: googleMapsApiKey
  };
  const response = await axios.get(googleMapsApiUrl, { params });
  const data = response.data;
  if (data.status !== 'OK' || !data.results.length) {
    throw new Error(data.error_message || 'Geocoding failed');
  }
  const location = data.results[0].geometry.location;
  return {
    latitude: location.lat,
    longitude: location.lng,
    formattedAddress: data.results[0].formatted_address
  };
}

module.exports = { geocodeAddress };
