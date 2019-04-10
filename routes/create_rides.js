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
        res.render('create_rides', { title: 'Carpooling' });
    } else {
        res.redirect('/login');
    }
});

//POST
router.post('/', function (req, res, next) {

    //SQL query
    var session = req.session;

    var retrieve_platenumber = 'SELECT platenumber FROM Vehicles WHERE driverusername=' + "'" + req.session.username + "';";
    var platenumber;

    var origin = req.body.origin;
    var destination = req.body.destination;
    var date = req.body.date;
    var time = req.body.time;
    var price = req.body.price;

    console.log(retrieve_platenumber);

    pool.connect((err, client, release) => {

        client.query(retrieve_platenumber, (err, result) => {
            release();

            var platenumber = result.rows[0].platenumber;
            // Construct Specific SQL Query
            var insert_query_rides = 'INSERT INTO Rides (rideDate, rideTime, rideDestination, rideOrigin, rideCurrentPrice, ridePlateNumber) VALUES' 
            + "('" + date + "','" + time + "','" + destination + "','"+ origin + "','" + price + "','" + platenumber + "');";

            console.log(insert_query_rides);
            client.query(insert_query_rides, (err, result) => {
                if (err) {
                    console.log('error');
                    res.redirect('/create_rides');
                } else {
                    res.redirect('/create_rides');
                }
            });
        });
    })
});

module.exports = router;
