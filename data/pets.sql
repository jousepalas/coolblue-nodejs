-- Create the "pets" table
CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    available BOOLEAN NOT NULL,
    birthYear INT NOT NULL,
    dateAdded DATE NOT NULL,
    photoUrl VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATE DEFAULT NULL
);

-- Insert data into the "pets" table
    INSERT INTO pets (id, name, species, available, birthYear, dateAdded, photoUrl)
VALUES
    (1, 'Daamin', 'Cat', FALSE, 2012, '2021-06-19', 'https://i.imgur.com/wpfirW7l.jpg'),
    (2, 'Dann', 'Dog', TRUE, 2016, '2022-01-01', 'https://i.imgur.com/ES0AHRxl.jpg'),
    (3, 'Annemie', 'Dog', TRUE, 2008, '2021-04-25', 'https://i.imgur.com/cL9Su9ql.jpg'),
    (4, 'Baxter', 'Cat', TRUE, 2020, '2021-08-13', 'https://i.imgur.com/uvkCHCyl.jpg'),
    (5, 'Beau', 'Cat', FALSE, 2013, '2021-12-15', 'https://i.imgur.com/dZXHXHnl.jpg'),
    (6, 'Echo', 'Dog', FALSE, 2019, '2021-12-20', 'https://i.imgur.com/KkxqmNsl.jpg'),
    (7, 'Arlo', 'Rat', TRUE, 2010, '2022-01-27', 'https://i.imgur.com/cw1ScXPl.jpg'),
    (8, 'Romeo', 'Dog', TRUE, 2015, '2021-02-05', 'https://i.imgur.com/7E8m93Wl.jpg'),
    (9, 'Tank', 'Dog', FALSE, 2015, '2021-08-05', 'https://i.imgur.com/Q4CSFnXl.jpg'),
    (10, 'Henry', 'Cat', TRUE, 2009, '2021-02-18', 'https://i.imgur.com/wt5AGpRl.jpg'),
    (11, 'Coco', 'Dog', FALSE, 2007, '2021-10-11', 'https://i.imgur.com/AxzxKXkl.jpg'),
    (12, 'Riley', 'Dog', FALSE, 2018, '2022-01-11', 'https://i.imgur.com/xIqqOVzl.jpg'),
    (13, 'Ace', 'Dog', FALSE, 2018, '2021-01-21', 'https://i.imgur.com/N1ZEtEwl.jpg'),
    (14, 'Louie', 'Dog', TRUE, 2016, '2021-07-23', 'https://i.imgur.com/3sbNyval.jpg'),
    (15, 'Toby', 'Cat', TRUE, 2019, '2021-08-23', 'https://i.imgur.com/gKGKsTgl.jpg'),
    (16, 'Mac', 'Cat', TRUE, 2014, '2021-10-29', 'https://i.imgur.com/1o7jhPfl.jpg'),
    (17, 'Murphy', 'Dog', TRUE, 2017, '2021-05-29', 'https://i.imgur.com/9c3OfRUl.jpg'),
    (18, 'Buster', 'Dog', TRUE, 2017, '2022-01-12', 'https://i.imgur.com/0FdlwHxl.jpg'),
    (19, 'Moose', 'Cat', FALSE, 2014, '2022-01-14', 'https://i.imgur.com/E24QYnzl.jpg'),
    (20, 'Bruno', 'Dog', TRUE, 2010, '2022-01-19', 'https://i.imgur.com/y5MOaAbl.jpg');
