var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('navbar', { title: 'Carpooling' });
});

module.exports = router;
