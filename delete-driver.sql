/** Function to delete a driver **/
CREATE OR REPLACE FUNCTION delete_driver
(username VARCHAR(20))
RETURNS void
AS
$$
BEGIN
DELETE FROM drivers d
	WHERE d.username LIKE username;
END
$$
LANGUAGE plpgsql;