var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
	//add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
		res.render('navbar', { title: 'Carpooling' });
	} else {
		res.redirect('/login');
	}
});

router.post('/', function(req, res, next) {
    console.log("logging out");
    req.session.destroy();
    res.redirect('/home');
})

module.exports = router;
