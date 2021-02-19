import child_process from "child_process";
import path from "path";
import fs from "fs";
import Settings, { Application } from "../interfaces/settings";

const settings = "settings.json";
export const settingsPath = path.join(process.cwd(), settings);
const aipConfig = "aipconfig.json";
const aipConfigPath = path.join(process.cwd(), aipConfig);

export const openSettings = () => child_process.exec(settingsPath);

function fsOpenSettings(): Settings {
  return JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
}

export let osCommands: { ls: string; explorer: string; launch: string };

if (process.platform === "win32")
  osCommands = { ls: "dir", explorer: "explorer", launch: "start" };
else if (process.platform === "darwin")
  osCommands = { ls: "ls", explorer: "open", launch: "open" };
else osCommands = { ls: "ls", explorer: "xdg-open", launch: "xdg-open" };

export function openProjectsFolder(application: string, flag: string) {
  const settingsData = fsOpenSettings();

  const projectFolder = settingsData.project_path;

  let p: string;

  const getFlag = (path: string) => {
    if (flag === "") child_process.exec(path);
    else if (flag === "-l") child_process.exec(`${osCommands.ls} ${path}`);
  };

  if (application === "default") {
    p = projectFolder;
    getFlag(p);
  } else {
    const appSettings = getAppSettings(application) as Application;
    const pathApp = appSettings.path;

    p = path.join(projectFolder, pathApp);
    getFlag(p);
  }
}

export function getFullSettings() {
  const settingsData = fsOpenSettings();
  const { projectPath, ghUnauthorized, editor } = {
    projectPath: settingsData.project_path,
    ghUnauthorized: settingsData.gh_unauthorized,
    editor: settingsData.editor,
  };

  const aipConfigData: { version: string } = JSON.parse(
    fs.readFileSync(aipConfigPath, "utf-8")
  );
  const version = aipConfigData.version;

  return { projectPath, ghUnauthorized, editor, version };
}

export function getAppSettings(application: string): Application | string {
  const settingsData = fsOpenSettings();
  try {
    const applications = settingsData.applications;
    if (application !== "default") {
      const applicationSettings = applications.find(
        (app) => app.application === application
      );

      if (applicationSettings) {
        return { ...applicationSettings };
      } else return settingsData.project_path;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return settingsData.project_path;
  }
}

export function executeCommands(commands: Array<string>) {
  for (let command of commands) child_process.exec(command);
}
