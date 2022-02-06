//add modules

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

//add classes modules (ony importing Manager/Engineer/Intern because they use Employee class as template)

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


// Using Path module to create an output file into dist folder

//path resolve -> current working directory / dist = ../working-hard-or-hardly-working-team-generator-ohya/dist
const outputDir = path.resolve(__dirname, "dist");
//path join ->  joining outputDir + employees.html = ../outputDir/employees.html
const outputPath = path.join(outputDir, "employees.html");

// Manager Questions

const questionsManager = [
    {
        type: "input",
        name: "name",
        message: "Manager's name?",
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
        input: "input",
        name: "id",
        message: "Manager's id number?",
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
        email: "emial",
        message: "Manager's email?",
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
            name: "officeNumber",
            message: "Manager's office number?",
            //validate property to check that the user provided a value
    validate: (value) => {
        if (value) {
          return true;
        } else {
          return "I need a value to continue";
        }
      },
    },
];

// Does user want to add more employees?
const addMoreEmployeesQuestion = {
    type: "list",
    name: "yOrN",
    message: "Want to add more employees?",
    choices: ["Yes", "No"],
  };

  // Employee questions
const employeeQuestions = [
    {
      type: "list",
      choices: ["Intern", "Engineer"],
      name: "role",
      message: "What is the employee's role in the company?",
    },
    {
      type: "input",
      name: "name",
      message: "What is their name?",
      validate(input) {
        if (input == false || !isNaN(input)) {
          input = "";
          return "You must enter a name";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is their id number?",
      validate(input) {
        if (input == false || isNaN(input)) {
          return "You must enter an id number";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "email",
      message: "What is their email?",
      validate(input) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) === false) {
          return "You must enter a valid email address";
        }
        return true;
      },
    },
  ];
  
  // Question specific to interns
  const internQuestion = {
    type: "input",
    name: "school",
    message: "What school do they attend?",
    validate(input) {
      if (input == false) {
        return "You must enter a school";
      }
      return true;
    },
  };
  
  // Question specific to engineers
  const engineerQuestion = {
    type: "input",
    name: "github",
    message: "What is their github username?",
    validate(input) {
      if (input == false) {
        return "You must enter a github username";
      }
      return true;
    },
  };
  
  // Array with all employees inside
  const employees = [];
  
  promptQuestions().then(renderHTML).then(writeHTML);
  
  //Function Prompts user for information
  async function promptQuestions() {
    try {
      // Ask questions about the manager
      const managerAnswers = await inquirer.prompt(managerQuestions);
      // Destructures the object of user input
      const { name, id, email, officeNumber } = managerAnswers;
      // Creates a new object using the class definition
      const theManager = new Manager(name, id, email, officeNumber);
      // pushes the manager object into the array of employees
      employees.push(theManager);
  
      // Checks to see if the user wishes to add more employees
      const addMoreEmployeesAnswer = await inquirer.prompt(
        addMoreEmployeesQuestion
      );
      let continueAddingEmployees = addMoreEmployeesAnswer.yesOrNo;
  
      while (continueAddingEmployees === "Yes") {
        // Asks the the user general employee questions
        const employeeAnswers = await inquirer.prompt(employeeQuestions);
  
        //   Asks the user a question specific to interns
        if (employeeAnswers.role === "Intern") {
          const internAnswer = await inquirer.prompt(internQuestion);
          // Creates a new object for the intern added
          const newIntern = new Intern(
            employeeAnswers.name,
            employeeAnswers.id,
            employeeAnswers.email,
            internAnswer.school
          );
          // Push the intern into the array of employees
          employees.push(newIntern);
        }
  
        //   Asks the user a question specific to engineers
        if (employeeAnswers.role === "Engineer") {
          const engineerAnswer = await inquirer.prompt(engineerQuestion);
          // Creates a new object for the Engineer
          const newEngineer = new Engineer(
            employeeAnswers.name,
            employeeAnswers.id,
            employeeAnswers.email,
            engineerAnswer.github
          );
  
          // Pushes the engineer into the array of employees
          employees.push(newEngineer);
        }
        // Checks to see if the user wishes to add more employees
        const addMoreEmployeesAnswer = await inquirer.prompt(
          addMoreEmployeesQuestion
        );
        continueAddingEmployees = addMoreEmployeesAnswer.yesOrNo;
      }
    } catch (err) {
      console.error(err);
    }
  }
