module.exports = {
  // method of operation
  get: {
    tags: ['Apartments'], // operation's tag.
    description: 'Get Apartment Reviews', // operation's desc.
    operationId: 'getApartmentReviews', // unique operation id.
    parameters: [
      // expected parameters
      {
        name: 'apartmentId', // name of param
        in: 'path', // location of param
        schema: {
          $ref: '#/components/schemas/apartmentId', // id model
        },
        required: true, // mandatory
        description: 'Id for an apartment', // param desc
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Apartment Reviews were obtained', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Review', // Todo model
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
