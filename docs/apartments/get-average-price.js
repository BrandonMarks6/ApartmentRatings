module.exports = {
  // method of operation
  get: {
    tags: ['Apartments'], // operation's tag.
    description: 'Get Average Price', // operation's desc.
    operationId: 'getAveragePrice', // unique operation id.
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
      201: {
        description: 'Apartment price was obtained', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/price', // Todo model
            },
          },
        },
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
