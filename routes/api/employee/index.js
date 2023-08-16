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

// async function yyz() {

//     const l = await getManagerId("Alexander Nanfro");
//     console.log(l);

// }

// yyz();

async function getManagerId(manager) {

    const nameArray = manager.split(" ");
    //nameArray[0] = first name
    //nameArray[1] = last name

    const data = await connection.promise().query(`

    SELECT id FROM employee WHERE first_name = "${nameArray[0]}" AND last_name = "${nameArray[1]}";

    `);

    return data[0][0].id;

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