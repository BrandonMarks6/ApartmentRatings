module.exports = {
  // operation's method
  get: {
    tags: ['Reviews'], // operation's tag
    description: 'Get Review', // short desc
    operationId: 'getReview', // unique operation id
    parameters: [
      // expected parameters
      {
        name: 'reviewIndex', // name of param
        in: 'path', // location of param
        schema: {
          $ref: '#/components/schemas/reviewIndex', // id model
        },
        required: true, // mandatory
        description: 'Index for a review', // param desc
      },
      {
        name: 'X-ApartmentId', // custom header name
        in: 'header', // location of header
        schema: {
          $ref: '#/components/schemas/apartmentId', // schema type (change to match your data type)
        },
        required: true, // mandatory
        description: 'ID number', // header desc
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: 'Review successfully located', // response desc
        // expected request body
        content: {
        // content-type
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Review', // todo input data model
            },
          },
        },
      },
      404: {
        description: 'Review could not be found', // response desc
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
