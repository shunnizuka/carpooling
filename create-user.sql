CREATE OR REPLACE FUNCTION create_user
(userName VARCHAR(20), userPhone INTEGER, userPassword VARCHAR(20))
RETURNS void
AS
$$
BEGIN
	INSERT INTO users
	VALUES(userName, userPhone, userPassword);
END
$$
LANGUAGE plpgsql;