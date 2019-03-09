create table Users(
	userID integer notnull,
	userName varchar(100) notnull,
	userPhone integer notnull,
	userEmail varchar(100),
	userPassword varchar(100) notnull
	primary key (userID)
);

create table Passengers(
	userID integer notnull,
	userName varchar(100) notnull,
	userPhone integer notnull,
	userEmail varchar(100),
	userPassword varchar(100) notnull
	rating integer default 0
	primary key (userID)
	foreign key(userID, userName, userPhone, userEmail, userPassword) 
		references Users(userID, userName, userPhone, userEmail, userPassword)
)

create table Drivers(
	userID integer notnull,
	userName varchar(100) notnull,
	userPhone integer notnull,
	userEmail varchar(100),
	userPassword varchar(100) notnull
	rating integer default 0
	primary key (userID)
	foreign key(userID, userName, userPhone, userEmail, userPassword) 
		references Users(userID, userName, userPhone, userEmail, userPassword)
)

create table Rides(
	rideID integer notnull,
	rideTimeStamp ti
)