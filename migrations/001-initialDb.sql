-- Up
CREATE TABLE Books (
    bookId INTEGER PRIMARY KEY AUTOINCREMENT,
    availableQty INTEGER,
    bookName TEXT,
    imageUrl TEXT,
    isSelected BOOLEAN
);

CREATE TABLE Users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT,
    bookIds TEXT
);

INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (1, 1, 'BookName 1', 'https://res.cloudinary.com/abyy30/image/upload/v1608652378/bookImages/star.jpg', false);
INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (2, 4, 'BookName 2', 'https://res.cloudinary.com/abyy30/image/upload/v1608652381/bookImages/harry.jpg', false);
INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (3, 1, 'BookName 3', 'https://res.cloudinary.com/abyy30/image/upload/v1608652379/bookImages/sapiens.jpg', false);
INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (4, 2, 'BookName 4', 'https://res.cloudinary.com/abyy30/image/upload/v1608652380/bookImages/mind.jpg', false);
INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (5, 1, 'BookName 5', 'https://res.cloudinary.com/abyy30/image/upload/v1608652381/bookImages/sadh.jpg', false);
INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (6, 2, 'BookName 6', 'https://res.cloudinary.com/abyy30/image/upload/v1608652376/bookImages/georgeM.jpg', false);
INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (7, 1, 'BookName 7', 'https://res.cloudinary.com/abyy30/image/upload/v1608979625/bookImages/daVinc.jpg', false);
INSERT INTO Books (bookId, availableQty, bookName, imageUrl, isSelected) VALUES (8, 1, 'BookName 8', 'https://res.cloudinary.com/abyy30/image/upload/v1608979632/bookImages/alch.jpg', false);

INSERT INTO Users (userId, userName, bookIds) VALUES (808, 'abhipray', '');
-- Down
DROP TABLE Books;
DROP TABLE Users;