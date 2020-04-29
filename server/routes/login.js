const express = require('express');

const loginRouter = express.Router();

const UserController = require('../controllers/UserController');
const CookieController = require('../controllers/CookieController');

loginRouter.post(
  '/signup',
  UserController.addUser,
  CookieController.setNewSSID,
  CookieController.setJwtToken,
  (req, res) => {
    res.status(200).json(res.locals.token);
  }
);

loginRouter.post(
  '/verify',
  UserController.verifyUser,
  CookieController.setSSID,
  CookieController.setJwtToken,
  (req, res) => {
    res.status(200).json(res.locals.token);
  }
);

module.exports = loginRouter;
