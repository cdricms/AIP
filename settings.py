import json
import os
import sys


operating_sys = sys.platform
command = str
flag_or_application = "default"


if operating_sys == 'win32':
    _format_string = lambda string : "\\".join(string.split("/"))
    _commands = {"ls": "dir"}
else:
    _format_string = lambda string : string
    _commands = {"ls": "ls"}

    
settings_json = "settings.json"

open_settings = lambda : os.system(f"{_format_string(settings_json)}")

def get_full_settings():
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        project_path = settings['project_path']
        version = settings["version"]
        gh_unauthorized = settings["gh_unauthorized"]
        return (project_path, version, gh_unauthorized)


if len(sys.argv) > 1:
    command = str(sys.argv[1])
    if len(sys.argv) >= 3:
        flag_or_application = str(sys.argv[2])


get_version = lambda : get_full_settings()[1]


if command == '-v':
    print(get_version())



def get_app_settings(application):
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        try:
            applications = settings['applications']

            if (application != "default"):
                application_settings = next(a for a in applications if a["application"] == application)
                
                return {
                    "commands": application_settings["commands"],
                    "path": application_settings["path"], 
                    "application": application_settings["application"],
                    "packages": application_settings["packages"],
                    "package_origin": application_settings["package_origin"]
                }
            else:
                return {"project_path": get_full_settings()[0]}

        except StopIteration:
            print(f"{application} not found")
            want_to_create = str(input("Do you want to create the application? (Y/n)\n"))
            if (want_to_create.upper() == "YES" or want_to_create.upper() == "Y"):
                open_settings()

            return ""


def open_project_folder():
    _dir = ""
    app_settings = str
    path = get_full_settings()[0]

    if flag_or_application != "-l":
        app_settings = get_app_settings(flag_or_application)


    if flag_or_application == "default":
        _dir = _format_string(path)
    elif flag_or_application != "default" and flag_or_application != "-l":
        path_application = app_settings["path"]
        _dir = _format_string(f"{path}/{path_application}")
        if len(sys.argv) >= 4 and sys.argv[3] == "-l":
            os.system(f"{_commands['ls']} {_format_string(_dir)}")



    if flag_or_application == "-l":
        os.system(f"{_commands['ls']} {_format_string(path)}")

        print("""
        If you would like to create a new project: aip create <foldername>
        """)
            
    if command == "pf" and flag_or_application != "-l" and len(sys.argv) < 4:
        os.system(f'explorer {_dir} ')


if (command == "pf"):
    open_project_folder()


def execute_commands(commands):
    for command in commands:
        os.system(command)

        