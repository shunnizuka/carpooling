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
	res.render('create_bid', { title: 'Update Bids Table' });
});

// POST
router.post('/', function (req, res, next) {

	// Retrieve Information
	var username = req.body.username;
	var rideID = req.body.rideID;
	var price = req.body.price;

	// Construct Specific SQL Query
	var create_bid_passenger = 'INSERT INTO bids VALUES' + "('" + username + "','" + rideID + "','" + price + "')";

	(async () => {
	
		const client = await pool.connect()
		//transaction to add bid 
		try {
			await client.query('BEGIN');
			const { rows } = await client.query(create_bid_passenger);
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
