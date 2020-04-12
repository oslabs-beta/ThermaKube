const db = require('../models/userModel');

const UserController = {};

// controller for adding new users to db
UserController.addUser = (req, res, next) => {
  // req body will come with email, and password
  const { newEmail, newPassword } = req.body.signup;
  // create add user query
  const addUser = {
    text: `
            INSERT INTO users
            (email, password)
            VALUES
            ($1, $2)
            RETURNING *
        `,
    values: [newEmail, newPassword],
  };
  db.query(addUser)
    .then((user) => {
      res.locals.signup = user.rows[0];
      return next();
    })
    .catch((err) => {
      console.log('err in user sign up controller', err);
    });
};

//controller to verify user login
UserController.verifyUser = (req, res, next) => {
  const { email, password } = req.body.login;
  const userQuery = {
    text: `
        SELECT * FROM users 
        WHERE email = $1
        AND password = $2
        `,
    values: [email, password],
  };
  db.query(userQuery)
    .then((user) => {
      if (user.rows[0]) {
        console.log('verified');
        res.locals.user = user.rows[0];
        return next();
      } else {
        console.log('unverified or user does not exist');
        res.locals.user = false;
        return next();
      }
    })
    .catch((err) => {
      console.log('error in verify user controller', err);
    });
};

module.exports = UserController;
