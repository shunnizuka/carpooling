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
		console.log(data);
    res.render('myRides_drivers', { title: 'Drivers Rides', data: data.rows });
	});
});

// DELETE USER
router.post('/', function(req, res) {
    var ride = req.body.rideid;
	
	var sql_query = 'DELETE FROM rides WHERE rideId = ' + "'" + ride + "';";
	pool.query(sql_query, (err, data) => {
		console.log(sql_query);
            //if(err) throw err
            if (err) {
                req.flash('error', err);
                // redirect to users list page
                res.redirect('/myRides_drivers');
            } else {
				console.log(data);
                req.flash('success', 'Ride deleted successfully! Ride Id = ' + req.body.rideid);
                // redirect to users list page
                res.redirect('/myRides_drivers');
            }
        })
   })

module.exports = router;
