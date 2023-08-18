module.exports = {
  // operation's method.
  delete: {
    tags: ['Apartments'], // operation's tag
    description: 'Deleting all apartments', // short desc
    operationId: 'deleteAllApartments', // unique operation id
    parameters: [],
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Apartment deleted successfully', // response desc
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
