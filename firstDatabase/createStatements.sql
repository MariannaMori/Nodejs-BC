drop database if exists employeedb;
create database employeedb;
use employeedb;

create table employee(
    employeeId integer not null primary key,
    firstname varchar(20) not null,
    lastname varchar(30) not null,
    department varchar(15),
    salary decimal(6,2)
);

create user if not exists 'zeke'@'localhost' identified by 'secret';
grant all privileges on employeedb.* to 'zeke'@'localhost';

insert into employee values(1,'Matt','River','ict',3000);
insert into employee values(2,'Mary','Smith','admin',7000);


