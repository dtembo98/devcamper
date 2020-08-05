const dotenv = require('dotenv');
const express = require('express');
const PORT = process.env.PORT || 5000;
//Routes files
const bootcamps = require('./routes/bootcamps');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
//Mount routers

app.use('/api/v1/bootcamps', bootcamps);

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
