SELECT e.id, e.first_name, e.last_name, r.title AS role, e.manager_id, d.name
FROM ((employee e
JOIN role r
ON e.role_id = r.id)
JOIN department d
ON r.department_id = d.id)
ORDER BY e.manager_id;

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