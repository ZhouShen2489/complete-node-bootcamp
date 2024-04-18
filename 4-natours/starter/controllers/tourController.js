const Tour = require('../models/tourModel');

// Only for router.param in tourRoutes.js
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour ID: ${val}`);
//   if (val >= tours.length) {
//     return res.status(404).send({
//       status: 'fail',
//       message: 'Invalid ID!',
//     });
//   }
//   next();
// };

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).send({
    status: 'success',
    requestedAt: req.requestTime,
    // result: tours.length,
    // data: {
    //   tours
    // }
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).send({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    // 204: not content
    status: 'success',
    data: {
      tour: '<Updated Tour Here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    // 204: not content
    status: 'success',
    data: null,
  });
};
