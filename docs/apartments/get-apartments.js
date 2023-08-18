module.exports = {
  // method of operation
  get: {
    tags: ['Apartments'], // operation's tag.
    description: 'Get Apartments', // operation's desc.
    operationId: 'getApartments', // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Apartments were obtained', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Apartment', // Todo model
            },
          },
        },
      },
      404: {
        description: 'Apartment not found', // response desc
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
