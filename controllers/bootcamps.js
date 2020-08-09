const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

//desc     Get all bootcamps
//@routes  GET /api/v1/bootcamps
//access   public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res
    .status(200)
    .json({ suceess: true, count: bootcamps.length, data: bootcamps });
});

//desc     Get single bootcamp
//@routes  GET /api/v1/bootcamps/:id
//access   public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ suceess: true, data: bootcamp });
});

//desc     create new bootcamp
//@routes  POST /api/v1/bootcamps
//access   private
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ suceess: true, data: bootcamp });
});

//desc    update bootcamp
//@routes  PUT /api/v1/bootcamps/:id
//access   private
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ suceess: true, data: bootcamp });
});

//desc    delete bootcamp
//@routes DELETE /api/v1/bootcamps/:id
//access   private
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ suceess: true, data: {} });
});
