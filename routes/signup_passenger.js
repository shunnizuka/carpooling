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
router.get('/', function (req, res, next) {
	res.render('signup_passenger', { title: 'Modifying Database' });
});

// POST
router.post('/', function (req, res, next) {

	// Retrieve Information
	var username = req.body.username;
	var phone = req.body.phone;
	var password = req.body.password;

	console.log("('" + username + "','" + phone + "','" + password + "')")
	// Construct Specific SQL Query
	var insert_query_users = 'INSERT INTO users VALUES' + "('" + username + "','" + phone + "','" + password + "')";
	var insert_query_passengers = 'INSERT INTO passengers VALUES' + "('" + username + "')";

	(async () => {
		// note: we don't try/catch this because if connecting throws an exception
		// we don't need to dispose of the client (it will be undefined)
		const client = await pool.connect()

		try {
			await client.query('BEGIN');
			const { rows } = await client.query(insert_query_users);
			await client.query(insert_query_passengers);
			await client.query('COMMIT');
		} catch (e) {
			await client.query('ROLLBACK')
			throw e
		} finally {
			client.release()
		}
	})().catch(e => console.error(e.stack))

});

module.exports = router;
