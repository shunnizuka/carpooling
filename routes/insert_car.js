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
        retrieve_user_phone = 'SELECT * FROM users inner join vehicles on users.username = vehicles.driverUserName WHERE username='
            + "'" + username + "';";
        pool.query(retrieve_user_phone, (err, data) => {
            res.render('profile_driver', { title: 'Carpooling', data: data.rows });
        })
    } else {
        res.redirect('/login');
    }
});

router.post('/', function (req, res, next) {

    username = req.session.username;
    platenumber = req.body.newplatenumber;
    carbrand = req.body.newcarbrand;
    carmodel = req.body.newcarmodel;
    carcolor = req.body.newcarcolor;
    cartype = req.body.newcartype;

    //Query
    var insert_car = 'INSERT INTO vehicles VALUES ('+ "'" + platenumber + "','" + username + "','" + cartype + "','" 
    + carbrand + "','" + carmodel + "','" + carcolor + "');";

    console.log(insert_car);
    pool.query(insert_car, (err, data) => {
        if (err) {
            console.log('error');
            res.redirect('/profile_driver');
        } else {
            res.redirect('/profile_driver');
            console.log('success');
        }
    });
})

module.exports = router;
