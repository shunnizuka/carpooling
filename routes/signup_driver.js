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

/* SQL Query */
var sql_query = 'INSERT INTO users VALUES';

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
	
	console.log("('" + username + "','" + phone + "','" + password + "')")
	// Construct Specific SQL Query
	var insert_query = sql_query + "('" + username + "','" + phone + "','" + password + "')";
	
	pool.query(insert_query, (err, data) => {
		res.redirect('/login');
	});
});

module.exports = router;
