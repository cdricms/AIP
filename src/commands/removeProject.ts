import { existsSync, rmdirSync } from "fs";
import inquirer from "inquirer";
import { join } from "path";
import { Application } from "../interfaces/settings";
import { env } from "../main";
import isRequired from "../utils/isRequired";
import { deleteRepo, repoAlreadyExists } from "./github";
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

    const removeTree = (dir: string) => {
      try {
        rmdirSync(dir, { recursive: true });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    if (existsSync(_dir)) {
      console.log(_dir);
      try {
        inquirer
          .prompt([
            {
              type: "confirm",
              default: false,
              message: `Are you sure you want to delete locally the project ${projectName.bgGreen.white}`
                .red,
              name: "confirmDeletion",
              validate: isRequired,
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
    } else {
      console.log(`The project ${projectName} at ${_dir} does not exist!`.red);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removeGithubProject(repo: string) {
  const repoExists = await repoAlreadyExists(repo);

  if (repoExists) {
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
          validate: isRequired,
        },
      ])
      .then((data: { removeRepo: boolean }) => {
        if (data.removeRepo) deleteRepo(repo);
        else console.log("[GITHUB] ".red + "repository not deleted.".green);
      });
  }
}
