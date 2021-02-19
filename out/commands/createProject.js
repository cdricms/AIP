"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const isRequired_1 = __importDefault(require("../utils/isRequired"));
const settings_1 = require("./settings");
function createProject(projectName, application = "default") {
    const settingsApplication = settings_1.getAppSettings(application);
    const settings = settings_1.getFullSettings();
    const { ghUnauthorized, projectFolder } = {
        ghUnauthorized: settings.ghUnauthorized,
        projectFolder: settings.projectPath,
    };
    let init = false;
    let isPrivate;
    if (ghUnauthorized.includes(application)) {
        inquirer_1.default
            .prompt([
            {
                type: "confirm",
                default: "Y",
                message: "Create a GitHub repository?".green,
                name: "createRepo",
                validate: isRequired_1.default,
            },
        ])
            .then((answer) => {
            if (answer === "Y") {
                console.log("YEAYYYY");
            }
            else
                console.error("Ohhhhh");
        });
    }
}
