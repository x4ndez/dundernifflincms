const employee = require("express").Router();
const mysql = require("mysql2/promise");
const connection = require("../../../db");

async function getRoleAsId(role) {

    try {

        const data = await connection.promise().query(`

    SELECT id FROM role WHERE title = "${role}";

    `);

        return data[0][0].id;

    } catch (err) {

        console.log(new Error(err));

    }

}

async function yyz() {

    const l = await getRoleAsId("Regional Manager");
    console.log(l);

}

yyz();

async function getManagerId(manager) {

    const data = await connection.promise().query(`

    SELECT * FROM employee;

    `);

    const nameArray = manager.split(" ");
    const employeeData = data[0];

    for (let i = 0; i < data[0].length; i++) {

        if (nameArray[0] === employeeData[i].first_name && // If the first names are the same
            nameArray[1] === employeeData[i].last_name) { // and the last names are the same

            return employeeData[i].id; // Return the id of that employee

        }

    }

}

async function x(res) {

    const query = await connection.promise().query(`

    SELECT * FROM employee;

    `)

    res.send(query[0]);

}

employee.get("/", (req, res) => {

    x(res);

});

// {
//     firstName: 'x',
//     lastName: 'x',
//     employeeRole: 'Receptionist',
//     employeeManager: 'Alexander Nanfro'
//   }

employee.post("/", async (req, res) => {



    const { firstName, lastName, employeeRole, employeeManager } = req.body;
    let roleId = await getRoleAsId(employeeRole);
    let managerId = await getManagerId(employeeManager);

    const query = connection.query(`

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ("${firstName}", "${lastName}", ${roleId}, ${managerId});

    `);
    // yyy[0][i].last_name
    res.send("Employee added successfully!");

});


module.exports = employee;