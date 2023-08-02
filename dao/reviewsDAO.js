import { ObjectId } from 'mongodb';

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) { // gets a connection
    if (reviews) { // stops if already connected
      return;
    }
    try {
      reviews = await conn.db('reviews').collection('reviews');// gets the entire review databse then gets the collectcion of reviews
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(apartmentId, user, review, price) {
    try {
      const reviewDoc = {
        apartmentId,
        user,
        review,
        price,
      };

      // Retrieve the apartment document and handle existing reviewsArray
      const currentApartment = await reviews.findOne({ _id: new ObjectId(apartmentId) });
      const existingReviews = currentApartment.reviewsArray;

      // Create the new reviews array with the existing reviews and the new review
      const newReviews = [...existingReviews, reviewDoc];

      // increments total reviews by one
      const oldTotalReviews = currentApartment.totalReviews;
      const newTotalReviews = oldTotalReviews + 1;

      // will find the neew average price of the apartment
      const oldAveragePrice = currentApartment.averagePrice;
      const newAveragePrice = oldAveragePrice + ((price - oldAveragePrice) / newTotalReviews);

      // Update the apartment document with the new reviews array
      const updateResponse = await reviews.findOneAndUpdate(
        { _id: new ObjectId(apartmentId) },
        {
          $set: {
            reviewsArray: newReviews,
            totalReviews: newTotalReviews,
            averagePrice: newAveragePrice,
          },
        },
        { returnOriginal: false },
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, apartmentId) {
    try {
      // Retrieve the apartment document and handle existing reviewsArray
      const currentApartment = await reviews.findOne({ _id: new ObjectId(apartmentId) });

      // grabs current array of reviews
      const existingReviews = currentApartment.reviewsArray;
      // will hold new set of reviews after removing one
      const newReviews = new Array(existingReviews.length - 1);

      let removedReview;// holds the removed item in order to use its attributes
      let insertionIndex = 0;

      // will add all but removed review to the new array
      for (let traversalIndex = 0; traversalIndex < existingReviews.length; traversalIndex++) {
        if (traversalIndex != reviewId) {
          newReviews[insertionIndex] = existingReviews[traversalIndex];
          insertionIndex++;
        } else {
          removedReview = existingReviews[traversalIndex];
        }
      }

      // decrements total reviews by one
      const oldTotalReviews = currentApartment.totalReviews;
      const newTotalReviews = oldTotalReviews - 1;

      // removes the value of the price from the total price
      const oldAveragePrice = currentApartment.averagePrice;
      let newAveragePrice = 0;
      if (newTotalReviews == 0) {
        newAveragePrice = -1;
      } else {
        newAveragePrice = (oldAveragePrice * oldTotalReviews - removedReview.price) / (oldTotalReviews - 1);
      }

      // updates all necessary values
      const updateResponse = await reviews.findOneAndUpdate(
        { _id: new ObjectId(apartmentId) },
        { $set: { reviewsArray: newReviews, totalReviews: newTotalReviews, averagePrice: newAveragePrice } },
        { returnOriginal: false },
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReviewsByApartmentId(apartmentId) {
    try {
      const cursor = await reviews.findOne({ _id: new ObjectId(apartmentId) });

      // returns only the array of reviews stored inside of the currnet apartment object
      return cursor.reviewsArray;
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  // possibly done
  static async getAllApartments() {
    try {
      const cursor = await reviews.find({});
      return cursor.toArray();
    } catch (e) {
      console.error(`Unable to get review: ${e}`);

      return { error: e };
    }
  }

  static async addApartment(
    name,
    description,
    posterPath,
    reviewsArray,
    averagePrice,
    totalReviews,
    averageRating,
  ) {
    try {
      const reviewDoc = {
        name,
        description,
        posterPath,
        reviewsArray,
        averagePrice,
        totalReviews,
        averageRating,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async deleteApartment(reviewId, apartmentId) {
    try {
      const deleteResponse = await reviews.deleteOne({ _id: new ObjectId(reviewId) });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async deleteAllApartments() {
    try {
      const deleteResponse = await reviews.deleteMany({ });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getAveragePrice(apartmentId) {
    try {
      const cursor = await reviews.findOne({ _id: new ObjectId(apartmentId) });

      const { averagePrice } = cursor;
      // returns only the array of reviews stored inside of the currnet apartment object
      return averagePrice;
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewIndex, apartmentId, newReview, newUser) {
    try {
      // Retrieve the apartment document and handle existing reviewsArray
      const currentApartment = await reviews.findOne({ _id: new ObjectId(apartmentId) });
      // grabs current array of reviews
      const existingReviews = currentApartment.reviewsArray;

      const currentReview = existingReviews[Number(reviewIndex)];

      // cahnges neccessary values
      currentReview.user = newUser;
      currentReview.review = newReview;

      // updates array with new value
      existingReviews[Number(reviewIndex)] = currentReview;

      // replaces old array with edited one
      const updateResponse = await reviews.findOneAndUpdate(
        { _id: new ObjectId(apartmentId) },
        { $set: { reviewsArray: existingReviews } },
        { returnOriginal: false },
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewIndex, apartmentId) {
    try {
      const apartment = await reviews.findOne({ _id: new ObjectId(apartmentId) });
      const existingReviews = apartment.reviewsArray;
      const currentReview = existingReviews[Number(reviewIndex)];
      return currentReview;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
