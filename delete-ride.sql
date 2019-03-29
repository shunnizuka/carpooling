CREATE OR REPLACE FUNCTION delete_ride
(rideIdToBeRemoved INTEGER)
RETURNS void
AS
$$
BEGIN
    DELETE FROM rides R
    WHERE (R.rideId = rideIdToBeRemoved);
END
$$
LANGUAGE plpgsql;