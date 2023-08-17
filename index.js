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

async function getDepartmentAsArray() {

    const departments = await getRequest("department");

    let departmentsArray = [];

    for (const item of await departments) {

        departmentsArray.push(`${item.name}`);

    }

    return departmentsArray;

}

async function goToMainMenu() {

    const l2menuChoices = [
        "View", "Add", "Update"
    ]

    const menuChoices = [
        "View Employee Register", "View Job Roles", "View Departments",
        "Add Employee", "Add Job Role", "Add Department", "Update Employee Role", "Quit"
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
            console.table(await getRequest("employee"));
            break;

        case "View Job Roles":
            console.table(await getRequest("role"));
            break;

        case "View Departments":
            console.table(await getRequest("department"));
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

            const addRole = await inquirer.prompt([

                {
                    type: "input",
                    message: "Name the new role...",
                    name: "newRoleName",
                },

                {
                    type: "input",
                    message: "Salary of the new role...",
                    name: "newRoleSalary",
                },

                {
                    type: "list",
                    message: "Choose a department to add this role...",
                    choices: await getDepartmentAsArray(),
                    name: "newRoleDepartment",
                }

            ]);

            console.log(addRole);
            const bodyRole = await addRole;

            fetch("http://localhost:3001/api/role",
                {
                    method: "POST",
                    body: JSON.stringify(bodyRole),
                    headers: { "Content-Type": "application/json" }
                });


            break;

        case "Add Department":

            const addDepartment = await inquirer.prompt(

                {
                    type: "input",
                    message: "Name the new department...",
                    name: "newDepartmentName",
                }

            );

            const bodyDepartment = await addDepartment;

            fetch("http://localhost:3001/api/department",
                {
                    method: "POST",
                    body: JSON.stringify(bodyDepartment),
                    headers: { "Content-Type": "application/json" }
                });

            break;

        case "Update Employee Role":
            const updateEmployeeRole = await inquirer.prompt([

                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    choices: await getEmployeesAsArray(),
                    name: "employeeName",
                },

                {
                    type: "list",
                    message: "Change the role of the employee to which role?",
                    choices: await getRoleAsArray(),
                    name: "changeToRole",
                }

            ]);

            const bodyRoleUpdate = await updateEmployeeRole;

            fetch("http://localhost:3001/api/employee",
                {
                    method: "PUT",
                    body: JSON.stringify(bodyRoleUpdate),
                    headers: { "Content-Type": "application/json" }
                });

            break;

        case "Quit":
            return;
    }

    goToMainMenu();

}

goToMainMenu();