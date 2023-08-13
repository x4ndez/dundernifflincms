const role = require("express").Router();
const mysql = require("mysql2");

function x(res) {

    const pool = mysql.createPool({

        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_register_db",

    },

        console.log(`Pool opened`)

    );

    pool.query(`

    SELECT * FROM role;

    `, function (err, results) {

        res.send(results);

    });

}

role.get("/", (req, res) => {

    x(res);

});

module.exports = role;