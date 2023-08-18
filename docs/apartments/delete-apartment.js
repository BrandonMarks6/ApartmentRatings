module.exports = {
  // operation's method.
  delete: {
    tags: ['Apartments'], // operation's tag
    description: 'Deleting an apartment', // short desc
    operationId: 'deleteApartment', // unique operation id
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
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Apartment deleted successfully', // response desc
      },
      // response code
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
