import json
import os
import sys


operating_sys = sys.platform
command = str
flag = str


if operating_sys == 'win32':
    _format_string = lambda string : "\\".join(string.split("/"))
    _commands = {"ls": "dir"}
else:
    _format_string = lambda string : string
    _commands = {"ls": "ls"}

    
settings_json = "settings.json"

open_settings = lambda : os.system(f"{_format_string(settings_json)}")

# print(sys.argv)

if len(sys.argv) > 1:
    command = str(sys.argv[1])
    if len(sys.argv) > 2:
        flag = str(sys.argv[2])


def get_version():
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        return settings["version"]


if command == '-v':
    print(get_version())


def open_project_folder():
    with open(settings_json, 'r',) as read_file:
        settings = json.load(read_file)
        project_path = _format_string(settings["project_path"])
        if flag == "-l":
            os.system(f"{_commands['ls']} {project_path}")

            print("""
            If you would like to create a new project: aip create <foldername>
            """)
            
        if command == "pf" and flag != "-l":
            os.system(f'explorer {project_path} ')


if (command == "pf"):
    open_project_folder()


def get_settings(application):
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        project_path = settings['project_path']
        try:
            applications = settings['applications']

            if (application != "default"):
                application_settings = next(a for a in applications if a["application"] == application)
                
                return {"project_path": project_path, 
                        "commands": application_settings["commands"],
                        "path": application_settings["path"], 
                        "application": application_settings["application"],
                        "packages": application_settings["packages"],
                        "package_origin": application_settings["package_origin"]}
            else:
                return {"project_path": project_path}

        except StopIteration:
            print(f"{application} not found")
            want_to_create = str(input("Do you want to create the application? (Y/n)\n"))
            if (want_to_create.upper() == "YES" or want_to_create.upper() == "Y"):
                open_settings()

            return ""
