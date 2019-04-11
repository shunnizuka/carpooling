var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator/check');

const { Pool } = require('pg')
/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '********',
  port: 5432,
})*/

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

router.get('/', function (req, res, next) {

	username = req.session.username;
	if (username != undefined) {
		res.redirect('/filter_rides');
	} else {
		res.render('login', { title: 'Carpooling' });
	}
});

router.post('/', [
	check('username').isLength({ min: 1 }).withMessage('Please input username'),
	check('password').isLength({ min: 1 }).withMessage('Please input a password')],
	function (req, res, next) {

		var session = req.session;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			req.flash('info', errors.array);
			console.log("error");
			res.redirect('/login');
		} else {
			var username = req.body.username;
			var password = req.body.password;
			console.log(username, password);

			var user_query = 'SELECT * FROM users WHERE username=' + "'" + username + "';";
			pool.query(user_query, function (err, result) {
				console.log(user_query)
				if (result.rows[0] == undefined) {
					console.log("undefined");
					var message = { msg: 'invalid Login' };
					req.flash('info', message);
					res.redirect('/login');
				} else {
					if (result.rows[0].userpassword === password) {
						console.log('login success');
						req.session.username = username;
						res.redirect('/filter_rides');
					} else {

						console.log('invalid login' + result.rows[0].password);
						res.redirect('/login');
					}
				}
			});
		}

	});

module.exports = router;
