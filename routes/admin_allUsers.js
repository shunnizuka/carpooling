var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

// query to display all available rides
var all_users_query = 'SELECT userName AND userPhone FROM users;'
var all_drivers_query = ' SELECT userName, userPhone, rating From drivers U NATURAL JOIN users D WHERE U.userName = D.userName;'

// GET
router.get('/', function (req, res, next) {
	//add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
		pool.query(all_users_query, (err, data) => {
      console.log(all_users_query);
      res.render('admin_allUsers', { title: 'All Users', data: data.rows });
      console.log(data);
    });
	} else {
		res.redirect('/login');
	}
});

// POST
router.post('/', function (req, res, next) {
	//add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
	    pool.query(all_drievers_query, (err, data) => {
      console.log(all_drivers_query);
      res.render('admin_allUsers', { title: 'All Drivers', data: data.rows });
      console.log(data);
    });
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
