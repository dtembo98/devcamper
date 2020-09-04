const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'please add a course'],
  },
  description: {
    type: String,
    required: [true, 'please add a description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add numbers of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'please add a tution cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

//static method to get avarage of course tutions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log('calculating avg cost...'.blue);
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.log(error);
  }
};
//Call getAverageCost after save

CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp);
});
// call getAverageCost before remove
CourseSchema.pre('remove ', function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
