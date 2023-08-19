const fetch = require("node-fetch");

async function getRequest(endpoint) {

    const res = await fetch(`http://localhost:3001/api/${endpoint}/`, { method: "GET" });
    return await res.json();

}

async function getRoleAsArray() {

    const roles = await getRequest("role");

    let rolesArray = [];

    for (const item of await roles) {

        rolesArray.push(item.title);

    }

    return rolesArray;

}

async function getEmployeesAsArray() {

    const employees = await getRequest("employee");

    let employeesArray = [];

    for (const item of await employees) {

        employeesArray.push(`${item.first_name} ${item.last_name}`);

    }

    return employeesArray;

}

async function getDepartmentAsArray() {

    const departments = await getRequest("department");

    let departmentsArray = [];

    for (const item of await departments) {

        departmentsArray.push(`${item.name}`);

    }

    return departmentsArray;

}

module.exports = {

    getRequest,
    getRoleAsArray,
    getEmployeesAsArray,
    getDepartmentAsArray

};