function login() {
	// Get Values
	var username  = document.getElementById('username' ).value;
	var password    = document.getElementById('password').value;
	
	// Alert
	alert("--- Your Input ---\nUsername: " + username + "\nPassword: " + password);
}

// function signup() {
// 	router.get('/signup', (req, res) => {
// 		res.render('signup');
// 	   });
// 	res.redirect('/signup');
// }