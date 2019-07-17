Drop Database if exists Bamazon;

CREATE DATABASE Bamazon; 

use Bamazon;

CREATE TABLE products(
item_ID INT not null,
product_name varchar(40) not null,
department_name varchar(40) not null,
price decimal(10,2) not null,
stock_quanity int(100) not null,
primary key (item_ID)

);
select * FROM products;

Insert into products (item_ID,product_name,department_name,price,stock_quanity)
values(44, 'cleats','baseball',45.00,3),
(2,"hockey_stick","hockey",99.00,17),
(16,"golf_ball","golf",5.00,546),
(8,"diver","golf",250.00,9),
(82,"helmet","lacrosse",68.50,15),
(77,"bat","baseball",89.99,28),
(62,"racket","tennis",55.50,23),
(1,"basketball","basketball",25.00,50),
(33,"cap","swimming",10.00,75),
(42,"running_shoes","track",99.99,15)
