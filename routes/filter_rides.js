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

// query to display all available rides
var all_rides_query = 'SELECT * FROM ((Rides R JOIN Vehicles V on R.ridePlateNumber = V.plateNumber) JOIN Drivers D on V.driverUserName = D.userName) WHERE ((rideDate > CURRENT_DATE) OR (rideDate = CURRENT_DATE AND rideTime > CURRENT_TIME)) ORDER BY rideCurrentPrice DESC;'

// GET
router.get('/', function (req, res, next) {
	//add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
		pool.query(all_rides_query, (err, data) => {
      console.log(all_rides_query);
      res.render('filter_rides', { title: 'All Rides', data: data.rows });
    });
	} else {
		res.redirect('/login');
	}
});

// POST
router.post('/', function(req, res, next) {
	var origin = req.body.origin;
  var destination = req.body.destination;
  var biddername = req.session.username;
  var rideid = req.body.rideId;
  var price = req.body.price;

	console.log(origin, destination);
  
	if (origin != undefined & destination != undefined) {
	  // Construct specific SQL Query
    var filter_query_rides = 'SELECT * FROM ((Rides R JOIN Vehicles V on R.ridePlateNumber = V.plateNumber) JOIN Drivers D on V.driverUserName = D.userName) WHERE R.rideOrigin = ' + "'" + origin + "'" + ' AND R.rideDestination = '  
    + "'" + destination + "'" + ' AND ((rideDate > CURRENT_DATE) OR (rideDate = CURRENT_DATE AND rideTime > CURRENT_TIME)) ORDER BY R.rideCurrentPrice DESC;';
    console.log(filter_query_rides);
    
    pool.query(filter_query_rides, (err, data) => {
		  res.render('filter_rides', { title: 'Available Rides', data: data.rows });
		  console.log(data);
	  });
  } else {
    // Construct specific SQL Query
    var insert_query_bids = 'INSERT INTO bids VALUES' + "('" + biddername + "','" + rideid + "','" + price + "')";
    console.log(insert_query_bids);

    pool.query(insert_query_bids, (err, data) => {
      if (err) {
        console.log("error");
        res.redirect('/filter_rides');
      } else {
        res.redirect('/filter_rides');
        console.log("success");
      }
    });
  }
});

module.exports = router;
