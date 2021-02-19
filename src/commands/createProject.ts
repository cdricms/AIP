import { mkdir } from "fs";
import inquirer from "inquirer";
import { join } from "path";
import { Application } from "../interfaces/settings";
import isRequired from "../utils/isRequired";
// import * as os from "fs";
import { getAppSettings, getFullSettings } from "./settings";

function createProject(projectName: string, application = "default") {
  let settingsApplication = getAppSettings(application);
  const settings = getFullSettings();
  const { ghUnauthorized, projectFolder } = {
    ghUnauthorized: settings.ghUnauthorized,
    projectFolder: settings.projectPath,
  };

  let init = false;
  let isPrivate: boolean;

  let _dir = join(projectFolder, projectName);

  if (application !== "default") {
    settingsApplication = getAppSettings(application) as Application;
    _dir = join(projectFolder, settingsApplication.path, projectName);
  }

  if (ghUnauthorized.includes(application)) {
    inquirer
      .prompt([
        {
          type: "confirm",
          default: "Y",
          message: "Create a GitHub repository?".green,
          name: "createRepo",
          validate: isRequired,
        },
      ])
      .then((answer: string) => {
        if (answer === "Y") {
          console.log("YEAYYYY");
        } else console.error("Ohhhhh");
      });

    const createLocally = () => {
      try {
        mkdir();
      } catch (error) {}
    };
  }
}
