DROP DATABASE IF EXISTS employee_register_db;
CREATE DATABASE employee_register_db;

USE employee_register_db;

CREATE TABLE department (

    id INT(4) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),

    PRIMARY KEY(id)

);

CREATE TABLE role (

    id INT(4) NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL,
    department_id INT(4),

    PRIMARY KEY(id),
    UNIQUE(id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)

);

CREATE TABLE employee (

    id INT(4) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(4),
    manager_id INT(4) NULL,

    PRIMARY KEY(id),
    UNIQUE(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)

);