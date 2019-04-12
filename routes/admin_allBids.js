var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

router.get('/', function(req, res, next) {
    	
	var username = req.session.username;

	if(username != undefined) {
		/* SQL Query */
        var bid_query = 'SELECT * FROM Bids';
        pool.query(bid_query, (err, data) => {
        console.log(bid_query)

        res.render('admin_allBids', { title: 'All Bids', data: data.rows });
        });
	} else {
        res.redirect('/login');
	}
	
});

// POST to delete ride
router.post('/', function(req, res, next) {
    
    //retrieve info from the page
    var rideId = req.body.rideid;
    var username = req.body.biddername;

    //SQL query
	var sql_query = 'DELETE FROM bids B WHERE ' + "'" + username + "'" + ' = B.bidderName AND B.rideId = ' + "'" + rideId + "';";
    console.log(sql_query);
    
    pool.query(sql_query, (err, data) => {
            //if(err) throw err
            if (err) {
                // redirect to users list page
                res.redirect('/admin_allBids');
            } else {// redirect to users list page
                res.redirect('/admin_allBids');
            }
        })
   })

module.exports = router;
