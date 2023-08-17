const employee = require("express").Router();
const {

    getTableData,
    addEmployee

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


module.exports = employee;