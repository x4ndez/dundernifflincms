const employee = require("express").Router();
const {

    getTableData,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager

} = require("../../../utils/common.js");

// Get Employee list
employee.get("/", async (req, res) => {

    res.json(await getTableData("employee"));

});

// Add employee to list
employee.post("/", async (req, res) => {

    await addEmployee(req.body);

    res.json("Employee added successfully!");

});

// Update role of the employee
employee.put("/", (req, res) => {

    updateEmployeeRole(req.body);

    res.json(req.body);

});

// Update role of the employee
employee.put("/manager", (req, res) => {

    updateEmployeeManager(req.body);

    res.json(req.body);

});

module.exports = employee;