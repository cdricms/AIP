import { exec } from "shelljs";
import { mkdirSync } from "fs";
import inquirer from "inquirer";
import { join } from "path";
import { chdir, exit } from "process";
import { Application } from "../interfaces/settings";
import isRequired from "../utils/isRequired";
// import * as os from "fs";
import { executeCommands, getAppSettings, getFullSettings } from "./settings";

export default function createProject(
  projectName: string,
  application = "default"
) {
  let settingsApplication = getAppSettings(application);
  const settings = getFullSettings();
  const { ghUnauthorized, projectFolder } = {
    ghUnauthorized: settings.ghUnauthorized,
    projectFolder: settings.projectPath,
  };

  let _dir = join(projectFolder, projectName);

  const createLocally = (dir: string) => {
    try {
      mkdirSync(dir);
      chdir(dir);
      console.log("Opening in: ", process.cwd().magenta);

      if (application !== "default") {
        console.log(
          `===============${application.toUpperCase()}===============`.cyan
        );
        settingsApplication = getAppSettings(application);
        if (
          settingsApplication.packages.length > 0 &&
          settingsApplication.package_origin === "requirements.txt"
        ) {
          for (let p of settingsApplication.packages) {
            exec(`echo ${p} >> requirements.txt`);
          }
        }
        executeCommands(settingsApplication.commands);
      }
      exec(`${settings.editor} .`);
    } catch (error) {
      console.error(error);
    }
  };

  if (application !== "default") {
    settingsApplication = getAppSettings(application) as Application;
    _dir = join(projectFolder, settingsApplication.path, projectName);
  }
  if (!ghUnauthorized.includes(application)) {
    inquirer
      .prompt([
        {
          type: "confirm",
          default: true,
          message: "Create a GitHub repository?".green,
          name: "createRepo",
          validate: isRequired,
        },
      ])
      .then((answer: { createRepo: boolean }) => {
        if (answer.createRepo) {
          inquirer
            .prompt([
              {
                type: "list",
                choices: ["Private", "Public"],
                default: 0,
                message: "Private or public".green,
                name: "isPrivate",
              },
            ])
            .then((answer: { isPrivate: string }) => {
              if (answer.isPrivate === "Private") {
                // TODO: GitHub repo
                console.log("Private");
                createLocally(_dir);
              } else {
                console.log("Public");
                createLocally(_dir);
              }
            });
        } else createLocally(_dir);
      });
  } else {
    createLocally(_dir);
  }
}
