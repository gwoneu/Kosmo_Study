use webdb;
create table users(
	uid varchar(20) not null primary key,
    upass varchar(200) not null,
    uname varchar(20),
    photo varchar(200),
    phone varchar(20),
    address1 varchar(200),
    address2 varchar(200)
);

insert into users(uid, upass, uname)
values('blue','pass','김블루');
insert into users(uid, upass, uname)
values('red','pass','이레드');
insert into users(uid, upass, uname)
values('green','pass','최그린');

select * from users;

update users set
phone='010-1010-2020', address1='인천 서구 서곶로120' where uid='blue';
update users set
phone='010-1010-3030', address1='서구 강서구 화곡동' where uid='red';
update users set
phone='010-1010-4040', address1='서울 강남구 대치동' where uid='green';

select * from users;
select * from users where uid='red';

create table books(
	bid int auto_increment primary key,
    title varchar(300) not null,
    price int default 0,
    authors varchar(300),
    contents text,
    publisher varchar(300),
    image varchar(300),
    regdate datetime default now(),
    isbn varchar(100)
);

drop table books;
desc books;

select * from books;
select count(*) from books;

select * from books order by bid desc
limit 0,5;

desc books;

select *, format(price, 0) fmtprice, date_format(regdate, '%Y-%m-%d') fmtdate
from books 
order by bid desc;

delete from books where bid = 46;

select * from books where title like '%자바%';

select *
from books
order by bid desc
limit 0, 6;

select count(*) from books;

select *, format(price,0) fmtprice,date_format(regdate,"%Y-%m-%d") fmtdate from books;

