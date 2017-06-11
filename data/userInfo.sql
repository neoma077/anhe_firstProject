create database shoppingCenter;
use shoppingCenter;
create table if not exists  `userInfo`(
    `uid` int primary key auto_increment,
    `uname` varchar(100),
    `upwd` varchar(100),
    `uemail` varchar(100),
    `ubirthday` bigint(30)
);