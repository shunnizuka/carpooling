var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

// query to display all available rides
var all_users_query = 'SELECT DISTINCT U.username, userphone, rating FROM users U FULL OUTER JOIN drivers D ON D.username = U.username;'

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

	// Retrieve Information
	var username = req.body.username;
    var newphone = req.body.newphone;
    var newpassword = req.body.newpassword;

   // Construct specific SQL Query
   var insert_query_users = 'UPDATE users SET userphone = ' + "('" + newphone + "'), userpassword = "+ "('" + newpassword + "') WHERE userName = '" + username + "';";
   pool.query(insert_query_users, (err, data) => {
	 if (err) {
	   console.log("error");
	   res.redirect('/admin_allUsers');
	 } else {
	   res.redirect('/admin_allUsers');
	   console.log("success");
	 }
   });

});

module.exports = router;
