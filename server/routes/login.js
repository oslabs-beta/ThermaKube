const express = require('express');

const loginRouter = express.Router();

const UserController = require('../controllers/UserController');

loginRouter.post('/signup', UserController.addUser, (req, res) => {
  res.status(200).json({});
});

module.exports = loginRouter;
