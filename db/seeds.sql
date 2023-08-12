INSERT INTO department (name)
VALUES ("Management"),
("Sales"),
("Admin"),
("Marketing"),
("IT"),
("Warehouse Operations");


INSERT INTO role (title, salary, department_id)
VALUES ("Receptionist", 100000, 3),
("Regional Manager", 100000, 1),
("Assistant to the Regional Manager", 100000, 1),
("Sales Manager", 100000, 2),
("Sales Representative", 100000, 2),
("Marketing Manager", 100000, 4),
("Marketing Representative", 100000, 4),
("IT Support Technician", 100000, 5),
("Warehouse Operator", 100000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alexander", "Nanfro", 8, 3),
("John", "Dimple", 9, 3),
("Dwight", "Mute", 3, 2),
("Jim", "Halphert", 4, 3),
("Pam", "Reesly", 1, 3),
("Michael", "Stott", 2, NULL);