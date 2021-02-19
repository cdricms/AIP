import inquirer from "inquirer";
import path from "path";
import c_process from "child_process";
import * as aipSets from "./commands/settings.js";
import getHelp from "./commands/help.js";
import "colors";
import isRequired from "./utils/isRequired.js";

if (process.argv.length > 2) {
  const command = process.argv[2];
  if (command.length > 0) {
    switch (command) {
      case "create":
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
          .then((answer: { createRepo: boolean }) => {
            if (answer.createRepo) {
              console.log("YEAYYYY");
            } else console.error("Ohhhhh");
          });

        break;
      case "--settings":
        c_process.exec(`${aipSets.osCommands.launch}, ${aipSets.settingsPath}`);
        break;

      case "--source":
        c_process.exec(`${aipSets.getFullSettings().editor} ${process.cwd()}`);
        break;
      case "gh":
        console.log(aipSets.getFullSettings().ghUnauthorized);
        break;

      // TODO: Repos
      case "aip":
        c_process.exec(
          `${aipSets.osCommands.launch} https://github.com/Smoqu/AIP"`
        );
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
