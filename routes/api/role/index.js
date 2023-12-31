const role = require("express").Router();
const {

    getRoles,
    addRole

} = require("../../../utils/common.js");

// Get job role list
role.get("/", async (req, res) => {

    res.json(await getRoles());

});

// Add a job role
role.post("/", async (req, res) => {

    await addRole(req.body);

    res.json("Role added successfully!");

});

module.exports = role;