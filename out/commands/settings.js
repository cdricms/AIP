"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommands = exports.getAppSettings = exports.getFullSettings = exports.openProjectsFolder = exports.osCommands = exports.openSettings = exports.aipConfigPath = exports.settingsPath = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const settings = "settings.json";
exports.settingsPath = path_1.default.join(process.cwd(), settings);
const aipConfig = "aipconfig.json";
exports.aipConfigPath = path_1.default.join(process.cwd(), aipConfig);
const openSettings = () => shelljs_1.default.exec(exports.settingsPath);
exports.openSettings = openSettings;
function fsOpenSettings() {
    return JSON.parse(fs_1.default.readFileSync(exports.settingsPath, "utf-8"));
}
if (process.platform === "win32")
    exports.osCommands = { ls: "dir", explorer: "explorer", launch: "start" };
else if (process.platform === "darwin")
    exports.osCommands = { ls: "ls", explorer: "open", launch: "open" };
else
    exports.osCommands = { ls: "ls", explorer: "xdg-open", launch: "xdg-open" };
function openProjectsFolder(application, flag) {
    const settingsData = fsOpenSettings();
    const projectFolder = path_1.default.join(settingsData.project_path);
    let p;
    const getFlag = (path) => {
        if (flag === "") {
            console.log(path.magenta);
            shelljs_1.default.exec(`${exports.osCommands.explorer} ${path}`);
        }
        else if (flag === "-l")
            shelljs_1.default.exec(`${exports.osCommands.ls} "${path}"`);
    };
    if (application === "default") {
        getFlag(projectFolder);
    }
    else {
        const appSettings = getAppSettings(application);
        const pathApp = appSettings.path;
        p = path_1.default.join(projectFolder, pathApp);
        getFlag(p);
    }
}
exports.openProjectsFolder = openProjectsFolder;
function getFullSettings() {
    const settingsData = fsOpenSettings();
    const { projectPath, ghUnauthorized, editor, applications } = {
        projectPath: settingsData.project_path,
        ghUnauthorized: settingsData.gh_unauthorized,
        editor: settingsData.editor,
        applications: settingsData.applications,
    };
    const aipConfigData = JSON.parse(fs_1.default.readFileSync(exports.aipConfigPath, "utf-8"));
    const version = aipConfigData.version;
    return { projectPath, ghUnauthorized, editor, version, applications };
}
exports.getFullSettings = getFullSettings;
function getAppSettings(application) {
    const settingsData = fsOpenSettings();
    try {
        const applications = settingsData.applications;
        if (application !== "default") {
            const applicationSettings = applications.find((app) => app.application === application);
            if (applicationSettings) {
                return {
                    application: applicationSettings.application,
                    commands: applicationSettings.commands,
                    package_origin: applicationSettings.package_origin,
                    packages: applicationSettings.packages,
                    path: applicationSettings.path,
                };
            }
            else
                return {
                    path: settingsData.project_path,
                    application: "",
                    commands: [],
                    package_origin: "",
                    packages: [],
                };
        }
    }
    catch (error) {
        console.error(error);
    }
    return {
        path: settingsData.project_path,
        application: "",
        commands: [],
        package_origin: "",
        packages: [],
    };
}
exports.getAppSettings = getAppSettings;
function executeCommands(commands) {
    for (let command of commands)
        shelljs_1.default.exec(command);
}
exports.executeCommands = executeCommands;