create table favorite(
	uid varchar(20) not null,
    bid int not null,
    regdate datetime default now(),
    primary key(uid, bid),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

desc users;

select * from favorite;

select count(*) from favorite where uid='blue' and bid=28;

use webdb;
desc favorite;

select * from favorite;

delete from favorite where bid>0;

select * from users;
select bid, title from books order by bid desc;

insert into favorite(uid, bid) value('green',60);
delete from favorite where bid=60 and uid='blue';
update favorite set regdate=now() where uid='red' and bid='61';
select count(*) cnt from favorite where uid='red' and bid=60;

select count(*) fcnt,
(select count(*) from favorite where bid=? and uid=?) ucnt
from favorite where bid=?;

select count(*) ucnt from favorite where bid=60 and uid='red';

select *,
(select count(*) from favorite where bid=books.bid) fcnt,
(select count(*) from favorite where bid=books.bid and uid=?) ucnt
from books
where title like ? or authors like ?
order by bid desc
limit ?,6;

create table review(
	rid int auto_increment primary key,
    uid varchar(20) not null,
    bid int not null,
    contents text,
    regdate datetime default now(),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

select * from review;

select bid from books order by bid desc;

insert into review(bid, uid, contents)
values(52, 'blue', '프로그래밍을 처음 공부할때 해당 언어의 기본서적을 보고 공부하는게 가장 좋은 방법이라고 생각한다.
그런데 기본서적은 선택하기가 어렵고 기본 서적을 잘못 선택하면 언어에 대한 흥미를 잃어서 공부를 포기하게 된다.  
그래서 기본서는 쉬어야 하고 재미가 있어야 하며 다양한 예제가 있어서 기본기를 충분히 학습할수 있어야 좋은 기본서라고 생각한다.');
insert into review(bid, uid, contents)
values(60,'red','프로그래머를 처음 공부하고 자바라는 언어를 선택한 사람 - 처음 자바를 공부하는 사람에게는 최선의 학습교제라고 생각한다.');
insert into review(bid, uid, contents)
values(54,'green','학원에서 자바 프로그래밍 과정을 배웠지만 빠른 일정때문에 기초가 부족하다고 느끼는 사람.');

select count(*) from review;

insert into review(bid, uid, contents)
select bid, uid, contents from review;

select * from review where bid=? order by rid desc limit 0,5;

desc users;

create view view_review as 
select uname, photo, review.*, date_format(regdate, '%Y-%m-%d %T') fmtdate
from review, users
where review.uid=users.uid
order by rid desc;

drop view view_review;

select * from view_review;

create table cart(
	cid int auto_increment primary key,
    uid varchar(20) not null,
    bid int not null,
    qnt int default 1,
    regdate datetime default now(),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

delete from cart where cid > 0;

select * from cart;

create view view_cart as
select cart.*, books.title, books.image, books.price, format(books.price,0) fmtprice
from cart, books
where cart.bid=books.bid
order by cid desc;

drop view view_cart;

select * from view_cart;

drop view view_cart;

create view view_cart as
select cart.*, books.title, books.image, books.price, format(books.price,0) fmtprice,price*qnt as sum,format(price*qnt,0) fmtsum
from cart, books
where cart.bid=books.bid
order by cid desc;

select * from favorite;

select count(*) from favorite where uid='blue' and bid=200;

create table purchase(
	pid int auto_increment primary key,
    uid varchar(20) not null,
    rname varchar(20) not null,
    rphone varchar(20) not null,
    raddress1 varchar(200) not null,
    raddress2 varchar(200) not null,
    regdate datetime default now(),
    status int default 0,
    sum int default 0,
    foreign key(uid) references users(uid)
);

create table orders(
	pid int not null,
    bid int not null,
	qnt int default 0,
    price int default 0,
    primary key(pid, bid),
    foreign key(pid) references purchase(pid),
    foreign key(bid) references books(bid)
);

select * from purchase;

delete from purchase where pid > 0;

select * from orders;
delete from orders where pid > 0;


/*sql문이 복잡하면 view로 만들기*/
create view view_purchase as
select *,format(sum, 0) as fmtsum, date_format(regdate, '%Y-%m-%d %T') as fmtdate
from purchase
order by pid desc;

select * from view_purchase;
select * from view_purchase where uid='red';

create view view_orders as
select orders.*, title, image, format(orders.price, 0) fmtprice, format(orders.price*qnt, 0) fmtsum
from orders, books
where orders.bid=books.bid
order by orders.bid;

drop view view_orders;

select * from view_orders where pid=11;

update purchase set status=1 where pid=11;

select * from view_purchase;

select * from purchase;

desc books;

select count(*) from books;

select *
from books
where title like '%고경희%' or contents like '%고경희%' or authors like '%고경희%'
order by bid
limit 0,5;

call books('자바', 1, 6);

select * from books where bid = '61';

select * from users;
select *,date_format(regdate, '%Y-%m-%d %T') fmtdate from users;

alter table users add column regdate datetime default now();

update users set photo=null where uid > '';

alter table users add column modidate datetime default now();

select *,format(price,0) fmtprice from books where bid=60;

call book_read(61);

desc favorite;
desc review;

select *,
(select count(*) from favorite where favorite.bid=books.bid) fcnt,
(select count(*) from favorite where favorite.bid=books.bid and uid='blue') ucnt,
(select count(*) from review where review.bid=books.bid) rcnt
from books
where title like '%%' or contents like '%%' or authors like '%%'
order by books.bid desc
limit 0,5;

select count(*) fcnt
from favorite
where bid = 57;

insert into favorite(uid, bid) values('blue',57);

call book_list('자바',1,5,'blue');

select count(*) total
from books
where title like '%%' or contents like '%%' or authors like '%%';

call book_read('61','red');

select count(*)
from review
where bid=60;

select r.*, date_format(r.regdate, '%Y-%m-%d %T') fmtdate, uname, photo
from review r, users u
where r.bid=60 and r.uid=u.uid
order by r.rid desc  
limit 0,3; 

call review_list(60, 1, 3);

select * from cart;
desc cart;

delete from cart
where regdate <= date_add(now(), interval-7 day) and cid >0;

select cart.*, title,image,price,
format(price,0) fmtprice, date_format(cart.regdate, '%Y-%m-%d %T') fmtdate
from cart, books
where uid='blue' and cart.bid=books.bid
order by cid desc
limit 0, 5;

call cart_list ('blue',1,3);

select sum(qnt*books.price) sum, format(sum(qnt * books.price),0) fmtsum
from cart, books
where cart.bid = books.bid and cart.uid='blue';

call cart_sum('blue');

call cart_list('blue');
select * from orders;
delete from purchase where pid>0;

select *, date_format(regdate, '%Y-%m-%d %T') fmtdate, format(sum,0) fmtsum,
case
	when(status=0) then '결제확인중'
    when(status=1) then '결제확인'
    when(status=2) then '배송준비중'
    when(status=3) then '배송중'
    when(status=4) then '배송완료'
    when(status=5) then '주문완료'
end as str_status
from purchase
where uid='blue'
order by pid desc
limit 0,3;

update purchase set status=1 where pid=8;
call order_list('blue',1,3);

select * from orders;

select o.*, title, image, format(o.price,0) fmtprice
from orders o, books b
where pid=8 and o.bid=b.bid;

call order_list(8);

call purchase_all();

update purchase set status=3 where pid=17;