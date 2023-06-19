import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
        //grabs each variable from the body
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review
      const user = req.body.user
      console.log('movieid', movieId)// for debug
      //adds a review consisting of the vars
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      res.json({ status: "success" })
    } catch (e) {//catches if request fails
      res.status(500).json({ error: e.message })
    }
  }

  

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id//gets this from params
      //gets vars from body
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {// if nothing is changeed
        throw new Error(
          "unable to update review",//creates new error
        )
      }

      res.json({ status: "success" })// if no errors
    } catch (e) {// catches error
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id//get param
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {}//gets the movie id
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)
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

  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {} // gets the parameters besed on what is passed into the url in request
      let review = await ReviewsDAO.getReview(id) // gets the review based on the id
      if (!review) {
        res.status(404).json({ error: "Not found" })//if there is no review
        return
      }
      res.json(review)//if there is review
    } catch (e) {// will catch if request failed
      console.log(`api, ${e}`)
      res.status(500).json({ error: "Bot" })
    }
  }

  static async apiGetAllReviews(req, res, next) {
    try {
      let id = req.params.id || {} // gets the parameters besed on what is passed into the url in request
      let review = await ReviewsDAO.getAllReviews()
      if (!review) {
        res.status(404).json({ error: "Not found" })//if there is no review
        return
      }
      res.json(review)//if there is review
    } catch (e) {// will catch if request failed
      console.log(`api, ${e}`)
      res.status(500).json({ error: "Bot" })
    }
  }
}