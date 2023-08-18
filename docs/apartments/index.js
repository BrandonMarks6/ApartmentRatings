const createApartment = require('./create-apartment');
const getApartments = require('./get-apartments');
const deleteApartment = require('./delete-apartment');
const deleteAllApartments = require('./delete-all-apartments.js');
const getApartmentReviews = require('./get-apartment-reviews');
const getAveragePrice = require('./get-average-price');

module.exports = {
  paths: {
    '/apartments': {
      ...getApartments,
    },
    '/apartments/allReviews/{apartmentId}': {
      ...getApartmentReviews,
    },
    '/apartments/average-price/{apartmentId}': {
      ...getAveragePrice,
    },
    '/apartments/new': {
      ...createApartment,
    },
    '/apartments/clear': {
      ...deleteAllApartments,
    },
    '/apartments/delete/{apartmentId}': {
      ...deleteApartment,
    },

  },
};
