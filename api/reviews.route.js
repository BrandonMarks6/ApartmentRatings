import express from 'express'
import ReviewsCtrl from './reviews.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router()

//will return all apartments
router.route("").get(ReviewsCtrl.apiGetAllApartments)

//get all reviews for an apartment
router.route("/apartment/:id").get(ReviewsCtrl.apiGetReviews)

//post a new review
router.route("/new").post(ReviewsCtrl.apiPostReview)

//post a new apartment
router.route("/newApartment").post(ReviewsCtrl.apiPostApartment)

router.route("/reviews/:id")//each action to be done on a single review based on the id
//   .get(ReviewsCtrl.apiGetReview)
//   .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

//will delete a single apartment
router.route("/apartment/delete/:id").delete(ReviewsCtrl.apiDeleteApartment)

//will delete all apartments(used for testing)
router.route("/apartment/delete").delete(ReviewsCtrl.apiDeleteAllApartments)



export default router;