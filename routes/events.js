var express = require('express');
var router = express.Router();
var geoip = require('geoip-lite');

var mongoose = require('mongoose');
var Session = require('../models/Session.js');
var Event = require('../models/Event.js');
var Glance = require('../models/Glance.js');
var Purchase = require('../models/Purchase.js');
var Screen = require('../models/Screen.js');

function geocodeRequestIp(req) {
    // following line shamelessly stolen from https://stackoverflow.com/questions/8107856/how-can-i-get-the-users-ip-address-using-node-js
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    console.log('ip: ' + String(ip));

    // Forwarded for header can contain multiple IPs, comma seperated
    // (as per https://en.wikipedia.org/wiki/X-Forwarded-For)
    if (ip.indexOf(",") > -1) {
        // ip contains a comma!
        // if ip contains a comma, take it apart based on the commas...
        var seperatedString = ip.split(',');

        // the client's IP is always the FIRST value in a comma seperated list...
        ip = seperatedString[0];
        //console.log('seperated ip: ' + String(ip));

    }

    if (ip) {
        // if we have an IP, go ahead and geocode...
        var geo = geoip.lookup(ip);

        // if we have a result, parse and return
        if (geo) {
            var location = {
                    city: geo.city,
                    country: geo.country,
                    latitude: geo.ll[0],
                    longitude: geo.ll[1]
                };

            return location;

        } else return null;

    } else return null;

}

/* POST /session */
router.post('/session', function(req, res, next) {
    console.log("POST /session");
    console.log(req.body);

    var session = new Session();
    session.app_id = req.body.app_id;
    session.session_id = req.body.session_id;
    session.date = req.body.date;

    // TODO: see how efficient geocodeRequestIp() is under load - we may need to
    // run in async or it could slow down the entire server :o
    session.location  = geocodeRequestIp(req);
    console.log('location: ' + String(session.location));

    // QUICK HACK!
    res.status(200).send('Okay' + String(session));

    session.save(function (err) {
        if (err) {
            //res.status(500).send('Error tracking event.');
        } else {
            // saved!
            //res.status(200).send('Okay');
        }

    });
});

module.exports = router;
