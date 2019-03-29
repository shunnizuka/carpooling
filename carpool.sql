DROP TABLE if exists Users cascade;
DROP TABLE if exists Drivers cascade;
DROP TABLE if exists Passengers cascade;
DROP TABLE if exists Rides cascade;
DROP TABLE if exists Vehicles cascade;
DROP TABLE if exists Preferences cascade;
DROP TABLE if exists PaymentMethod cascade;

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

create table Drivers(
	userName varchar(20) not null,
	rating integer,
	primary key(userName),
	foreign key(userName) references Users(userName)
);

create table Rides(
	rideId serial,
	rideDate date not null,
	rideTime time not null,
	rideDestination varchar(20) not null,
	rideOrigin varchar(20) not null,
	rideCurrentPrice float not null,
	ridePlateNumber varchar(8) not null,
	primary key(rideId),
	foreign key(ridePlateNumber) references Vehicles(plateNumber),
	check ((rideTime) >= current_time),
	check ((rideDate) >= current_date)
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
 ('Leslie Cole', 91234567, 'password' ),
('B', 92234567, 'password' );

INSERT INTO Passengers (userName, userPhone, userPassword)
VALUES ('Beatrice', 93234567, 'password' ),
 ('Leslie Cole', 91234567, 'password' );

INSERT INTO Vehicles(plateNumber, carType, carBrand, carColour, carModel)
 VALUES ('SDM4665P', '5 seater', 'Nissan', 'pink', 'Sunny'),
 ('SJK3629Z', '7 seater', 'BMW', 'black', 'aslkdjf');

INSERT INTO Drivers (userName, userPhone, userPassword, plateNumber, rating)
VALUES ('Leslie Cole', 91234567, 'password', 'SDM4665P', 2 ),
 ('B', 92234567, 'password', 'SJK3629Z', 4 );
