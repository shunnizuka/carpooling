CREATE OR REPLACE FUNCTION create_driver
(userName VARCHAR(20), rating NUMERIC)
RETURNS void
AS
$$
BEGIN
	INSERT INTO drivers
	VALUES(userName, rating);
END
$$
LANGUAGE plpgsql;