const api = require("express").Router();
const departmentRoute = require("./department/index.js");
const roleRoute = require("./role/index.js");
const employeeRoute = require("./employee/index.js");


api.use("/department", departmentRoute);
api.use("/role", roleRoute);
api.use("/employee", employeeRoute);

module.exports = api;