const employee = require("express").Router();
const mysql = require("mysql2/promise");
const connection = require("../../../db");

async function getRoleAsId(role) {

    // SELECT id FROM role WHERE first_name = xxx
    let yyy = await connection.promise().query(`

    SELECT * FROM role;

    `);

    for (let i = 0; i < yyy[0].length; i++) {

        if (role === yyy[0][i].title) return yyy[0][i].id;

    }

}

async function getManagerId(manager) {

    let yyy = await connection.promise().query(`

    SELECT * FROM employee;

    `);

    let lol = manager.split(" ")

    for (let i = 0; i < yyy[0].length; i++) {

        if (lol[0] === yyy[0][i].first_name && lol[1] === yyy[0][i].last_name) return yyy[0][i].id;

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