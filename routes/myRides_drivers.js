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

// POST to delete ride
router.post('/', function(req, res, next) {
    
    //retrieve info from the page
    var rideId = req.body.rideid;

    //SQL query
	var sql_query = 'DELETE FROM rides WHERE rideId = ' + "'" + rideId + "';";
    console.log(sql_query);
    
    pool.query(sql_query, (err, data) => {
            //if(err) throw err
            if (err) {
                req.flash('error', err);
                // redirect to users list page
                res.redirect('/myRides_drivers');
            } else {
                req.flash('success', 'Ride deleted successfully! Ride Id = ' + rideId);
                // redirect to users list page
                res.redirect('/myRides_drivers');
            }
        })
   })

module.exports = router;
