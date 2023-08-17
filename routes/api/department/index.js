const department = require("express").Router();
const {

    getTableData

} = require("../../../utils/common.js");

// Get department list
department.get("/", async (req, res) => {

    res.json(await getTableData("department"));

});

module.exports = department;