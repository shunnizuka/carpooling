CREATE OR REPLACE FUNCTION create_bid
(userName VARCHAR(20), rideId INTEGER, price FLOAT)
RETURNS void
AS
$$
BEGIN
	INSERT INTO bids
	VALUES(userName, rideId, price);
END
$$
LANGUAGE plpgsql;