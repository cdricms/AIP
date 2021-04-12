import { existsSync } from "fs";
import { join } from "path";
import { exec } from "shelljs";
import { getAppSettings, getFullSettings } from "./settings";

export default function openProject(
  projectName: string,
  application: string = "default"
) {
  let { projectPath, editor } = { ...getFullSettings() };
  projectPath = join(projectPath);
  let _dir: string;
  const settings = getAppSettings(application);

  if (application === "default") {
    _dir = join(projectPath, projectName);
  } else {
    const pathApplication = settings.path;
    _dir = join(projectPath, pathApplication, projectName);
  }

  if (existsSync(_dir)) {
    exec(`${editor} ${_dir}`);
  } else {
    console.log("The project you are looking for does not exist".yellow);
  }
}
