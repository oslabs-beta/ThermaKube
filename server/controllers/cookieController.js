const db = require('../models/userModel');
const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setNewSSID = (req, res, next) => {
  const { newEmail } = req.body.signup;
  // store user id in a cookie
  const findUser = {
    text: `
            SELECT id FROM users
            WHERE email = $1
        `,
    values: [newEmail],
  };
  db.query(findUser)
    .then((id) => {
      console.log(id.rows[0]);
      res.locals.userId = id.rows[0].id;
      return next();
    })
    .catch((err) => {
      console.log('err in cookie middleware', err);
    });
};

cookieController.setSSID = (req, res, next) => {
  const { email } = req.body.login;
  // store user id in a cookie
  const findUser = {
    text: `
              SELECT id FROM users
              WHERE email = $1
          `,
    values: [email],
  };
  db.query(findUser)
    .then((id) => {
      console.log(id.rows[0]);
      res.locals.userId = id.rows[0].id;
      return next();
    })
    .catch((err) => {
      console.log('err in cookie middleware', err);
    });
};

cookieController.setJwtToken = (req, res, next) => {
  try {
    // create jwt
    const payload = { userId: res.locals.userId };
    // add jwt as cookie
    const token = jwt.sign(payload, process.env.JWTSECRET);
    console.log('token', token);
    res.locals.token = token;
    res.cookie('jwt_token', token, { httpOnly: true });
    return next();
  } catch (err) {
    console.log('err in jwt token middleware', err);
  }
};

cookieController.verifyToken = (req, res, next) => {};

module.exports = cookieController;
