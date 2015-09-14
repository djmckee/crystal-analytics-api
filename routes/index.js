var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // TODO: This ought to 301 redirect to a consumer facing page?
    //res.redirect('https://crystalanalytics.io?');
  res.render('index', { title: 'Express' });
});

module.exports = router;
