//add modules

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

//add classes modules



// Using Path module to create an output file into dist folder
//path resolve -> current working directory / dist = ../working-hard-or-hardly-working-team-generator-ohya/dist
const outputDir = path.resolve(__dirname, "dist");
//path join ->  joining outputDir + employees.html = ../outputDir/employees.html
const outputPath = path.join(outputDir, "employees.html");