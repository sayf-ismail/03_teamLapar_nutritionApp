CREATE DATABASE food_db;
\c food_db

CREATE TABLE food_details(id SERIAL PRIMARY KEY, dish TEXT, portion TEXT, calories INTEGER, carbs TEXT, fat TEXT, protein TEXT, picture_url TEXT);

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Beef Hor Fun', '1 plate', 697,'95g', '26g', '20g','https://www.theburningkitchen.com/wp-content/uploads/2018/07/Beef-Hor-Fun-9x16-500x383.jpg?v=1592144251');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Nasi Dagang', '1 plate', 509, '92g', '12g', '8g', 'https://d12man5gwydfvl.cloudfront.net/wp-content/uploads/2019/08/Webp.net-resizeimage-23.jpg');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Durian Cendol', '1 bowl', 571, '89g', '21g', '9g', 'https://funntaste.com/wp-content/uploads/2018/01/Durian_cendol_Shah_alam_060516_010.jpg');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Asam Laksa', '1 plate', 349, '48g', '14g', '7g', 'https://cdn.kuali.com/wp-content/uploads/2019/12/27160426/asam_laksa.png');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Mee Udang Soup', '1 plate', 324, '71g', '5g', '4g', 'https://i0.wp.com/penangfoodie.com/wp-content/uploads/2019/03/46793201_577670469313347_9045421455534946140_n.jpg?resize=1080%2C1080');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Nasi Goreng Kampung', '1 plate', 386, '64g', '2g', '10g', 'https://i.ytimg.com/vi/auZhz8QmhKA/maxresdefault.jpg');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Lamb Chop', '1 gram', 279, '0g', '23g', '18g', 'https://www.jessicagavin.com/wp-content/uploads/2012/09/lamb-chops-5-1200.jpg');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Nasi Lemak', '1 packet', 494, '80g', '14g', '13g', 'https://asianinspirations.com.au/wp-content/uploads/2019/04/R02156_Mums-NasiLemak.jpg');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Nasi Kandar', '1 packet', 462, '65g', '13g', '21g', 'https://media.thestar.com.my/Prod/954C6CDB-198C-4FD9-B165-7F4116750B1F');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Roti Canai', '1 plate', 264, '34g', '10g', '9g', 'https://rasamalaysia.com/wp-content/uploads/2010/03/roti-canai-roti-paratha-roti-prata.jpg');

INSERT INTO food_details(dish, portion, calories, carbs, fat, protein, picture_url) VALUES('Fish and Chips', '1 plate', 681, '71g', '26g', '43g', 'https://static.toiimg.com/thumb/59736398.cms?width=1200&height=900');


CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT, email_address TEXT, password_digest TEXT);

-- To add new data, just key in insert into
INSERT INTO users(first_name, email_address, password_digest) VALUES('#{first_name}', '#{user_email}', '#{password_digest}');

INSERT INTO users(first_name, email_address, password_digest) VALUES('test', 'test@test.com', 'hello');