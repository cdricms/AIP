import { rmdirSync } from "fs";
import inquirer from "inquirer";
import { join } from "path";
import { Application } from "../interfaces/settings";
import { env } from "../main";
import { deleteRepo } from "./github";
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
            message: `Are you sure you want to delete locally the project ${projectName.bgGreen.white}`
              .red,
            name: "confirmDeletion",
          },
        ])
        .then((answer: { confirmDeletion: boolean }) => {
          if (answer.confirmDeletion) {
            removeTree(_dir);
            console.log(`${_dir} has been sucessfully removed!`.red);
            if (env.token) removeGithubProject(projectName);
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

export function removeGithubProject(repo: string) {
  inquirer
    .prompt([
      {
        type: "confirm",
        default: false,
        message:
          "[GITHUB]\n".red +
          "are you sure you want to delete this repository: " +
          repo.green +
          " ?",
        name: "removeRepo",
      },
    ])
    .then((data: { removeRepo: boolean }) => {
      if (data.removeRepo) deleteRepo(repo);
      else console.log("[GITHUB] ".red + "repository not deleted.".green);
    });
}
