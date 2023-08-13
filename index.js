const inquirer = require("inquirer-promise");
const fetch = require("node-fetch");

async function getRequest(endpoint) {

    const res = await fetch(`http://localhost:3001/api/${endpoint}/`, { method: "GET" });
    console.log(await res.json());

}

async function goToMainMenu() {

    const mainMenu = await inquirer.prompt(

        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Employee Register", "View Job Roles", "View Departments"],
            name: "menuOption",
        }

    );

    const y = console.log(mainMenu.menuOption);

    // async function () {

    switch (mainMenu.menuOption) {

        case "View Employee Register":
            getRequest("employee");
            break;

        case "View Job Roles":
            getRequest("role");
            break;

        case "View Departments":
            getRequest("department");
            break;

    }

    goToMainMenu();

}

goToMainMenu();