const employee = require("express").Router();
const mysql = require("mysql2/promise");

async function getRoleAsId(role) {

    const pool = await mysql.createConnection({

        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_register_db",

    },

        console.log(`Pool opened`)

    );

    let yyy = await pool.query(`

    SELECT * FROM role;

    `)

    for (let i = 0; i < yyy[0].length; i++) {

        if (role === yyy[0][i].title) return yyy[0][i].id;

    }

}

async function getManagerId(manager) {

    const pool = await mysql.createConnection({

        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_register_db",

    },

        console.log(`Pool opened`)

    );

    let yyy = await pool.query(`

    SELECT * FROM employee;

    `)

    let lol = manager.split(" ")

    for (let i = 0; i < yyy[0].length; i++) {

        if (lol[0] === yyy[0][i].first_name && lol[1] === yyy[0][i].last_name) return yyy[0][i].id;

    }

}

async function x(res) {

    const pool = await mysql.createPool({

        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_register_db",

    },

        console.log(`Pool opened`)

    );

    const query = await pool.query(`

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

    const pool = await mysql.createPool({

        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_register_db",

    },

        console.log(`Pool opened`)

    );

    const { firstName, lastName, employeeRole, employeeManager } = req.body;
    let roleId = await getRoleAsId(employeeRole);
    let managerId = await getManagerId(employeeManager);

    const query = await pool.query(`

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ("${firstName}", "${lastName}", ${roleId}, ${managerId});

    `);
    yyy[0][i].last_name
    res.send("Employee added successfully!");

});


module.exports = employee;