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

router.get('/', function (req, res, next) {
    //add this to the pages that need to be logged in to access
    username = req.session.username;
    if (username != undefined) {
        res.redirect('/create_rides_pricechecker');
    } else {
        res.redirect('/login');
    }
});


//POST to create
router.post('/', function (req, res, next) {

    //SQL query
    var retrieve_platenumber_query = 'SELECT platenumber FROM Vehicles WHERE driverusername=' + "'" + req.session.username + "';";

    //retrieve info from the page
    var origin = req.body.origin;
    var destination = req.body.destination;
    var date = req.body.date;
    var time = req.body.time;
    var price = req.body.price;
    var originPrice = req.body.originPrice;
    var destinationPrice = req.body.destinationPrice;

    console.log(retrieve_platenumber_query);
    console.log(originPrice + ' ' + destinationPrice);

    //insert into rides
    pool.connect((err, client, release) => {

        //Query to get plate number
        client.query(retrieve_platenumber_query, (err, result) => {
            release();

            var platenumber = result.rows[0].platenumber;
            console.log(platenumber);
            // Query to insert
            var insert_query_rides = 'INSERT INTO Rides (rideDate, rideTime, rideDestination, rideOrigin, rideCurrentPrice, rideAdvPrice, ridePlateNumber) VALUES'
                + "('" + date + "','" + time + "','" + destination + "','" + origin + "','" + price + "','" + price + "','" + platenumber + "');";

            console.log(insert_query_rides);
            client.query(insert_query_rides, (err, result) => {
                if (err) {
                    console.log('error');
                    res.redirect('/create_rides_pricechecker');
                } else {
                    res.redirect('/create_rides');
                }
            });
        });
    })
})

module.exports = router;
