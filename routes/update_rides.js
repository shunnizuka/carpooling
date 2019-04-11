var express = require('express');
var router = express.Router();

const { Pool } = require('pg')


const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

router.get('/', function(req, res, next) {
	
	var username = 'Rohan';
	
	/* SQL Query */
	var sql_query = 'SELECT * FROM rides R WHERE EXISTS( SELECT * FROM vehicles V WHERE ' + "'" + username + "'" + ' = V.driverUserName AND V.plateNumber = R.ridePlateNumber);';
	console.log(sql_query);
	pool.query(sql_query, (err, data) => {

    res.render('myRides_drivers', { title: 'Drivers Rides', data: data.rows });
	});
});

// POST
router.post('/', function (req, res, next) {

	// Retrieve Information
    var rideid = req.body.rideid;
    console.log(rideid);
    var newdate = req.body.newdate;
    console.log(newdate);
    var newtime = req.body.newtime;
    console.log(newtime);

	// Construct Specific SQL Query
	var update_ride = 'UPDATE rides SET rideDate = ' + "('" + newdate + "'), rideTime = " + "('" + newtime + "') WHERE rideId = '" + rideid + "';";

	(async () => {
	
		const client = await pool.connect()
		//transaction to EDIT bids
		try {
			await client.query('BEGIN');
			const { rows } = await client.query(update_ride);
			await client.query('COMMIT');
			res.redirect('/bids');
		} catch (e) {
			await client.query('ROLLBACK')
			throw e
		} finally {
			client.release()
		}
	})().catch(e => console.error(e.stack))

});

module.exports = router;
