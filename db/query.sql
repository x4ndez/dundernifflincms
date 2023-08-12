SELECT e.id, e.first_name, e.last_name, r.title AS role, e.manager_id, d.name
FROM ((employee e
JOIN role r
ON e.role_id = r.id)
JOIN department d
ON r.department_id = d.id)
ORDER BY e.manager_id;