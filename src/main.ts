import { join } from "path";
import dotenv from "dotenv";
dotenv.config({ path: join(process.cwd(), ".env") });

export let env: {
  token: string;
  gist: string;
} = {
  token: "",
  gist: ""
};

if (process.env.AIP_GH_TOKEN) env.token = process.env.AIP_GH_TOKEN;
if (process.env.AIP_GIST) env.gist = process.env.AIP_GIST;

import shell from "shelljs";
import * as aipSets from "./commands/settings.js";
import getHelp from "./commands/help.js";
import "colors";
import openProject from "./commands/openProject.js";
import createProject from "./commands/createProject.js";
import removeProject from "./commands/removeProject.js";
import { openProjectsFolder } from "./commands/settings.js";
import { getRepos } from "./commands/github.js";
import { existsSync } from "fs";

function main() {
  if (process.argv.length > 2) {
    const command = process.argv[2];
    if (command.length > 0) {
      const checkArgs = () => {
        if (process.argv[3]) {
          let application = "default";
          const projectName = process.argv[3];
          if (process.argv[4]) {
            application = process.argv[4];
          }
          return { projectName, application };
        }
      };

      const { projectName, application } = { ...checkArgs() };
      switch (command) {
        case "create":
          if (process.argv.length > 3) createProject(projectName!, application);
          else getHelp();
          break;
        case "remove":
          if (process.argv.length > 3) removeProject(projectName!, application);
          else getHelp();
          break;
        case "open":
          if (process.argv.length > 3) openProject(projectName!, application);
          else getHelp();
          break;
        case "pf":
          if (process.argv.length === 3) openProjectsFolder("default", "");
          else if (process.argv[3]) {
            if (process.argv[3] === "-l") openProjectsFolder("default", "-l");
            else {
              if (process.argv[4] && process.argv[4] === "-l")
                openProjectsFolder(process.argv[3], process.argv[4]);
              else openProjectsFolder(process.argv[3], "");
            }
          }
          break;

        case "--settings":
          shell.exec(`${aipSets.osCommands.launch}, ${aipSets.settingsPath}`);
          break;

        case "--source":
          shell.exec(`${aipSets.getFullSettings().editor} ${process.cwd()}`);
          break;

        case "gh":
          console.log(aipSets.getFullSettings().ghUnauthorized);
          break;

        case "repos":
          if (env.token) {
            console.log("[GITHUB]".red);
            getRepos();
          } else {
            console.log(
              "To use this functionnality you must have a GitHub token inside the .env file\n written like so: AIP_GH_TOKEN=YourToken"
                .bgRed
            );
          }
          break;
        case "aip":
          shell.exec(
            `${aipSets.osCommands.launch} https://github.com/Smoqu/AIP"`
          );
          break;

        case "--version":
        case "-v":
          console.log(aipSets.getFullSettings().version);
          break;

        // TODO: Upgrade
        // TODO: Get settings
        // TODO: Backup

        default:
          getHelp();
          break;
      }
    }
  } else getHelp();
}

if (existsSync(aipSets.settingsPath) && existsSync(aipSets.aipConfigPath))
  main();
else console.log("You need a settings.json file and aipConfig file".red);
