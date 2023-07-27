import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {

  static async apiPostReview(req, res, next) {
      try {
        //grabs each variable from the body
        const apartmentId = req.body.apartmentId
        const review = req.body.review
        const user = req.body.user
        const price = req.body.price

        // Validate price using regular expression
        const numericRegex = /^\d+$/; // Only allows digits (0-9)
        if (!numericRegex.test(price)) {
          return res.status(400).json({ error: "Price must be a number" });
        }

        //call to the function
        const reviewResponse = await ReviewsDAO.addReview(
          apartmentId,
          user,
          review,
          price,
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
  }


  static async apiDeleteReview(req, res, next) {
    try {
      const apartmentId = req.body.apartmentId
      const reviewId = req.params.id

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, apartmentId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const apartmentId = req.body.apartmentId
      const reviewIndex = req.params.id
      const newReview = req.body.review
      const newUser = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(reviewIndex, apartmentId, newReview, newUser)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


  static async apiGetReviews(req, res, next) {
    try {
      let apartmentId = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByApartmentId(apartmentId)
      
      if (!reviews) {
        res.status(404).json({ error: "Not found" })//if there is no reviews
        return
      }
      res.json(reviews)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }


  static async apiGetAllApartments(req, res, next) {
    try {
      let review = await ReviewsDAO.getAllApartments()

      if (!review) {
        res.status(404).json({ error: "Not found" })//if there is no apartments
        return
      }
      res.json(review)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e.message })
    }
  }

  static async apiPostApartment(req, res, next){
    try {
      const name = req.body.name//title
      const description = req.body.description
      const posterPath = req.body.posterPath//used to store the picture
      const reviewsArray = []
      const averagePrice = -1//will start at -1 to indicate none have been added
      const totalReviews = 0
      const averageRating = -1//will start at -1 to indicate none have been added

      const addResponse = await ReviewsDAO.addApartment(
        name,
        description,
        posterPath,
        reviewsArray,
        averagePrice,
        totalReviews,
        averageRating,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }


  static async apiDeleteApartment(req, res, next) {
    try {
      const reviewId = req.params.id

      const reviewResponse = await ReviewsDAO.deleteApartment(reviewId)

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteAllApartments(req, res, next) {
    try {
      const reviewResponse = await ReviewsDAO.deleteAllApartments()

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetAveragePrice(req, res, next) {
    try {
      let apartmentId = req.params.id || {}
      let review = await ReviewsDAO.getAveragePrice(apartmentId)

      if (!review) {
        res.status(404).json({ error: "Not found" })//if there is no apartments
        return
      }
      res.json(review)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      const apartmentId = req.body.apartmentId
      const reviewId = req.params.id

      const reviewResponse = await ReviewsDAO.getReview(reviewId, apartmentId)
      
      if (!reviewResponse) {
        res.status(404).json({ error: "Not found" })//if there is no review
        return
      }
      res.json(reviewResponse)//if there is review
    } catch (e) {// will catch if request failed
      console.log(`api, ${e}`)
    }
  }


  



}