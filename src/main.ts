import inquirer from "inquirer";
import path from "path";
import shell from "shelljs";
import * as aipSets from "./commands/settings.js";
import getHelp from "./commands/help.js";
import "colors";
import isRequired from "./utils/isRequired.js";
import createProject from "./commands/createProject.js";
import removeProject from "./commands/removeProject.js";
import { openProjectsFolder } from "./commands/settings.js";

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
        createProject(projectName, application);
        break;
      case "remove":
        removeProject(projectName, application);
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

      // TODO: Repos
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
