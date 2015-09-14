var mongoose = require('mongoose');

var GlanceSchema = new mongoose.Schema({
  app_id: String,
  session_id: String,
  name: String,
  date: Date,
  location: {
      city: String,
      country: String,
      latitude: Number,
      longitude: Number
  }
});

module.exports = mongoose.model('Glance', GlanceSchema);
