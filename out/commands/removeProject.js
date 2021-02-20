"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGithubProject = void 0;
const fs_1 = require("fs");
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = require("path");
const main_1 = require("../main");
const isRequired_1 = __importDefault(require("../utils/isRequired"));
const github_1 = require("./github");
const settings_1 = require("./settings");
function removeProject(projectName, application = "default") {
    try {
        let settings = settings_1.getAppSettings(application);
        const projectFolder = settings_1.getFullSettings().projectPath;
        let _dir = path_1.join(projectFolder, projectName);
        if (application !== "default") {
            settings = settings_1.getAppSettings(application);
            const pathApplication = settings.path;
            _dir = path_1.join(projectFolder, pathApplication, projectName);
        }
        const removeTree = (dir) => {
            try {
                fs_1.rmdirSync(dir, { recursive: true });
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        };
        if (fs_1.existsSync(_dir)) {
            console.log(_dir);
            try {
                inquirer_1.default
                    .prompt([
                    {
                        type: "confirm",
                        default: false,
                        message: `Are you sure you want to delete locally the project ${projectName.bgGreen.white}`
                            .red,
                        name: "confirmDeletion",
                        validate: isRequired_1.default,
                    },
                ])
                    .then((answer) => {
                    if (answer.confirmDeletion) {
                        removeTree(_dir);
                        console.log(`${_dir} has been sucessfully removed!`.red);
                        if (main_1.env.token)
                            removeGithubProject(projectName);
                    }
                    else {
                        console.log("Nothing has been deleted".green);
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            console.log(`The project ${projectName} at ${_dir} does not exist!`.red);
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = removeProject;
function removeGithubProject(repo) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoExists = yield github_1.repoAlreadyExists(repo);
        if (repoExists) {
            inquirer_1.default
                .prompt([
                {
                    type: "confirm",
                    default: false,
                    message: "[GITHUB]\n".red +
                        "are you sure you want to delete this repository: " +
                        repo.green +
                        " ?",
                    name: "removeRepo",
                    validate: isRequired_1.default,
                },
            ])
                .then((data) => {
                if (data.removeRepo)
                    github_1.deleteRepo(repo);
                else
                    console.log("[GITHUB] ".red + "repository not deleted.".green);
            });
        }
    });
}
exports.removeGithubProject = removeGithubProject;
