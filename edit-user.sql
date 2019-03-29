/* TODO: check if update driver and passenger is correct */
CREATE OR REPLACE FUNCTION edit_user
(currentUserName VARCHAR(20), newUserName VARCHAR(20), newUserPhone INTEGER, newUserPassword VARCHAR(20))
RETURNS void
AS 
$$
BEGIN
	UPDATE users U, passengers P, drivers D
	SET U.userName = newUserName,
	U.userPhone = newUserPhone,
	U.userPassword = newUserPassword,
	P.userName = newUserName,
	D.userName = newUserName
	WHERE U.userName LIKE currentUserName AND ((P.userName LIKE currentUserName) OR (D.userName LIKE currentUserName));
END
$$
LANGUAGE plpgsql;