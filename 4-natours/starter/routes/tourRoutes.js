const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router(); // sub app

router.param('id', tourController.checkID); // check the id param in the route. if exist, check the ID

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
