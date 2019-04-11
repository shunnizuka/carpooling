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

/*const client = pool.connect(function(error){
    if(!error) {
        console.log(error);
    }
    else {
        console.log("Connected to database!");
    }
});*/

router.get('/', function(req, res, next) {
    var bid_query = 'SELECT * FROM Bids';
    pool.query(bid_query, function(err, result) {
        console.log(bid_query)
        if (err) {
            console.log("undefined");
            req.flash('error', err)
            res.redirect('/bids');
        }
        else {
            res.render('bids', { title: 'Bids Table', result: result.rows});
        }
    });
});

// POST
router.post('/', function (req, res, next) {

	// Retrieve Information
    var rideid = req.body.rideid;
    console.log(rideid);
    var newprice = req.body.newprice;
    console.log(newprice);

	// Construct Specific SQL Query
	var update_bid_price = 'UPDATE bids SET price = ' + "('" + newprice + "')" + 'WHERE rideId = ' + rideid;

	(async () => {
	
		const client = await pool.connect()
		//transaction to EDIT bids
		try {
			await client.query('BEGIN');
			const { rows } = await client.query(update_bid_price);
			await client.query('COMMIT');
			res.redirect('/bids');
		} catch (e) {
			await client.query('ROLLBACK')
			throw e
		} finally {
			client.release()
		}
	})().catch(e => console.error(e.stack))

});

module.exports = router;
