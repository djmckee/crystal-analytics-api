var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  app_id: String,
  session_id: String,
  label: String,
  date: Date,
  location: {
      city: String,
      country: String,
      latitude: Number,
      longitude: Number
  }
});

module.exports = mongoose.model('Event', EventSchema);
