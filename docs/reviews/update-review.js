module.exports = {
  // operation's method
  put: {
    tags: ['Reviews'], // operation's tag
    description: 'Update Review', // short desc
    operationId: 'updateReview', // unique operation id
    parameters: [
      {
        name: 'reviewIndex', // name of param
        in: 'path', // location of param
        schema: {
          $ref: '#/components/schemas/reviewIndex', // id model
        },
        required: true, // mandatory
        description: 'Index for a review', // param desc
      },
    ], // expected params
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ReviewInput', // todo input data model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: 'Review updated successfully', // response desc
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
