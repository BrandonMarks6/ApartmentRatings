module.exports = {
  components: {
    schemas: {
      // id model
      apartmentId: {
        type: 'string', // data type
        description: 'An id of an apartment', // desc
        example: '64bec67a7993e7b9ddec51fb', // example of an id
      },
      reviewIndex: {
        type: 'number', // data type
        description: 'An index of an review', // desc
        example: '3', // example of an id
      },
      price: {
        type: 'number', // data type
        description: 'An monthly price of an apartment', // desc
        example: '450', // example of an id
      },
      ReviewInput: {
        type: 'object', // data type
        properties: {
          apartmentId: {
            type: 'string',
            description: 'An id number to represent the apartment to attach the review to',
            example: '64a3223df8fe2ae0cfd4663c',
          },
          review: {
            type: 'string', // data type
            description: 'The body of the review of the apartment', // desc
            example: 'I loved it here', // example of a title
          },
          user: {
            type: 'string', // data type
            description: 'The user that submitted the review', // desc
            example: 'John Doe', // example of a completed value
          },
          price: {
            type: 'number', // data type
            description: 'The price that the reviewer was paying at the apartment per month', // desc
            example: '450', // example of a completed value
          },
        },
      },
      Review: {
        type: 'object', // data type
        properties: {
          apartmentId: {
            type: 'string',
            description: 'An id number to represent the apartment to attach the review to',
            example: '64a3223df8fe2ae0cfd4663c',
          },
          review: {
            type: 'string', // data type
            description: 'The body of the review of the apartment', // desc
            example: 'I loved it here', // example of a title
          },
          user: {
            type: 'string', // data type
            description: 'The user that submitted the review', // desc
            example: 'John Doe', // example of a completed value
          },
          price: {
            type: 'number', // data type
            description: 'The price that the reviewer was paying at the apartment per month', // desc
            example: '450', // example of a completed value
          },
        },
      },

      ApartmentInput: {
        type: 'object', // data type
        properties: {
          name: {
            type: 'string', // data type
            description: 'Title of the apartent', // desc
            example: 'The Apartments', // example of a title
          },
          description: {
            type: 'string', // data type
            description: 'An array of reviews of the apartment', // desc
            example: 'The apartments are a great place to live because of the pool and other amenities.', // example of a completed value
          },

        },
      },
      Apartment: {
        type: 'object', // data type
        properties: {
          _id: {
            type: 'string',
            description: 'An id number to represent an apartment',
            example: '64a3223df8fe2ae0cfd4663c',
          },
          name: {
            type: 'string', // data type
            description: 'Title of the apartent', // desc
            example: 'The Apartments', // example of a title
          },
          description: {
            type: 'string', // data type
            description: 'An array of reviews of the apartment', // desc
            example: 'The apartments are a great place to live because of the pool and other amenities.', // example of a completed value
          },
          reviewsArray: {
            type: 'array',
            description: 'An array of all reviews for the apartment',
            example: 'XXXXX',
          },
          averagePrice: {
            type: 'number',
            description: 'The average price of the apartment base on reviews',
            example: '450',
          },
          totalReviews: {
            type: 'number',
            description: 'The total number of reviews of the apartment',
            example: '10',
          },
        },
      },

    },
  },
};
