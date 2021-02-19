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
const inquirer_1 = __importDefault(require("inquirer"));
const child_process_1 = __importDefault(require("child_process"));
const aipSets = __importStar(require("./commands/settings.js"));
const help_js_1 = __importDefault(require("./commands/help.js"));
require("colors");
const isRequired_js_1 = __importDefault(require("./utils/isRequired.js"));
if (process.argv.length > 2) {
    const command = process.argv[2];
    if (command.length > 0) {
        switch (command) {
            case "create":
                inquirer_1.default
                    .prompt([
                    {
                        type: "confirm",
                        default: "Y",
                        message: "Create a GitHub repository?".green,
                        name: "createRepo",
                        validate: isRequired_js_1.default,
                    },
                ])
                    .then((answer) => {
                    if (answer.createRepo) {
                        console.log("YEAYYYY");
                    }
                    else
                        console.error("Ohhhhh");
                });
                console.log("Okay it runs");
                break;
            case "--settings":
                child_process_1.default.exec(`${aipSets.osCommands.launch}, ${aipSets.settingsPath}`);
                break;
            case "--source":
                child_process_1.default.exec(`${aipSets.getFullSettings().editor} ${process.cwd()}`);
                break;
            case "gh":
                console.log(aipSets.getFullSettings().ghUnauthorized);
                break;
            // TODO: Repos
            case "aip":
                child_process_1.default.exec(`${aipSets.osCommands.launch} https://github.com/Smoqu/AIP"`);
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
