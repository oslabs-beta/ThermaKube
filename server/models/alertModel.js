const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'alerts',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/*
document schema should have name, date, location
*/

const alertSchema = new Schema({
  name: String,
  namespace: String,
  status: String,
  podIP: String,
  time: String,
});

const Alert = mongoose.model('alert', alertSchema);

module.exports = { Alert };
