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
	var platenumber = req.body.platenumber;
	var carbrand = req.body.carbrand;
	var carcolor = req.body.carcolor;
	var carmodel = req.body.carmodel;
	var cartype = req.body.cartype;
	
	// Construct Specific SQL Query
	var insert_query_users = 'INSERT INTO users VALUES' + "('" + username + "','" + phone + "','" + password + "')";
	var insert_query_drivers = 'INSERT INTO drivers VALUES' + "('" + username + "')";
	var insert_query_vehicles = 'INSERT INTO vehicles VALUES' + "('" + platenumber + "','" + username + "','" 
	+ cartype + "','" + carbrand + "','" + carmodel + "','" + carmodel + "')";

	console.log(insert_query_drivers);
	console.log(insert_query_users);
	console.log(insert_query_vehicles);
	(async () => {
	
		const client = await pool.connect()
		//transaction to add users and passenger
		try {
			await client.query('BEGIN');
			const { rows } = await client.query(insert_query_users);
			await client.query(insert_query_drivers);
			await client.query(insert_query_vehicles);
			await client.query('COMMIT');
			res.redirect('/login');
		} catch (e) {
			await client.query('ROLLBACK')
			throw e
		} finally {
			client.release()
		}
	})().catch(e => console.error(e.stack))
});

module.exports = router;
