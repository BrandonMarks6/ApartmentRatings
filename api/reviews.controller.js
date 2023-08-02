import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
  static async apiPostReview(req, res) {
    try {
      // grabs each variable from the body
      const { apartmentId } = req.body;
      const { review } = req.body;
      const { user } = req.body;
      const { price } = req.body;

      // Validate price using regular expression
      const numericRegex = /^\d+$/; // Only allows digits (0-9)
      if (!numericRegex.test(price)) {
        return res.status(400).json({ error: 'Price must be a number' });
      }

      // call to the function
      const reviewResponse = await ReviewsDAO.addReview(
        apartmentId,
        user,
        review,
        price,
      );
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const { apartmentId } = req.body;
      const reviewId = req.params.id;

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, apartmentId);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const { apartmentId } = req.body;
      const reviewIndex = req.params.id;
      const newReview = req.body.review;
      const newUser = req.body.user;

      const reviewResponse = await ReviewsDAO.updateReview(reviewIndex, apartmentId, newReview, newUser);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res) {
    try {
      const apartmentId = req.params.id || {};
      const reviews = await ReviewsDAO.getReviewsByApartmentId(apartmentId);

      if (!reviews) {
        res.status(404).json({ error: 'Not found' });// if there is no reviews
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetAllApartments(req, res) {
    try {
      const review = await ReviewsDAO.getAllApartments();

      if (!review) {
        res.status(404).json({ error: 'Not found' });// if there is no apartments
        return;
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPostApartment(req, res) {
    try {
      const { name } = req.body;// title
      const { description } = req.body;
      const { posterPath } = req.body;// used to store the picture
      const reviewsArray = [];
      const averagePrice = -1;// will start at -1 to indicate none have been added
      const totalReviews = 0;
      const averageRating = -1;// will start at -1 to indicate none have been added

      const addResponse = await ReviewsDAO.addApartment(
        name,
        description,
        posterPath,
        reviewsArray,
        averagePrice,
        totalReviews,
        averageRating,
      );
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteApartment(req, res) {
    try {
      const reviewId = req.params.id;

      const reviewResponse = await ReviewsDAO.deleteApartment(reviewId);

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteAllApartments(req, res) {
    try {
      const reviewResponse = await ReviewsDAO.deleteAllApartments();

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetAveragePrice(req, res) {
    try {
      const apartmentId = req.params.id || {};
      const review = await ReviewsDAO.getAveragePrice(apartmentId);

      if (!review) {
        res.status(404).json({ error: 'Not found' });// if there is no apartments
        return;
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReview(req, res) {
    try {
      const { apartmentId } = req.body;
      const reviewId = req.params.id;

      const reviewResponse = await ReviewsDAO.getReview(reviewId, apartmentId);

      if (!reviewResponse) {
        res.status(404).json({ error: 'Not found' });// if there is no review
        return;
      }
      res.json(reviewResponse);// if there is review
    } catch (e) { // will catch if request failed
      console.log(`api, ${e}`);
    }
  }
}
