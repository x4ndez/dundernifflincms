const role = require("express").Router();
const {

    getTableData

} = require("../../../utils/common.js");

// Get job role list
role.get("/", async (req, res) => {

    res.json(await getTableData("role"));

});

module.exports = role;