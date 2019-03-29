CREATE OR REPLACE FUNCTION edit_bid
(currentUserName VARCHAR(20), currentRideId INTEGER, newPrice FLOAT)
RETURNS void
AS 
$$
BEGIN
	UPDATE bids
	SET price = newPrice,
	WHERE (bidderName LIKE currentUserName) AND (rideId LIKE currentRideId);
END
$$
LANGUAGE plpgsql;