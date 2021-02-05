from commands.help import aip_help
from commands.settings_json import get_settings
from commands.gh import backup, repos_get
import os
import sys
from commands.create import create
from commands.open import open_project
from commands.remove import remove
from commands.settings import (
    open_projet_folder,
    get_full_settings,
)
from commands.upgrade import check_version


def main():

    if len(sys.argv) > 1:
        command = sys.argv[1].lower()

        if (command == "create" or
            command == "remove" or
                command == "open"):

            try:
                application = "default"

                if len(sys.argv) > 3:
                    application = sys.argv[3]

                if command == "create":
                    create(sys.argv[2], application)
                elif command == "remove":
                    remove(sys.argv[2], application)
                elif command == "open":
                    open_project(sys.argv[2], application)

            except IndexError:
                print("Please provide a foldername")
                exit()

        elif command == "--version" or command == "-v":
            version = get_full_settings()[1]
            print(version)

        elif command == "pf":
            if (len(sys.argv) > 2):
                if (sys.argv[2] == "-l"):
                    open_projet_folder("default", "-l")

                else:
                    application = "default"
                    flag = ""

                    application = sys.argv[2]

                    if len(sys.argv) > 3:
                        flag = sys.argv[3]

                    open_projet_folder(application, flag)

            else:
                open_projet_folder("default", "")

        elif command == "--source":
            os.system(f"{get_full_settings()[3]} {os.getcwd()}")

        elif command == "--settings":
            os.system(f"{get_full_settings()[3]} {os.getcwd()}/settings.json")

        elif command == "gh":
            print(get_full_settings()[2])

        elif command == "repos":
            repos_get()

        elif command == "aip":
            os.system("start https://github.com/Smoqu/AIP")

        elif command == "--upgrade":
            check_version()

        elif command == "--get-settings":
            get_settings()

        elif command == "-bu" or command == "--backup":
            backup()

        else:
            aip_help()

    else:
        aip_help()


if __name__ == "__main__":
    main()
