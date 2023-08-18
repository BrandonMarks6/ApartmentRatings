module.exports = {
  // operation's method
  delete: {
    tags: ['Reviews'], // operation's tag
    description: 'Delete Review', // short desc
    operationId: 'deletetReview', // unique operation id
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
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
