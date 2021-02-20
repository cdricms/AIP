"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const aipSets = __importStar(require("./commands/settings.js"));
const help_js_1 = __importDefault(require("./commands/help.js"));
require("colors");
const createProject_js_1 = __importDefault(require("./commands/createProject.js"));
const removeProject_js_1 = __importDefault(require("./commands/removeProject.js"));
const settings_js_1 = require("./commands/settings.js");
if (process.argv.length > 2) {
    const command = process.argv[2];
    if (command.length > 0) {
        const checkArgs = () => {
            if (process.argv[3]) {
                let application = "default";
                const projectName = process.argv[3];
                if (process.argv[4]) {
                    application = process.argv[4];
                }
                return { projectName, application };
            }
        };
        const { projectName, application } = Object.assign({}, checkArgs());
        switch (command) {
            case "create":
                createProject_js_1.default(projectName, application);
                break;
            case "remove":
                removeProject_js_1.default(projectName, application);
                break;
            case "pf":
                if (process.argv.length === 3)
                    settings_js_1.openProjectsFolder("default", "");
                else if (process.argv[3]) {
                    if (process.argv[3] === "-l")
                        settings_js_1.openProjectsFolder("default", "-l");
                    else {
                        if (process.argv[4] && process.argv[4] === "-l")
                            settings_js_1.openProjectsFolder(process.argv[3], process.argv[4]);
                        else
                            settings_js_1.openProjectsFolder(process.argv[3], "");
                    }
                }
                break;
            case "--settings":
                shelljs_1.default.exec(`${aipSets.osCommands.launch}, ${aipSets.settingsPath}`);
                break;
            case "--source":
                shelljs_1.default.exec(`${aipSets.getFullSettings().editor} ${process.cwd()}`);
                break;
            case "gh":
                console.log(aipSets.getFullSettings().ghUnauthorized);
                break;
            // TODO: Repos
            case "aip":
                shelljs_1.default.exec(`${aipSets.osCommands.launch} https://github.com/Smoqu/AIP"`);
                break;
            case "--version":
            case "-v":
                console.log(aipSets.getFullSettings().version);
                break;
            // TODO: Upgrade
            // TODO: Get settings
            // TODO: Backup
            default:
                help_js_1.default();
                break;
        }
    }
}
else
    help_js_1.default();
