const inquirer = require("inquirer-promise");
const fetch = require("node-fetch");

const {

    getManagerId

} = require("./utils/common.js");
const {

    getRequest,
    getRoleAsArray,
    getEmployeesAsArray,
    getDepartmentAsArray

} = require("./utils/inquirer.js");

async function goToMainMenu() {

    const menuChoices = [
        "View Employee Register", "View Job Roles", "View Departments", "View Employees by Manager",
        "Add Employee", "Add Job Role", "Add Department", "Update Employee Manager", "Update Employee Role", "Quit"
    ];

    const mainMenu = await inquirer.prompt([

        {
            type: "list",
            message: "What would you like to do?",
            choices: menuChoices,
            name: "menuOption",
        }

    ]);

    switch (mainMenu.menuOption) {

        case "View Employee Register":
            console.clear();
            console.table(await getRequest("employee"));
            break;

        case "View Job Roles":
            console.clear();
            console.table(await getRequest("role"));
            break;

        case "View Departments":
            console.clear();
            console.table(await getRequest("department"));
            break;

        case "View Employees by Manager":

            const manager = await inquirer.prompt([

                {
                    type: "list",
                    message: "Manager of the employees...",
                    choices: await getEmployeesAsArray(),
                    name: "employeeManager",
                }

            ]);

            const managerName = await manager.employeeManager;
            const managerId = await getManagerId(managerName);

            console.clear();
            console.table(await getRequest(`employee/manager/${managerId}`));
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

        case "Update Employee Manager":
            const updateEmployeeManager = await inquirer.prompt([

                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    choices: await getEmployeesAsArray(),
                    name: "employeeName",
                },

                {
                    type: "list",
                    message: "Choose the new manager of the employee...",
                    choices: await getEmployeesAsArray(),
                    name: "changeToManager",
                }

            ]);

            const bodyManagerUpdate = await updateEmployeeManager;

            fetch("http://localhost:3001/api/employee/manager",
                {
                    method: "PUT",
                    body: JSON.stringify(bodyManagerUpdate),
                    headers: { "Content-Type": "application/json" }
                });

            break;

        case "Quit":
            return;
    }

    goToMainMenu();

}

console.clear();
console.log("Welcome to the Dunder Nifflin CMS!");
goToMainMenu();