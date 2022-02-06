//add modules

const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page-template.js");

//add class modules from lib folder

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Array containing all employees information based on questions
const employees = [];

// Array object of questions in the command line interface
const questions = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "Can you tell me your name?",
      name: "name",
      //validate property to check that the user provided a value
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "I need a value to continue";
        }
      },
    },
    {
      type: "input",
      message: "Can you tell me your ID number?",
      name: "id",
      //validate property to check that the user provided a value
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "I need a value to continue";
        }
      },
    },
    {
      type: "input",
      message: "Can you tell me your email?",
      name: "email",
      //validate property to check that the user provided a value
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "I need a value to continue";
        }
      },
    },
    {
      type: "list",
      message: "Can you tell me your role?",
      name: "role",
      choices: ["Engineer", "Intern", "Manager"],
      //validate property to check that the user provided a value
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "I need a value to continue";
        }
      },
    },
  ]);

  // if the user wants to add a manager to their team, ask the user these questions
  if (answers.role === "Manager") {
    const managerAns = await inquirer.prompt([
      {
        type: "input",
        message: "Can you tell me your office number",
        name: "officeNumber",
        //validate property to check that the user provided a value
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "I need a value to continue";
          }
        },
      },
    ]);
    const newManager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      managerAns.officeNumber
    );
    employees.push(newManager);

    // if the user wants to add an engineer to their team, ask the user these questions
  } else if (answers.role === "Engineer") {
    const githubAns = await inquirer.prompt([
      {
        type: "input",
        message: "Can you tell me your GitHub user name?",
        name: "github",
        //validate property to check that the user provided a value
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "I need a value to continue";
          }
        },
      },
    ]);
    const newEngineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      githubAns.github
    );
    employees.push(newEngineer);

    // if the user wants to add an intern to their team, ask the user these questions
  } else if (answers.role === "Intern") {
    const internAns = await inquirer.prompt([
      {
        type: "input",
        message: "Which university did you go to?",
        name: "school",
        //validate property to check that the user provided a value
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "I need a value to continue";
          }
        },
      },
    ]);

    const newIntern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      internAns.school
    );
    employees.push(newIntern);
  }
}; // Questions have come to an end

   // Ask user if they want to add a new member or create their team

async function promptQuestions() {
  await questions();

  const addMemberAnswer = await inquirer.prompt([
    {
      name: "addMember",
      type: "list",
      choices: ["Add a new member", "Create team"],
      message: "Are you finished or add a new member?",
      //validate property to check that the user provided a value
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "I need a value to continue";
        }
      },
    },
  ]);

  if (addMemberAnswer.addMember === "Add a new member") {
    return promptQuestions();
  }
  return createTeam();
}

// call the promptQuestions function

promptQuestions();

// function to create a team file once user finishes adding members

function createTeam() {
  fs.writeFileSync(
    "./dist/index.html",
    generateTeam(employees),
    "utf-8",
    console.log("Your SUPER WORK TEAM has been created!")
  );
}
