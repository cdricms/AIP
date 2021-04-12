"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const shelljs_1 = require("shelljs");
const settings_1 = require("./settings");
function openProject(projectName, application = "default") {
    let { projectPath, editor } = Object.assign({}, settings_1.getFullSettings());
    projectPath = path_1.join(projectPath);
    let _dir;
    const settings = settings_1.getAppSettings(application);
    if (application === "default") {
        _dir = path_1.join(projectPath, projectName);
    }
    else {
        const pathApplication = settings.path;
        _dir = path_1.join(projectPath, pathApplication, projectName);
    }
    if (fs_1.existsSync(_dir)) {
        shelljs_1.exec(`${editor} ${_dir}`);
    }
    else {
        console.log("The project you are looking for does not exist".yellow);
    }
}
exports.default = openProject;
