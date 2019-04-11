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
var all_rides_query = 'SELECT * FROM rides R INNER JOIN bids B ON R.rideid = B.rideid ORDER BY B.price DESC;'

// GET
router.get('/', function (req, res, next) {
	//add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
		pool.query(all_rides_query, (err, data) => {
      res.render('filter_rides', { title: 'All Rides', data: data.rows });
      //console.log(data);
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
  var rideid = req.body.rideid;
  var price = req.body.price;

	console.log(origin, destination);
  
	if (origin != undefined & destination != undefined) {
	  // Construct Specific SQL Query
	  var filter_query_rides = 'SELECT * FROM rides R INNER JOIN bids B ON R.rideId = B.rideId WHERE R.rideOrigin = ' 
		+ "'" + origin + "'" + ' AND R.rideDestination = '  + "'" + destination + "'" + ' ORDER BY  B.price DESC;';
    console.log(filter_query_rides);
    
    pool.query(filter_query_rides, (err, data) => {
		res.render('filter_rides', { title: 'Available Rides', data: data.rows });
		console.log(data);
	  });
  } else {
	  res.render('filter_rides', { title: 'Carpooling' });
	}
});

module.exports = router;
