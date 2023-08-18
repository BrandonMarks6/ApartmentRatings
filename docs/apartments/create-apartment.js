module.exports = {
  // operation's method
  post: {
    tags: ['Apartments'], // operation's tag
    description: 'Create Apartment', // short desc
    operationId: 'createApartment', // unique operation id
    parameters: [], // expected params
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ApartmentInput', // todo input data model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: 'Apartment created successfully', // response desc
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
