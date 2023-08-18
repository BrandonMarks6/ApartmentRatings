const apiDAO = require('../dao/api.DAO.js');
const Logger = require('../LogFiles/logger.js');

class apiController {
  static async apiPostReview(req, res) {
    try {
      // grabs each variable from the body
      const {
        apartmentId, review, user, price,
      } = req.body;

      // Validate price using regular expression
      const numericRegex = /^\d+$/; // Only allows digits (0-9)
      if (!numericRegex.test(price)) {
        return res.status(400).json({ error: 'Price must be a number' });
      }

      // call to the function
      const postResponse = await apiDAO.addReview(
        apartmentId,
        user,
        review,
        price,
      );
      if ('error' in postResponse) { // Check if the deleteResponse has an 'error' property
        return res.status(500).json({ error: 'Error posting review' });
      }
      return res.status(201).json({ message: 'Review successfully posted', apartmentId: postResponse.value._id });
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error posting review' });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const apartmentId = req.get('X-ApartmentId');
      const { reviewIndex } = req.params;

      const deleteResponse = await apiDAO.deleteReview(reviewIndex, apartmentId);

      const deleteCount = deleteResponse.deletedCount;
      if (deleteCount < 1 || 'error' in deleteResponse) {
        return res.status(500).json({ error: 'Error deleting review' });
      }

      return res.status(200).json({ message: 'Review successfully deleted' });
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error deleting review' });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const { apartmentId } = req.body;
      const reviewIndex = Number(req.params.reviewIndex);
      const newReview = req.body.review;
      const newUser = req.body.user;
      const newPrice = req.body.price;

      const updateResponse = await apiDAO.updateReview(
        reviewIndex,
        apartmentId,
        newReview,
        newUser,
        newPrice,
      );

      if ('error' in updateResponse) { // Check if the deleteResponse has an 'error' property
        return res.status(500).json({ error: 'Error updating review' });
      }
      return res.status(201).json({ message: 'Review successfully updated' });
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error updating review' });
    }
  }

  static async apiGetReviews(req, res) {
    try {
      const { apartmentId } = req.params;
      const reviews = await apiDAO.getReviewsByApartmentId(apartmentId);

      if (!reviews) {
        return res.status(404).json({ error: 'Review not found' });// if there is no reviews
      }
      return res.status(200).json(reviews);
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error finding review' });
    }
  }

  static async apiGetAllApartments(req, res) {
    try {
      const apartments = await apiDAO.getAllApartments();

      if (!apartments) {
        return res.status(404).json({ error: 'Apartments Not found' });// if there is no apartments
      }
      return res.status(200).json(apartments);
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error finding Apartments' });
    }
  }

  static async apiPostApartment(req, res) {
    try {
      const { name } = req.body;// title
      const { description } = req.body;
      const reviewsArray = [];
      const averagePrice = -1;// will start at -1 to indicate none have been added
      const totalReviews = 0;

      const postResponse = await apiDAO.addApartment(
        name,
        description,
        reviewsArray,
        averagePrice,
        totalReviews,
      );
      if ('error' in postResponse) { // Check if the deleteResponse has an 'error' property
        return res.status(500).json({ error: 'Error posting apartment' });
      }
      const newApartmentId = postResponse.insertedId.toString();
      return res.status(201).json({ message: 'Apartment successfully posted', apartmentId: newApartmentId });
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error posting apartment' });
    }
  }

  static async apiDeleteApartment(req, res) {
    try {
      const { apartmentId } = req.params;

      const deleteResponse = await apiDAO.deleteApartment(apartmentId);

      const deleteCount = deleteResponse.deletedCount;
      if (deleteCount < 1 || 'error' in deleteResponse) {
        return res.status(500).json({ error: 'Error deleting apartment' });
      }
      return res.status(200).json({ message: 'Apartment successfully deleted' });
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error deleting apartment' });
    }
  }

  static async apiDeleteAllApartments(req, res) {
    try {
      const clearResponse = await apiDAO.deleteAllApartments();

      const deleteCount = clearResponse.deletedCount;
      if (deleteCount < 1 || 'error' in clearResponse) {
        return res.status(500).json({ error: 'Error clearing apartments' });
      }
      return res.status(200).json({ message: 'Apartments successfully cleared' });
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error clearing apartments' });
    }
  }

  static async apiGetAveragePrice(req, res) {
    try {
      const apartmentId = req.params.apartmentId || {};
      const price = await apiDAO.getAveragePrice(apartmentId);

      if (!price) {
        return res.status(404).json({ error: 'Not found' });// if there is no apartments
      }
      if (price) {
        return res.status(201).json(price);
      }
      return res.status(500).json({ error: 'Error getting price' });
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error getting price' });
    }
  }

  static async apiGetReview(req, res) {
    try {
      const apartmentId = req.get('X-ApartmentId');
      const { reviewIndex } = req.params;

      const fetchResponse = await apiDAO.getReview(reviewIndex, apartmentId);

      if (!fetchResponse) {
        return res.status(404).json({ error: 'Review not found' });// if there is no review
      }

      if ('error' in fetchResponse) { // Check if the deleteResponse has an 'error' property
        return res.status(500).json({ error: 'Error getting review' });
      }
      return res.status(200).json(fetchResponse);
    } catch (e) {
      Logger.error(e);
      return res.status(500).json({ error: 'Error getting review' });
    }
  }
}

module.exports = apiController;
