drop database if exists customerdb;
create database customerdb;

create table customerdb.customer(
    customerID integer not null primary key,
    firstname varchar(9) not null,
    lastname varchar(7) not null,
    favouriteIceCream varchar(14) not null,
    customerclass varchar(21) not null
);

drop user if exists 'james'@'localhost';
create user 'james'@'localhost' identified by 'FVjO2QUK';

grant all privileges on customerdb.* to 'james'@'localhost';

insert into customerdb.customer values(1000, 'Paula','Smith' ,'caramel' ,'VIP' );
insert into customerdb.customer values(5000, 'Abel', 'Irony' , 'blueberry' , 'KeyCustomer' )

