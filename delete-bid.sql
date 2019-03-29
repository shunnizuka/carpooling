CREATE OR REPLACE FUNCTION delete_bid
(userNameToBeRemoved VARCHAR(20), rideIdToBeRemoved VARCHAR(20))
RETURNS void
AS
$$
BEGIN
    DELETE FROM bids B
    WHERE (B.bidderName LIKE userNameToBeRemoved) AND (B.rideId LIKE rideIdToBeRemoved);
END
$$
LANGUAGE plpgsql;