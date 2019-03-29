/* filters by origin, destination, time and date one shot */
CREATE OR REPLACE FUNCTION filter_origin_destination
(origin VARCHAR(20), destination VARCHAR(20), rideDate DATE, rideTime TIME)
RETURNS TABLE (
	origin VARCHAR(20),
    destination VARCHAR(20),
    rideDate DATE,
    rideTime TIME,
    currentPrice INTEGER
)
AS 
$$
BEGIN
	RETURN QUERY
    SELECT *
    FROM rides R
    WHERE (R.origin LIKE origin) AND (R.destination LIKE destination) AND (R.rideDate = rideDate) AND (R.rideTime = rideTime);
END
$$
LANGUAGE plpgsql;