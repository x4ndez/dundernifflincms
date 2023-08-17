const inquirer = require("inquirer-promise");
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

async function goToMainMenu() {

    const menuChoices = [
        "View Employee Register", "View Job Roles", "View Departments",
        "Add Employee", "Add Job Role", "Add Department"
    ];

    const mainMenu = await inquirer.prompt([

        {
            type: "list",
            message: "What would you like to do?",
            choices: menuChoices,
            name: "menuOption",
        }

    ]);

    const y = console.log(mainMenu.menuOption);

    switch (mainMenu.menuOption) {

        case "View Employee Register":
            console.log(await getRequest("employee"));
            break;

        case "View Job Roles":
            console.log(await getRequest("role"));
            break;

        case "View Departments":
            console.log(await getRequest("department"));
            break;

        case "Add Employee":
            const addEmployee = await inquirer.prompt([

                {
                    type: "input",
                    message: "First name of the employee...",
                    name: "firstName",
                },

                {
                    type: "input",
                    message: "Last name of the employee...",
                    name: "lastName",
                },

                {
                    type: "list",
                    message: "Role of the employee...",
                    choices: await getRoleAsArray(),
                    name: "employeeRole",
                },

                {
                    type: "list",
                    message: "Manager of the employee...",
                    choices: await getEmployeesAsArray(),
                    name: "employeeManager",
                }

            ]);

            const bodyEmployee = await addEmployee;

            fetch("http://localhost:3001/api/employee",
                {
                    method: "POST",
                    body: JSON.stringify(bodyEmployee),
                    headers: { "Content-Type": "application/json" }
                });

            break;

        case "Add Job Role":

            break;

        case "Add Department":

            const addDepartment = await inquirer.prompt(

                {
                    type: "input",
                    message: "Name the new department...",
                    name: "newDepartmentName",
                }

            );

            console.log(addDepartment);
            const bodyDepartment = await addDepartment;

            fetch("http://localhost:3001/api/department",
                {
                    method: "POST",
                    body: JSON.stringify(bodyDepartment),
                    headers: { "Content-Type": "application/json" }
                });

            break;

    }

}

goToMainMenu();