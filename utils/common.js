const connection = require("../db.js"); // Create connection with DB

// Input the role title, returns the role ID
async function getRoleAsId(role) {

    const query = await connection.promise().query(`

    SELECT id FROM role WHERE title = "${role}";

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

async function addDepartment(newDepartment) {

    await connection.promise().query(`

INSERT INTO department (name)
VALUES ("${newDepartment.newDepartmentName}");

`);

}

module.exports = {

    getTableData,
    addEmployee,
    addDepartment

};