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
	res.render('signup', { title: 'Signup' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var username = req.body.username;
	var userphone = req.body.phone;
	var userpassword = req.body.password;
	
	// Construct Specific SQL Query
	var insert_query = sql_query + "('" + username + "','" + userphone + "','" + userpassword + "')";
	
	pool.query(insert_query, (err, data) => {
        res.redirect('/select');
        console.log(insert_query);
	});
});

module.exports = router;
