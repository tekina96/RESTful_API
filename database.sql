create database todo_database;

-- \c into todo_database
CREATE TABLE todo(todo_id serial primary key,
    description varchar(255)
);