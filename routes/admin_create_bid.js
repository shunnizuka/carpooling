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

        res.render('admin_create_bid', { title: 'All Bids', data: data.rows });
        });
	} else {
        res.redirect('/login');
	}
	
});

// POST
router.post('/', function (req, res, next) {

	// Retrieve Information
	var biddername = req.body.username;
	var rideid = req.body.rideid;
	var price = req.body.price;

   // Construct specific SQL Query
   var insert_query_bids = 'INSERT INTO bids VALUES' + "('" + biddername + "','" + rideid + "','" + price + "');";
   console.log(insert_query_bids);

   pool.query(insert_query_bids, (err, data) => {
	 if (err) {
	   console.log("error");
	   res.redirect('/admin_allBids');
	 } else {
	   res.redirect('/admin_allBids');
	   console.log("success");
	 }
   });

});

module.exports = router;
