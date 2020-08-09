const bootcamp = require('../models/Bootcamp');
const Bootcamp = require('../models/Bootcamp');

//desc     Get all bootcamps
//@routes  GET /api/v1/bootcamps
//access   public
exports.getBootCamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ suceess: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//desc     Get single bootcamp
//@routes  GET /api/v1/bootcamps/:id
//access   public
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ suceess: false });
    }
    res.status(200).json({ suceess: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//desc     create new bootcamp
//@routes  POST /api/v1/bootcamps
//access   private
exports.createBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ suceess: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ suceess: false });
  }
};

//desc    update bootcamp
//@routes  PUT /api/v1/bootcamps/:id
//access   private
exports.updateBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({ suceess: false });
    }
    res.status(200).json({ suceess: true, data: bootcamp });
  } catch (error) {
    res.status.json({ suceess: false });
  }
};

//desc    delete bootcamp
//@routes DELETE /api/v1/bootcamps/:id
//access   private
exports.deleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ suceess: false });
    }
    res.status(200).json({ suceess: true, data: {} });
  } catch (error) {
    res.status(400).json({ suceess: false });
  }
};
