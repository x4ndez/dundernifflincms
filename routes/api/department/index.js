const department = require("express").Router();
const {

    getTableData,
    addDepartment

} = require("../../../utils/common.js");

// Get department list
department.get("/", async (req, res) => {

    res.json(await getTableData("department"));

});

// Add department
department.post("/", async (req, res) => {

    await addDepartment(req.body);

    res.json("Department added successfully!");

});

module.exports = department;