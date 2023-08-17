const connection = require("../db.js"); // Create connection with DB

// Input the role title, returns the role ID
async function getRoleAsId(role) {

    const query = await connection.promise().query(`

    SELECT id FROM role WHERE title = "${role}";

    `);

    return query[0][0].id;

}

// Input the department name, returns the department ID
async function getDepartmentAsId(department) {

    const query = await connection.promise().query(`

    SELECT id FROM department WHERE name = "${department}";

    `);

    return query[0][0].id;

}

// Input the full employee name, returns the employee ID
async function getManagerId(manager) {

    const nameArray = manager.split(" ");
    //nameArray[0] = first name
    //nameArray[1] = last name

    const query = await connection.promise().query(`

    SELECT id FROM employee WHERE first_name = "${nameArray[0]}" AND last_name = "${nameArray[1]}";

    `);

    return query[0][0].id;

}

// Input the table name: department, role, employee, returns all data from that table.
async function getTableData(tableName) {

    const query = await connection.promise().query(`

    SELECT * FROM ${tableName};

    `)

    return query[0];

}

async function getEmployeesByManager(tableName, managerId) {

    const query = await connection.promise().query(`

    SELECT *
    FROM ${tableName}
    WHERE manager_id = ${managerId};

    `)

    return query[0];

}

// Input an employee object, adds an employee to the database
async function addEmployee(newEmployee) {

    const { firstName, lastName, employeeRole, employeeManager } = newEmployee;
    let roleId = await getRoleAsId(employeeRole);
    let managerId = await getManagerId(employeeManager);

    connection.query(`

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ("${firstName}", "${lastName}", ${roleId}, ${managerId});

    `);

}

// Input a department object, adds a department to the database
async function addDepartment(newDepartment) {

    await connection.promise().query(`

INSERT INTO department (name)
VALUES ("${newDepartment.newDepartmentName}");

`);

}

// Input an role object, adds a job role to the database
async function addRole(newRole) {

    const department_id = await getDepartmentAsId(newRole.newRoleDepartment);

    await connection.promise().query(`

INSERT INTO role (title, salary, department_id)
VALUES ("${newRole.newRoleName}", "${newRole.newRoleSalary}", "${department_id}");

`);

}

async function updateEmployeeRole(changeData) {

    const { employeeName, changeToRole } = changeData;

    const employeeId = await getManagerId(employeeName);
    const newRole = await getRoleAsId(changeToRole);

    connection.promise().query(`

    UPDATE employee
    SET role_id = ${newRole}
    WHERE id = ${employeeId};

    `);

}

async function updateEmployeeManager(changeData) {

    const { employeeName, changeToManager } = changeData;

    const employeeId = await getManagerId(employeeName);
    const newManager = await getManagerId(changeToManager);

    connection.promise().query(`

    UPDATE employee
    SET manager_id = ${newManager}
    WHERE id = ${employeeId};

    `);

}

module.exports = {

    getManagerId,
    getTableData,
    getEmployeesByManager,
    addEmployee,
    addDepartment,
    addRole,
    updateEmployeeRole,
    updateEmployeeManager

};