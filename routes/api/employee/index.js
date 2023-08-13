const employee = require("express").Router();
const mysql = require("mysql2/promise");

async function x(res) {

    const pool = mysql.createPool({

        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_register_db",

    },

        console.log(`Pool opened`)

    );

    let x = await pool.promise().query(`

    SELECT * FROM employee;

    `, (err, results) => results);

    res.send(x);

}

employee.get("/", (req, res) => {

    x(res);

});

module.exports = employee;