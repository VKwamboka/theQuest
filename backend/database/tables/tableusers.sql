-- Create a new table called 'users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.users', 'U') IS NOT NULL
DROP TABLE dbo.users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.users
(
    userId VARCHAR(255)  PRIMARY KEY, -- primary key column
    Name VARCHAR(200)NOT NULL,
    Email VARCHAR(300) UNIQUE NOT NULL,
    Role VARCHAR(100) DEFAULT 'user',
    Password VARCHAR(150) NOT NULL,
    isSent VARCHAR(150) DEFAULT '0',
    location VARCHAR(255) ,
    bio VARCHAR(1255) ,
    isDeleted BIT NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
GO