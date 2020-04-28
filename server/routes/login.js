const express = require('express');

const loginRouter = express.Router();

const UserController = require('../controllers/UserController');
const cookieController = require('../controllers/cookieController');

loginRouter.post(
  '/signup',
  UserController.addUser,
  cookieController.setNewSSID,
  cookieController.setJwtToken,
  (req, res) => {
    res.status(200).json(res.locals.token);
  }
);

loginRouter.post(
  '/verify',
  UserController.verifyUser,
  cookieController.setSSID,
  cookieController.setJwtToken,
  (req, res) => {
    res.status(200).json(res.locals.token);
  }
);

module.exports = loginRouter;
