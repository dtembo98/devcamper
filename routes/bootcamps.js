const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults');
//include other resource routers
const courseRouter = require('./courses');

const {
  getBootCamp,
  getBootCamps,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');
//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootCampInRadius);
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootCamps)
  .post(createBootCamp);
router.route('/:id/photo').put(bootcampPhotoUpload);
router
  .route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = router;
