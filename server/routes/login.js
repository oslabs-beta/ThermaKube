const express = require('express');

const loginRouter = express.Router();

const UserController = require('../controllers/UserController');

loginRouter.post('/signup', UserController.addUser, (req, res) => {
  res.status(200).json(res.locals.signup);
});

loginRouter.post('/verify', UserController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = loginRouter;
