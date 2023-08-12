const express = require("express");
const mysql = require("mysql2");
const api = require("./routes/api/index.js");

const server = express();
const PORT = process.env.PORT || 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", api);

// const db = mysql.createConnection({

//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "employee_register_db"

// },

//     console.log(`Connected to the database`)

// );

// db.query(`

// SELECT e.id, e.first_name, e.last_name, r.title AS role, e.manager_id, d.name
// FROM ((employee e
// JOIN role r
// ON e.role_id = r.id)
// JOIN department d
// ON r.department_id = d.id)
// ORDER BY e.manager_id;

// `, function (err, results) {

//     console.log(results);

// });

server.listen(PORT, () => {

    console.log(`Server listening at port ${PORT}`);

});