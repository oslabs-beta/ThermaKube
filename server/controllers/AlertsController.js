const db = require('../models/userModel');

const AlertsController = {};

AlertsController.getAlerts = (req, res, next) => {
  const userId = res.locals.userId;
  console.log('userId', userId);
  const alertsQuery = {
    text: `
            SELECT * FROM alerts
            WHERE user_id = ${userId}
        `,
  };
  db.query(alertsQuery)
    .then((alerts) => {
      if (alerts.rows[0]) {
        console.log('alerts exist');
        const data = alerts.rows;
        // console.log('data', data);
        const alertArray = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            name: data[i].pod_name,
            namespace: data[i].namespace,
            status: data[i].status,
            podIP: data[i].pod_ip,
            time: data[i].timestamp,
          };
          alertArray.push(obj);
        }

        res.locals.alerts = alertArray;
        // console.log('locals', res.locals.alerts);
        return next();
      } else {
        console.log('no alerts');
        res.locals.alerts = false;
        return next();
      }
    })
    .catch((err) => {
      console.log('err in get alerts middleware', err);
    });
};

AlertsController.addAlerts = (req, res, next) => {
  console.log('in add alerts');
  console.log('req.body', req.body);
  const alertInfo = {
    name: req.body.name,
    namespace: req.body.namespace,
    status: req.body.status,
    podIP: req.body.podIP,
    time: req.body.time,
  };
  const { name, namespace, status, podIP, time } = alertInfo;
  const userId = res.locals.userId;
  console.log('userId', userId);
  const addAlerts = {
    text: `
           INSERT INTO alerts
           (user_id, pod_name, namespace, status, pod_ip, timestamp)
           VALUES
           ($1, $2, $3, $4, $5, $6)
           RETURNING *
        `,
    values: [userId, name, namespace, status, podIP, time],
  };
  db.query(addAlerts)
    .then((alert) => {
      res.locals.alert = alert.rows[0];
      return next();
    })
    .catch((err) => {
      console.log('err in add alert controller', err);
    });
};

module.exports = AlertsController;
