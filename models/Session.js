var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
    session_id: String,
    app_id: String,
    date: Date,
    location: {
        city: String,
        country: String,
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('Session', SessionSchema);
