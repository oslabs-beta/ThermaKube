const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// require routers
const awsRouter = require('./routes/aws');
const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist/')));

// route handlers
app.use('/aws', awsRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);

// serve html
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
});
// catch all
app.use('/', (req, res) => {
  res.sendStatus(404);
});
// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}...`);
});
