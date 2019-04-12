var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
 //--- V7: Using Dot Env ---
/*
 const pool = new Pool({
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
	//add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
        // query to display all available rides
        var done_rides_query = 'SELECT * FROM Rides R, Bids B WHERE B.bidderName = ' + "'" + username + "'" + 
        ' AND B.rideId = R.rideId AND ((rideDate <= CURRENT_DATE) OR (rideDate = CURRENT_DATE AND rideTime <= CURRENT_TIME));'

		pool.query(done_rides_query, (err, data) => {
            console.log(done_rides_query);
            res.render('filter_rides', { title: 'Completed Rides', data: data.rows });
            console.log(data);
        });
	} else {
		res.redirect('/login');
	}
});

// POST
router.post('/', function(req, res, next) {
	var rideid = req.body.rideid;
    var platenumber = req.body.platenumber;
    var score = req.session.score;
	console.log(rideid, platenumber, score);
  
    var retrieve_driverName_query = 'SELECT V.driverUserName FROM Vehicles V, Rides R WHERE R.rideId = ' + rideid + 
    ' AND R.ridePlateNumber = ' + "'" + platenumber + "'" + ' AND V.plateNumber = ' + "'" + platenumber + "';";

	if (rideid != undefined & platenumber != undefined & score != undefined) {

        pool.connect((err, client, release) => {

            //Query to get plate number
            client.query(retrieve_driverName_query, (err, result) => {
                release();

                var drivername = result.rows[0].driverUserName;
                console.log(drivername);
                
                // Query to insert
                var insert_query_ratings = 'INSERT INTO Ratings (rideId, userName, score) VALUES' 
                + "('" + rideid + "','" + drivername + "','" + score + "');";

                console.log(insert_query_ratings);
                client.query(insert_query_rides, (err, result) => {
                    if (err) {
                        console.log('error');
                        res.redirect('/rate_rides');
                    } else {
                        res.redirect('/rate_rides');
                    }
                });
            });
        })
    }
});

module.exports = router;
