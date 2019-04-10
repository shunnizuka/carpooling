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
	rating integer default 0,
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
	ridePlateNumber varchar(8) not null,
	completed boolean default false,
	primary key(rideId),
	foreign key(ridePlateNumber) references Vehicles(plateNumber),
	check ((rideTime) >= current_time),
	check ((rideDate) >= current_date)
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
	foreign key(rideId) references Rides(rideId),
	check (price > 0)
);

create table Preferences(
	userName varchar(20) not null,
	preferenceId varchar(20),
	primary key(preferenceId, userName),
	foreign key(userName) references Passengers(userName)
	on delete cascade
);

create table PaymentMethod(
	cardNumber integer not null,
	cardType varchar(20) not null,
	cardCVI integer not null,
	primary key(cardNumber)
);

INSERT INTO Users (userName, userPhone, userPassword)
VALUES ('Beatrice', 93234567, 'password' ),
('Rohan', 91234567, 'password' ),
('Shune', 91234568, 'password' ),
('Bava', 92234567, 'password' );

INSERT INTO Drivers(userName, rating)
VALUES ('Rohan', 5),
('Shune', 4),
('Bava', 3),
('Beatrice', 5);


INSERT INTO Vehicles(plateNumber, driverUserName, carType, carBrand, carModel, carColour)
VALUES ('12345678', 'Rohan', '7-seater', 'Toyota', '1234WWW', 'red'),
('87654321', 'Shune', '7-seater', 'Toyota', '4321WWW', 'pink'),
('11223344', 'Bava', '7-seater', 'Toyota', '1234YYY', 'red'),
('44332211', 'Beatrice', '7-seater', 'Toyota', '7654WWW', 'yellow');

INSERT INTO Rides (rideDate, rideTime, rideDestination, rideOrigin, rideCurrentPrice, ridePlateNumber)
VALUES ('11/11/2019', current_time, 'Jalan Bukit Merah', 'NUS', 1, '44332211'),
 ('11/12/2019', current_time, 'NUS', 'Jalan Bukit Merah', 2, '87654321'),
  ('28/02/2020', current_time, 'Sembawang', 'Punggol', 1, '11223344'),
   ('30/03/2020', current_time, 'Punggol', 'NUS', 3, '12345678');


