const express = require('express');
const apiCtrl = require('./api.controller.js');

const router = express.Router();

// post a new review
router.route('/new').post(apiCtrl.apiPostReview);

router.route('/single/:reviewIndex')// each action to be done on a single review based on the id
  .get(apiCtrl.apiGetReview)
  .put(apiCtrl.apiUpdateReview)
  .delete(apiCtrl.apiDeleteReview);

module.exports = router;
