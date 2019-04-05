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
	res.render('signup_passenger', { title: 'Modifying Database' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var username  = req.body.username;
	var phone    = req.body.phone;
	var password = req.body.password;
	
	console.log("('" + username + "','" + phone + "','" + password + "')")
	// Construct Specific SQL Query
	var insert_query_users = sql_query + "('" + username + "','" + phone + "','" + password + "')";
	//TODO: insert into passenger
	//var insert_query_passengers = sql_query + "(" + 
	pool.query(insert_query_users, (err, data) => {
		console.log(insert_query_users);
		res.redirect('/login');
	});


});

module.exports = router;
