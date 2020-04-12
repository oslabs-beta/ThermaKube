const db = require('../models/userModel');

const UserController = {};

// controller for adding new users to db

UserController.addUser = (req, res, next) => {
  console.log('rebody', req.body.signup);
  // req body will come with name, email, and password
  const { email, password } = req.body.signup;
  console.log('nep', email, password);
  // create add user query
  const addUser = {
    text: `
            INSERT INTO users
            (email, password)
            VALUES
            ($1, $2)
            RETURNING *
        `,
    values: [email, password],
  };
  db.query(addUser)
    .then((user) => {
      console.log('user', user);
      return next();
    })
    .catch((err) => {
      console.log('err in user controller', err);
    });
};

module.exports = UserController;
