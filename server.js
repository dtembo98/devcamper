const dotenv = require('dotenv');
const express = require('express');
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const connectDb = require('./config/db');
//Routes files
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
const errHandler = require('./middlewares/error');
const errorHandler = require('./middlewares/error');
const courses = require('./routes/courses');
//Load env vars

dotenv.config({ path: './config/config.env' });
//Connect to database
connectDb();
const app = express();
//body parser
app.use(express.json());
//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routers

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  );
});
//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server & exit
  server.close(() => process.exit(1));
});
