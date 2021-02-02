import os
import sys
from commands.create import create
from commands.open import open_project
from commands.remove import remove
from commands.settings import (
    open_projet,
    get_full_settings,
    os_commands
)
from commands.upgrade import upgrade
    

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
                print("Please provide a filename")
                exit()

        elif (command == "pf" or 
              command == "--version" or 
              command == "-v" or 
              command == "source" or 
              command == "settings" or 
              command == "gh" or 
              command == "repos" or 
              command == "aip"):
            
            if command == "--version" or command == "-v":
                version = get_full_settings()[1]
                print(version)

            elif command == "pf":
                pass

            elif command == "source":
                os.system(f"{get_full_settings()[3]} {os.getcwd()}")
            
            elif command == "settings":
                os.system(f"{get_full_settings()[3]} {os.getcwd()}/settings.json")

            elif command == "gh":
                print(get_full_settings()[2])
            
            elif command == "repos":
                pass

            elif command == "aip":
                os.system("start https://github.com/Smoqu/AIP")

        else:
            pass

    else:
        print("HElp")


if __name__ == "__main__":
    main()