CREATE OR REPLACE FUNCTION create_ride
(rideDate DATE, rideTime TIME, rideDestination VARCHAR(20), rideOrigin VARCHAR(20), rideCurrentPrice FLOAT, ridePlateNumber VARCHAR(8))
RETURNS void
AS
$$
BEGIN
	INSERT INTO rides
	VALUES(rideDate, rideTime, rideDestination, rideOrigin, rideCurrentPrice, ridePlateNumber);
END
$$
LANGUAGE plpgsql;