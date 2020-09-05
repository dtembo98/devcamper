const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const geocoder = require('../utils/geocoder');
const { Query } = require('mongoose');

//desc     Get all bootcamps
//@routes  GET /api/v1/bootcamps
//access   public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  console.log('he');
  return res.status(200).json(res.advancedResults);
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
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  bootcamp.remove();
  res.status(200).json({ suceess: true, data: {} });
});

//desc    Get  bootcamps within a radius
//@routes DELETE /api/v1/bootcamps/radius/:zipcode/:distance
//access   private
exports.getBootCampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  //get lat.lng fro geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calc radius using radians

  //divide distance by radius of the earth
  // Earth Radius = 3,963 mi / 6378.1 km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//desc    upload photo for bootcamp
//@routes PUT /api/v1/bootcamps/:id/photo
//access   private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`please upload a file`, 400));
  }
  const file = req.files.file;

  //make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`please upload  an image file`, 404));
  }
  //check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `please upload  an image less than ${process.env.MAX_FILE_UPLOAD}`,
        404
      )
    );
  }
  //create custom file name

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      return next(new ErrorResponse(`problem with file upload`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    return res.status(200).json({ success: true, data: file.name });
  });
});
