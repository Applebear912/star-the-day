DROP DATABASE IF EXISTS star_the_day;

CREATE DATABASE star_the_day;

USE star_the_day;

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(200),
  explanation VARCHAR(2000),
  date VARCHAR(20),
  copy_right VARCHAR(20)
);