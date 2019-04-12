DROP TABLE if exists Users cascade;
DROP TABLE if exists Drivers cascade;
DROP TABLE if exists Passengers cascade;
DROP TABLE if exists Rides cascade;
DROP TABLE if exists Vehicles cascade;
DROP TABLE if exists Preferences cascade;
DROP TABLE if exists PaymentMethod cascade;
DROP TABLE if exists Bids cascade;
DROP TABLE if exists Rides cascade;
DROP TABLE if exists Ratings cascade;

create table Users(
	userName varchar(20) not null,
	userPhone integer not null,
	userPassword varchar(20) not null,
	primary key(userName)
);

create table Passengers(
	userName varchar(20) not null,
	primary key(userName),
	foreign key(userName) references Users(userName)
);

create table Drivers(
	userName varchar(20) not null,
	rating integer,
	primary key(userName),
	foreign key(userName) references Users(userName)
);

create table Vehicles(
	plateNumber varchar(8) not null,
	driverUserName varchar(20),
	carType varchar(20) not null,
	carBrand varchar(20) not null,
	carModel varchar(20) not null,
	carColour varchar(20) not null,
	primary key(plateNumber),
	foreign key(driverUserName) references Drivers(userName)
);

create table Rides(
	rideId serial,
	rideDate date not null,
	rideTime time not null,
	rideDestination varchar(20) not null,
	rideOrigin varchar(20) not null,
	rideCurrentPrice float not null,
	rideAdvPrice float not null,
	ridePlateNumber varchar(8) not null,
	completed boolean default false,
	primary key(rideId),
	foreign key(ridePlateNumber) references Vehicles(plateNumber) ON DELETE CASCADE
);

create table Ratings(
	rideId integer,
	userName varchar(20) not null,
	score integer,
	primary key(rideID),
	foreign key(rideId) references Rides(rideId),
	foreign key(userName) references Drivers(userName)
);

create table Bids(
	bidderName varchar(20) not null,
	rideId integer,
	price float not null,
	primary key(bidderName, rideId),
	foreign key(bidderName) references Passengers(userName),
	foreign key(rideId) references Rides(rideId) ON DELETE CASCADE,
	check (price > 0)
);

create table Preferences(
	userName varchar(20) not null,
	prefPriority integer not null,
	preference varchar(20) not null,
	primary key(prefPriority, userName),
	foreign key(userName) references Passengers(userName) on delete cascade
);

create table PaymentMethod(
	userName varchar(20) not null,
	cardNumber varchar(16),
	cardType varchar(20),
	cardCVI integer,
	primary key(cardNumber, username),
	foreign key(userName) references Passengers(userName)
);

INSERT INTO Users (userName, userPhone, userPassword)
VALUES ('Beatrice', 93234567, 'password' ),
('Rohan', 91234567, 'password' ),
('Shune', 91234568, 'password' ),
('Bava', 92234567, 'password' ),
('RohanDev', 96853214, 'password'),
('Shunnika', 96853217, 'password'),
('Bavaaaaa', 96853218, 'password'),
('Beesaycheese', 96853219, 'password');

INSERT INTO Drivers(userName, rating)
VALUES ('Rohan', 5),
('Shune', 4),
('Bava', 3),
('Beatrice', 5);

INSERT INTO Passengers(userName)
VALUES ('Rohan'),
('Shune'),
('Bava'),
('Beatrice'),
('Beesaycheese');

INSERT INTO Vehicles(plateNumber, driverUserName, carType, carBrand, carModel, carColour)
VALUES ('12345678', 'Rohan', '7-seater', 'Toyota', '1234WWW', 'red'),
('87654321', 'Shune', '7-seater', 'Toyota', '4321WWW', 'pink'),
('11223344', 'Bava', '7-seater', 'Toyota', '1234YYY', 'red'),
('44332211', 'Beatrice', '7-seater', 'Toyota', '7654WWW', 'yellow');

INSERT INTO Rides (rideDate, rideTime, rideDestination, rideOrigin, rideCurrentPrice, rideAdvPrice, ridePlateNumber)
VALUES ('11/11/2019', current_time, 'Jalan Bukit Merah', 'NUS', 25, 25, '44332211'),
('11/12/2019', current_time, 'NUS', 'Jalan Bukit Merah', 25, 10, '87654321'),
('28/02/2020', current_time, 'Sembawang', 'Punggol', 15, 5, '11223344'),
('30/03/2020', current_time, 'Punggol', 'NUS', 35, 20, '12345678');

