const { Alert } = require('../models/alertModel');
const AlertController = {};

AlertController.getAlerts = (req, res, next) => {
  // console.log('in get Alerts');
  Alert.find({})
    .exec()
    .then(results => {
      res.locals.alerts = results;
      // console.log('results here', results)
      return next();
    })
    .catch(err => {
      return next({
        log: 'Middleware error: getAlerts',
        message: { err: 'error occurred' },
      });
    });
};

AlertController.addAlerts = (req, res, next) => {
  console.log('in add Alert');
  console.log('req.body', req.body);
  const alertInfo = {
    name: req.body.name,
    namespace: req.body.namespace,
    status: req.body.status,
    podIP: req.body.podIP,
    time: req.body.time,
  };
  console.log('alertInfo', alertInfo);
  //check for duplicates - still getting some duplicates since the time is logging by second.
  Alert.findOneAndUpdate(
    alertInfo,
    alertInfo,
    { upsert: true },
    (err, result) => {
      if (err) return err;
      res.locals.newAlert = result;
      console.log('alert success');
      return next();
    }
  );
  // Alert.create(alertInfo, (err, result) => {
  //   if (err) return err;
  //   res.locals.newAlert = result;
  //   console.log('alert success');
  //   return next();
  // });
};

module.exports = AlertController;
