/* eslint-disable import/extensions */
const express = require('express');
const apiCtrl = require('./api.controller.js');

const router = express.Router();

// will delete a single apartment
router.route('/delete/:apartmentId').delete(apiCtrl.apiDeleteApartment);

// will delete all apartments(used for testing)
router.route('/clear').delete(apiCtrl.apiDeleteAllApartments);

// will get the current average price for an apartment
router.route('/average-price/:apartmentId').get(apiCtrl.apiGetAveragePrice);

// post a new apartment

router.route('/new').post(apiCtrl.apiPostApartment);

// will return all apartments
router.route('/').get(apiCtrl.apiGetAllApartments);

// get all reviews for an apartment
router.route('/allReviews/:apartmentId').get(apiCtrl.apiGetReviews);

module.exports = router;
