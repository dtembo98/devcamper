//desc     Get all bootcamps
//@routes  GET /api/v1/bootcamps
//access   public
exports.getBootCamps = (req, res, next) => {
  res.status(200).json({ suceess: true, msg: 'show all bootcamps' });
};

//desc     Get single bootcamp
//@routes  GET /api/v1/bootcamps/:id
//access   public
exports.getBootCamp = (req, res, next) => {
  res.status(200).json({ suceess: true, msg: `get bootcamp ${req.params.id}` });
};

//desc     create new bootcamp
//@routes  POST /api/v1/bootcamps
//access   private
exports.createBootCamp = (req, res, next) => {
  res.status(200).json({ suceess: true, msg: 'create new  bootcamp' });
};

//desc    update bootcamp
//@routes  PUT /api/v1/bootcamps/:id
//access   private
exports.updateBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ suceess: true, msg: `update bootcamp ${req.params.id}` });
};

//desc    delete bootcamp
//@routes DELETE /api/v1/bootcamps/:id
//access   private
exports.deleteBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ suceess: true, msg: `delete bootcamp ${req.params.id}` });
};
