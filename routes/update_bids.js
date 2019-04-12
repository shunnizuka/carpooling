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

router.get('/', function(req, res, next) {
    //add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
        var own_bids_query = 'SELECT * FROM Bids WHERE bidderName = ' + "'" + req.session.username + "';";
	    pool.query(own_bids_query, (err, result) => {
        console.log(own_bids_query);
        res.render('update_bids', { title: 'Pending Rides', result: result.rows });
        console.log(result);
    });
	} else {
		res.redirect('/login');
	}
});

// POST to delete bid
router.post('/', function (req, res, next) {

	// Retrieve Information
    var rideid = req.body.rideid;
    var username = req.session.username;
    console.log(rideid, username);
    
    if (rideid != undefined & username != undefined) {
        // Construct Specific SQL Query
        var delete_query_bids = 'DELETE FROM bids WHERE rideId = ' + rideid + ' AND bidderName = '+ "'" + username + "';";
        console.log(delete_query_bids);

        pool.query(delete_query_bids, (err, result) => {
            if (err) {
                console.log("error");
            } else {
                res.redirect('/update_bids');
            }
        });
    }
    
});

module.exports = router;
