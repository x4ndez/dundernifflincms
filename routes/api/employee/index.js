const employee = require("express").Router();
const connection = require("../../../db");

async function getRoleAsId(role) {

    const query = await connection.promise().query(`

    SELECT id FROM role WHERE title = "${role}";

    `);

    return query[0][0].id;

}

async function getManagerId(manager) {

    const nameArray = manager.split(" ");
    //nameArray[0] = first name
    //nameArray[1] = last name

    const query = await connection.promise().query(`

    SELECT id FROM employee WHERE first_name = "${nameArray[0]}" AND last_name = "${nameArray[1]}";

    `);

    return query[0][0].id;

}

async function getEmployees() {

    const query = await connection.promise().query(`

    SELECT * FROM employee;

    `)

    return query[0];

}

// Get Employee list
employee.get("/", async (req, res) => {

    res.json(await getEmployees());

});

// Add employee to list
employee.post("/", async (req, res) => {

    const { firstName, lastName, employeeRole, employeeManager } = req.body;
    let roleId = await getRoleAsId(employeeRole);
    let managerId = await getManagerId(employeeManager);

    const query = connection.query(`

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ("${firstName}", "${lastName}", ${roleId}, ${managerId});

    `);

    res.json("Employee added successfully!");

});


module.exports = employee;