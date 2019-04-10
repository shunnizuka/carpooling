var express = require('express');
var router = express.Router();

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


// GET
router.get('/', function(req, res, next) {
	res.render('signup_driver', { title: 'signup_driver' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var username  = req.body.username;
	var phone    = req.body.phone;
	var password = req.body.password;
	
	// Construct Specific SQL Query
	var insert_query_users = 'INSERT INTO users VALUES' + "('" + username + "','" + phone + "','" + password + "')";
	var insert_query_drivers = 'INSERT INTO drivers VALUES' + "('" + username + "')";

	pool.query(insert_query, (err, data) => {
		res.redirect('/login');
	});
});

module.exports = router;