INSERT INTO Bids (bidderName, rideId, price)
VALUES ('Rohan', 1, 20.0),
('Bava', 1, 15.0),
('Shune', 1, 23.0),
('Rohan', 2, 17.0),
('Bava', 2, 19.0),
('Beatrice', 2, 14.0),
('Rohan', 3, 12.0),
('Shune', 3, 24.0),
('Beatrice', 3, 18.0),
('Shune', 4, 10.0),
('Bava', 4, 27.0),
('Beatrice', 4, 16.0);

INSERT INTO Preferences (userName, prefPriority, preference) 
VALUES ('Rohan', 1, 'No smoking'),
('Beatrice', 1, 'Pet Friendly'),
('Bava' , 2, 'Prefer Female Driver'),
('Bava', 1, 'Pet Friendly');

INSERT INTO PaymentMethod (username, cardNumber, cardType, cardCVI)
VALUES ('Rohan', '2849402123774892', 'Visa', '990'),
('Beatrice', '2794203488631352', 'MasterCard', '676'),
('Bava', '8935261784392071', 'Visa', '902');

CREATE OR REPLACE FUNCTION check_bid()
RETURNS TRIGGER AS
$$
DECLARE maxBid FLOAT;
BEGIN
	SELECT R.rideCurrentPrice INTO maxBid
	FROM Rides R
	WHERE R.rideId = NEW.rideId;
	IF NEW.price <= maxBid THEN RETURN NULL;
		ELSE 
		PERFORM update_rides_maxPrice(NEW.rideId, NEW.price);
		RETURN NEW;
	END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER check_bid
BEFORE INSERT OR UPDATE ON Bids
FOR EACH ROW
EXECUTE PROCEDURE check_bid();

CREATE OR REPLACE FUNCTION update_rides_maxPrice
(r_id INTEGER, price FLOAT)
RETURNS void
AS
$$
BEGIN
	UPDATE Rides
	SET rideCurrentPrice = price
	WHERE r_id = rideId;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_rides_dateAndTime()
RETURNS TRIGGER AS
$$
BEGIN
	RAISE NOTICE 'Invalid date and time';
	RETURN NULL;
END
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_rides_dateAndTime
BEFORE INSERT OR UPDATE ON Rides
FOR EACH ROW
WHEN ((NEW.rideDate < CURRENT_DATE)
OR ((NEW.rideDate = CURRENT_DATE) AND (NEW.rideTime < CURRENT_TIME)))
EXECUTE PROCEDURE update_rides_dateAndTime();

/*CREATE OR REPLACE FUNCTION update_rides_checkTime()
RETURNS TRIGGER AS
$$
DECLARE timeToCheck TIME;
		dateToCheck DATE;
BEGIN
	SELECT R.rideTime INTO timeToCheck
	FROM Rides R
	WHERE R.rideId = NEW.rideId;
	SELECT R.rideDate INTO dateToCheck
	FROM Rides R
	WHERE  R.rideId = NEW.rideId;
	IF (CURRENT_DATE = dateToCheck AND (timeToCheck - CURRENT_TIME) <= INTERVAL '1:00') THEN RETURN NULL;
		ELSE RETURN NEW;
	END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_rides_checkTime
BEFORE INSERT OR UPDATE ON Bids
FOR EACH ROW
EXECUTE PROCEDURE update_rides_checkTime();
*/
CREATE OR REPLACE FUNCTION check_driver_ownBid()
RETURNS TRIGGER AS
$$
DECLARE rideDriver VARCHAR(20);
BEGIN
	SELECT D.userName INTO rideDriver
	FROM Rides R, Vehicles V, Drivers D
	WHERE R.rideId = NEW.rideId AND R.ridePlateNumber = V.plateNumber AND V.driverUserName = D.userName;
	IF NEW.bidderName = rideDriver THEN RETURN NULL;
		ELSE RETURN NEW;
	END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER check_driver_ownBid
BEFORE INSERT OR UPDATE ON Bids
FOR EACH ROW
EXECUTE PROCEDURE check_driver_ownBid();

CREATE OR REPLACE FUNCTION check_maxbid_onDelete()
RETURNS TRIGGER AS
$$
DECLARE maxBid FLOAT;
		advPrice FLOAT;
BEGIN
	SELECT max(B.price) INTO maxBid
	FROM Bids B, Rides R
	GROUP BY B.rideId
	HAVING OLD.rideId = B.rideId;
	
	SELECT R.rideAdvPrice INTO advPrice
	FROM Rides R
	WHERE OLD.rideId = R.rideId;

	IF (maxBid <= advPrice) THEN UPDATE Rides SET rideCurrentPrice = advPrice WHERE rideId = OLD.rideId;
	ELSE UPDATE Rides SET rideCurrentPrice = maxBid WHERE rideId = OLD.rideId;
	END IF;
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER check_maxbid_onDelete
AFTER DELETE ON Bids
FOR EACH ROW
EXECUTE PROCEDURE check_maxbid_onDelete();


