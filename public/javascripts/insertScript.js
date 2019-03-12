function check(event) {
	// Get Values
	var username  = document.getElementById('username' ).value;
	var phone    = document.getElementById('phone'   ).value;
	var password = document.getElementById('password').value;
	
	// Simple Check
	if(username.length > 100) {
		alert("Invalid username");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(phone.length != 8) {
		alert("Invalid phone number");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(password.length > 100) {
		alert("Invalid password");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}