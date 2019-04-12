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

        //Query
        retrieve_user_info = 'SELECT R.username, userphone, cardnumber, cardtype, prefpriority, preference FROM (('
        + 'passengers natural join users) R left outer join paymentmethod on R.username = paymentmethod.username)'
        + 'left outer join preferences on preferences.username = R.username where R.username=' + "'" +username + "' order by prefpriority;";
        pool.query(retrieve_user_info, (err, data) => {
            console.log(retrieve_user_info);
            res.render('profile_passenger', { title: 'Carpooling', data: data.rows});
        })
    } else {
        res.redirect('/login');
    }
});

router.post('/', function(req, res, next) {
    username = req.session.username;
    var priority = req.body.priority;
    var preferences = req.body.preferences;

    console.log(priority, preferences);

    if (priority != undefined & preferences != undefined) {
        var insert_query_pref = 'INSERT INTO Preferences(userName, prefPriority, preference) VALUES ' 
        + "('" + username + "','" + priority + "','" + preferences + "')";
        console.log(insert_query_pref);

        pool.query(insert_query_pref, (err, data) => {
            if (err) {
                console.log('error');
                res.redirect('/profile_passenger');
            } else {
                res.redirect('/profile_passenger');
            }
        });
    }
});

module.exports = router;