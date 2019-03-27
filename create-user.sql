CREATE OR REPLACE FUNCTION create_user
(u_email TEXT, u_password TEXT, u_name TEXT)
RETURNS void
AS
$$
BEGIN
	INSERT INTO users
	VALUES(u_email, u_password, u_name);
END
$$
LANGUAGE plpgsql;