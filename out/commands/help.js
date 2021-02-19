"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHelp() {
    console.log(`
    Usage: aip [--version | -v] [--help | -h] [--source] 
    [--upgrade] [--get-settings] [--backup | -bu] [--settings]
    [<command>]

    <command>:
        - create <fordername> (<application>)
            Creates a new project, it will prompt you if 
            you also want to publish on GitHub. Application is optionnal.
            For more information: see the docs.
        
        - remove <foldername> (<application>)
            Removes an exisiting project, it will 
            prompt you also want to delete the repository on GitHub.

        - open <foldername> (<application>)
            This command opens a project directly in your editor.

        - pf (< -l >) or <application> (< -l >)
            Opens the main project directory in your explorer.
            If the flag < -l > is written, it will show you in the terminal 
            all the directories present in the main project directory.
            If you want instead to open an application directory, you can simply
            pass the application as a third argument. The < -l > flag is also applicable
            for applications, as a the fourth argument.
        
        - gh
            Shows all the applications unauthorized to be published on GitHub.
            This is set by you on your settings.json file under the gh_unauthorized property.

        - repos
            Lists all your private and public repositories in the terminal.
        
        - aip
            Opens in your browser the GitHub repository of AIP.

    - --source
        Opens the source code of AIP in your editor.

    - --settings
        Opens the settings.json file in your editor.

    - --backup
        Backs up your settings.json file to a gist.
        The id of the Gist has to be set in the .env file.

    - --get-settings
        Gets the settings.json file from your Gist.

    - --upgrade
        /!\ NOT STABLE /!\\
        Upgrades AIP to the newer version if there is one. 

  `);
}
exports.default = getHelp;
