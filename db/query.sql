-- ADD DEPARTMENT
INSERT INTO department (name)
VALUES ("");

-- ADD ROLE
INSERT INTO role (title, salary, department_id)
VALUES ("", "", "");

-- UPDATE ROLE
UPDATE employee
SET role_id = ""
WHERE id = "";

-- GET LIST OF EMPLOYEES BY MANAGER
SELECT *
FROM employee
WHERE manager_id = x;

-- GET LIST OF EMPLOYEES BY DEPARTMENT
SELECT e.id, e.first_name, e.last_name, r.title, r.department_id
FROM employee e
JOIN role r
ON e.role_id = r.id
WHERE department_id = 1;

-- View the total utilized budget of a department—in other words,
-- the combined salaries of all employees in that department.
SELECT SUM(salary)
FROM role
WHERE department_id = x;

-- Delete departments, roles, and employees.
DELETE FROM employee
WHERE id = x;

DELETE FROM department
WHERE id = x;

-- must change the employee's role that share the id to be deleted before deleting
-- OR CASCADE, then read the employee
-- but I think for this application, changing an employee role first would be safer.
DELETE FROM role
WHERE id = x;

-- a formatted table showing employee data, including
-- employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department_name
FROM ((employee e
JOIN role r ON e.role_id = r.id)
JOIN department d ON r.department_id = d.id);