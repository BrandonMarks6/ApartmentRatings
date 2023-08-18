module.exports = {
  // operation's method
  post: {
    tags: ['Reviews'], // operation's tag
    description: 'Create Review', // short desc
    operationId: 'createReview', // unique operation id
    parameters: [], // expected params
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
        description: 'Review created successfully', // response desc
      },
      400: {
        description: 'Invalid info sent', // response desc
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
