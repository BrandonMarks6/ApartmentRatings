import express from 'express'
import ReviewsCtrl from './reviews.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router()

//colon in a route means its a variable for id meaning we can pass in different movie ids
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)//get is used when we want to get info
router.route("/new").post(ReviewsCtrl.apiPostReview)// new means adding a new; Post is used to send info
router.route("/:id")//this will be the review id; calls each depending on kind of request
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
router.route("").get(ReviewsController.apiGetAllReviews)

export default router;