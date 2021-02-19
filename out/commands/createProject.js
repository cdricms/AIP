"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const fs_1 = require("fs");
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = require("path");
const process_1 = require("process");
const isRequired_1 = __importDefault(require("../utils/isRequired"));
// import * as os from "fs";
const settings_1 = require("./settings");
function createProject(projectName, application = "default") {
    let settingsApplication = settings_1.getAppSettings(application);
    const settings = settings_1.getFullSettings();
    const { ghUnauthorized, projectFolder } = {
        ghUnauthorized: settings.ghUnauthorized,
        projectFolder: settings.projectPath,
    };
    let _dir = path_1.join(projectFolder, projectName);
    const createLocally = (dir) => {
        try {
            fs_1.mkdirSync(dir);
            process_1.chdir(dir);
            console.log("Opening in: ", process.cwd().magenta);
            if (application !== "default") {
                console.log(`===============${application.toUpperCase()}===============`.cyan);
                settingsApplication = settings_1.getAppSettings(application);
                if (application === settingsApplication.application) {
                    if (settingsApplication.packages.length > 0 &&
                        settingsApplication.package_origin === "requirements.txt") {
                        for (let p of settingsApplication.packages) {
                            shelljs_1.exec(`echo ${p} >> requirements.txt`);
                        }
                    }
                    settings_1.executeCommands(settingsApplication.commands);
                }
            }
            shelljs_1.exec(`${settings.editor} .`);
        }
        catch (error) {
            console.error(error);
        }
    };
    if (application !== "default") {
        settingsApplication = settings_1.getAppSettings(application);
        _dir = path_1.join(projectFolder, settingsApplication.path, projectName);
    }
    if (!ghUnauthorized.includes(application)) {
        inquirer_1.default
            .prompt([
            {
                type: "confirm",
                default: true,
                message: "Create a GitHub repository?".green,
                name: "createRepo",
                validate: isRequired_1.default,
            },
        ])
            .then((answer) => {
            if (answer.createRepo) {
                console.log("Create a repo");
                createLocally(_dir);
            }
            else
                createLocally(_dir);
        });
    }
    else {
        console.log("I am default");
        createLocally(_dir);
    }
}
exports.default = createProject;
