const { ObjectId } = require('mongodb');
const Logger = require('../LogFiles/logger.js');

let db;

class apiDAO {
  static async injectDB(conn) { // gets a connection
    if (db) { // stops if already connected
      return;
    }
    try {
      db = await conn.db('reviews').collection('reviews');// gets the entire review databse then gets the collectcion of reviews
    } catch (e) {
      Logger.error(`Unable to establish collection handles in userDAO: ${e}`);
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
      const currentApartment = await db.findOne({ _id: new ObjectId(apartmentId) });
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
      const updateResponse = await db.findOneAndUpdate(
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
      Logger.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewIndex, apartmentId) {
    try {
      // Retrieve the apartment document and handle existing reviewsArray
      const currentApartment = await db.findOne({ _id: new ObjectId(apartmentId) });

      // grabs current array of reviews
      const existingReviews = currentApartment.reviewsArray;
      // will hold new set of reviews after removing one
      const newReviews = new Array(existingReviews.length - 1);

      let removedReview;// holds the removed item in order to use its attributes
      let insertionIndex = 0;

      // will add all but removed review to the new array
      for (let traversalIndex = 0; traversalIndex < existingReviews.length; traversalIndex++) {
        if (traversalIndex !== Number(reviewIndex)) {
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
      if (newTotalReviews === 0) {
        newAveragePrice = -1;
      } else {
        newAveragePrice = (
          (oldAveragePrice * oldTotalReviews - removedReview.price)
        / (oldTotalReviews - 1));
      }

      // updates all necessary values
      const updateResponse = await db.findOneAndUpdate(
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
      Logger.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReviewsByApartmentId(apartmentId) {
    try {
      const apartment = await db.findOne({ _id: new ObjectId(apartmentId) });

      // returns only the array of reviews stored inside of the currnet apartment object
      return apartment.reviewsArray;
    } catch (e) {
      Logger.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  static async getAllApartments() {
    try {
      const apartment = await db.find({});
      return apartment.toArray();
    } catch (e) {
      Logger.error(`Unable to get review: ${e}`);

      return { error: e };
    }
  }

  static async addApartment(
    name,
    description,
    reviewsArray,
    averagePrice,
    totalReviews,
  ) {
    try {
      const apartmentDoc = {
        name,
        description,
        reviewsArray,
        averagePrice,
        totalReviews,
      };
      return await db.insertOne(apartmentDoc);
    } catch (e) {
      Logger.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async deleteApartment(apartmentId) {
    try {
      const deleteResponse = await db.deleteOne({ _id: new ObjectId(apartmentId) });
      return deleteResponse;
    } catch (e) {
      Logger.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async deleteAllApartments() {
    try {
      const deleteResponse = await db.deleteMany({ });
      return deleteResponse;
    } catch (e) {
      Logger.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getAveragePrice(apartmentId) {
    try {
      const price = await db.findOne({ _id: new ObjectId(apartmentId) });

      const { averagePrice } = price;
      // returns only the array of reviews stored inside of the currnet apartment object
      return averagePrice;
    } catch (e) {
      Logger.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewIndex, apartmentId, newReview, newUser, newPrice) {
    try {
      // Retrieve the apartment document and handle existing reviewsArray
      const currentApartment = await db.findOne({ _id: new ObjectId(apartmentId) });
      // grabs current array of reviews
      const existingReviews = currentApartment.reviewsArray;

      const currentReview = existingReviews[Number(reviewIndex)];

      // removes old price form average and adds new price to average
      const { totalReviews } = currentApartment;

      let newAveragePrice = 0;
      if (totalReviews == 1) {
        newAveragePrice = newPrice;
      } else {
        const initialAveragePrice = currentApartment.averagePrice;
        const removeOneAveragePrice = (
          (initialAveragePrice * totalReviews - currentReview.price)
        / (totalReviews - 1));

        newAveragePrice = (
          removeOneAveragePrice + ((newPrice - removeOneAveragePrice)
        / totalReviews + 1)) - 1;
      }

      // cahnges neccessary values
      currentReview.user = newUser;
      currentReview.review = newReview;
      currentReview.price = newPrice;

      // updates array with new value
      existingReviews[Number(reviewIndex)] = currentReview;

      // replaces old array with edited one
      const updateResponse = await db.findOneAndUpdate(
        { _id: new ObjectId(apartmentId) },
        {
          $set: {
            reviewsArray: existingReviews,
            averagePrice: newAveragePrice,
          },
        },
        { returnOriginal: false },
      );

      return updateResponse;
    } catch (e) {
      Logger.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewIndex, apartmentId) {
    try {
      const apartment = await db.findOne({ _id: new ObjectId(apartmentId) });
      const existingReviews = apartment.reviewsArray;
      const currentReview = existingReviews[Number(reviewIndex)];
      return currentReview;
    } catch (e) {
      Logger.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}

module.exports = apiDAO;
