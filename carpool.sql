DROP TABLE if exists Users cascade;
DROP TABLE if exists Drivers cascade;
DROP TABLE if exists Passengers cascade;
DROP TABLE if exists Rides cascade;
DROP TABLE if exists Vehicles cascade;
DROP TABLE if exists Preferences cascade;
DROP TABLE if exists PaymentMethod cascade;

create table Users(
	userName varchar(100) not null,
	userPhone integer not null,
	userPassword varchar(100) not null,
	primary key(userName)
);

create table Passengers(
	userName varchar(100) not null,
	userPhone integer not null,
	userPassword varchar(100) not null,
	rating integer default 0,
	primary key(userName),
	foreign key(userName) references Users(userName)
);

create table Vehicles(
	plateNumber varchar(100) not null,
	carType varchar(100) not null,
	carBrand varchar(100) not null,
	carModel varchar(100) not null,
	carColour varchar(100) not null,
	primary key(plateNumber)
);

create table Drivers(
	userName varchar(100) not null,
	userPhone integer not null,
	userPassword varchar(100) not null,
	rating integer default 0,
	plateNumber varchar(100) not null,
	primary key(userName),
	foreign key(userName) references Users(userName),
	foreign key(plateNumber) references Vehicles(plateNumber)
);

create table Rides(
	rideID serial,
	rideDate date not null,
	rideTime time not null,
	rideDestination varchar(100) not null,
	rideOrigin varchar(100) not null,
	rideCurrentPrice float not null,
	ridePlateNumber varchar(100) not null,
	rideDriverName varchar(100) not null,
	primary key(rideID),
	foreign key(ridePlateNumber) references Vehicles(plateNumber),
	foreign key(rideDriverName) references Drivers(userName),
	check ((ridetime) >= current_time),
	check ((rideDate) >= current_date)
);

create table Bids(
	bidderName varchar(100) not null,
	rideID integer not null,
	price float not null,
	foreign key(bidderName) references Passengers(userName),
	foreign key(rideID) references Rides(rideID),
	check (price > 0)
);

create table Preferences(
	userName varchar(100) not null,
	smoker boolean,
	male boolean,
	highSpeed boolean,
	foreign key(userName) references Passengers(userName)
	on delete cascade
);

create table PaymentMethod(
	cardNumber integer not null,
	cardType varchar(100) not null,
	cardCVI integer not null,
	primary key(cardNumber)
);

INSERT INTO Users (userName, userPhone, userPassword)
VALUES ('Beatrice', 93234567, 'password' ),
 ('Leslie Cole', 91234567, 'password' ),
('Bava', 92234567, 'password' );

INSERT INTO Passengers (userName, userPhone, userPassword)
VALUES ('Beatrice', 93234567, 'password' ),
 ('Leslie Cole', 91234567, 'password' );

INSERT INTO Vehicles(plateNumber, carType, carBrand, carColour, carModel)
 VALUES ('SDM4665P', '5 seater', 'Nissan', 'pink', 'Sunny'),
 ('SJK3629Z', '7 seater', 'BMW', 'black', 'aslkdjf');

INSERT INTO Drivers (userName, userPhone, userPassword, plateNumber)
VALUES ('Leslie Cole', 91234567, 'password', 'SDM4665P' ),
 ('Bava', 92234567, 'password', 'SJK3629Z' );

