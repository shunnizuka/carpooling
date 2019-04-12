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
        var data = [{ max: 0, min: 0, avg: 0 }]
        res.render('create_rides_pricechecker', { title: 'Carpooling', data: data });
    } else {
        res.redirect('/login');
    }
});


//POST to create
router.post('/', function (req, res, next) {

    //retrieve info from the page
    var originPrice = req.body.originPrice;
    var destinationPrice = req.body.destinationPrice;

    console.log(originPrice + ' ' + destinationPrice);

    //for the price checker
    console.log("checking price");
    var find_stat_query = 'SELECT max(rideCurrentPrice), min(rideCurrentPrice), avg(rideCurrentPrice) FROM Rides GROUP BY' +
        ' (rideDestination, rideOrigin) having rideOrigin=' + "'" + originPrice + "'" + "AND rideDestination="
        + "'" + destinationPrice + "';";

    console.log(find_stat_query);
    pool.query(find_stat_query, (err, data) => {
        console.log(data);
        if (data.rows.length != 0) {
            console.log('success');
            res.render('create_rides_pricechecker', { title: 'Rides', data: data.rows });
        } else { //if no rides available, just redirect 
            console.log('fail');
            res.redirect('/create_rides');
        }
    })
});

module.exports = router;
