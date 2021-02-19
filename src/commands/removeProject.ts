import { rmdirSync } from "fs";
import inquirer from "inquirer";
import { join } from "path";
import { Application } from "../interfaces/settings";
import { getAppSettings, getFullSettings } from "./settings";

export default function removeProject(
  projectName: string,
  application = "default"
) {
  try {
    let settings = getAppSettings(application);
    const projectFolder = getFullSettings().projectPath;

    let _dir = join(projectFolder, projectName);

    if (application !== "default") {
      settings = getAppSettings(application) as Application;
      const pathApplication = settings.path;
      _dir = join(projectFolder, pathApplication, projectName);
    }

    console.log(_dir);

    const removeTree = (dir: string) => {
      try {
        rmdirSync(dir, { recursive: true });
      } catch (error) {
        console.error(error);
      }
    };

    try {
      inquirer
        .prompt([
          {
            type: "confirm",
            default: false,
            message: `Are you sure you want to delete locally the project ${projectName}`
              .red,
            name: "confirmDeletion",
          },
        ])
        .then((answer: { confirmDeletion: boolean }) => {
          if (answer.confirmDeletion) {
            removeTree(_dir);
            console.log(`${_dir} has been sucessfully removed!`.red);
          } else {
            console.log("Nothing has been deleted".green);
          }
        });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error(error);
  }
}
