const createReview = require('./create-review');
const deleteReview = require('./delete-review');
const getReview = require('./get-review');
const updateReview = require('./update-review');

module.exports = {
  paths: {
    '/reviews/new': {
      ...createReview,
    },
    '/reviews/single/{reviewIndex}': {
      ...getReview,
      ...updateReview,
      ...deleteReview,
    },

  },
};
