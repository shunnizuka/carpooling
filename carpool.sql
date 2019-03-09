create table Users(
	userID serial,
	userName varchar(100) not null,
	userPhone integer not null,
	userEmail varchar(100),
	userPassword varchar(100) not null,
	primary key(userID),
	unique(userName, userPhone, userEmail) 
);

create table Passengers(
	userID serial,
	userName varchar(100) not null,
	userPhone integer not null,
	userEmail varchar(100),
	userPassword varchar(100) not null,
	rating integer default 0,
	primary key(userID),
	foreign key(userID, userName, userPhone, userEmail, userPassword) 
		references Users(userID, userName, userPhone, userEmail, userPassword)
);

create table Drivers(
	userID integer not null,
	userName varchar(100) not null,
	userPhone integer not null,
	userEmail varchar(100),
	userPassword varchar(100) not null,
	rating integer default 0,
	primary key(userID),
	foreign key(userID, userName, userPhone, userEmail, userPassword) 
		references Users(userID, userName, userPhone, userEmail, userPassword)
);

create table Rides(
	rideID serial,
	rideDate date not null,
	rideTime time not null,
	rideDestination varchar(100) not null,
	rideOrigin varchar(100) not null,
	rideCurrentPrice integer not null,
	ridePlateNumber varchar(100) not null,
	primary key(rideID),
	foreign key(ridePlateNumber) references vehicles(plateNumber),
	check (ridetime) >= current_time,
	check (rideDate) >= current_date 
);

create table Vehicles(
	plateNumber varchar(100) not null,
	carType varchar(100) not null,
	carBrand varchar(100) not null,
	carModel varchar(100) not null,
	carColour varchar(100) not null,
	primary key(plateNumber)
);

create table Preferences(
	userID integer not null,
	smoker boolean,
	male boolean,
	highSpeed boolean,
	foreign key(userID) references Passengers(userID),
	on delete cascade
);

create table Payment Method(
	cardNumber integer not null,
	cardType varchar(100) not null,
	cardCVI integer(100) not null,
	primary key(cardNumber)
);

INSERT INTO Passengers (userName, userPhone, userPassword)
VALUES ('Beatrice', 93234567, password ),
 ('Leslie Cole', 91234567, password );

INSERT INTO Drivers (userName, userPhone, userPassword)
VALUES ('Leslie Cole', 91234567, password ),
 ('Bava', 92234567, password );


