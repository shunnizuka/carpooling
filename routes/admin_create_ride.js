var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// query to display all available rides
var all_rides_query = 'SELECT * FROM rides R NATURAL JOIN drivers D WHERE EXISTS( SELECT * FROM vehicles V WHERE R.ridePlateNumber = V.plateNumber AND V.driverUserName = D.userName) ORDER BY R.rideCurrentPrice DESC;'


// GET
router.get('/', function (req, res, next) {
    //add this to the pages that need to be logged in to access
    username = req.session.username;
    if (username != undefined) {
        pool.query(all_rides_query, (err, data) => {
            console.log(all_rides_query);
            res.render('admin_allRides', { title: 'All Rides', data: data.rows });
            console.log(data);
        });
    } else {
        res.redirect('/login');
    }
});

// POST
router.post('/', function (req, res, next) {

    // Retrieve Information
    var origin = req.body.origin;
    var destination = req.body.destination;
    var date = req.body.date;
    var time = req.body.time;
    var price = req.body.price;
    var platenumber = req.body.platenumber;

    // Query to insert
    var insert_query_rides = 'INSERT INTO Rides (rideDate, rideTime, rideDestination, rideOrigin, rideAdvPrice, rideCurrentPrice, ridePlateNumber) VALUES'
        + "('" + date + "','" + time + "','" + destination + "','" + origin + "','" + price + "', 0 ,'" + platenumber + "');";

    
    console.log(insert_query_rides);
    pool.query(insert_query_rides, (err, result) => {
        if (err) {
            console.log("error");
            res.redirect('/admin_allRides');
        } else {
            res.redirect('/admin_allRides');
            console.log("success");
        }
    });

});

module.exports = router;
