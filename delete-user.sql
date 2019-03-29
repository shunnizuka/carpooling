CREATE OR REPLACE FUNCTION delete_user
(userNameToBeRemoved VARCHAR(20))
RETURNS void
AS
$$
BEGIN
    DELETE FROM users U
    WHERE U.userName LIKE userNameToBeRemoved;
END
$$
LANGUAGE plpgsql;