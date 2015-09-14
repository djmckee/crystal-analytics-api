var mongoose = require('mongoose');

var PurchaseSchema = new mongoose.Schema({
    app_id: String,
    session_id: String,
    label: String,
    value: Number,
    date: Date,
    location: {
        city: String,
        country: String,
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
