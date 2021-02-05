import json
import sys
import os

operating_sys = sys.platform

settings_json = "settings.json"

if operating_sys == 'win32':
    def format_string(string): return "\\".join(string.split("/"))
    os_commands = {"ls": "dir", "explorer": "explorer"}
else:
    def format_string(string): return string
    os_commands = {"ls": "ls", "explorer": "xdg-open"}


def open_settings(): return os.system(f"{format_string(settings_json)}")


def open_projet_folder(application: str, flag: str) -> str:

    project_folder = get_full_settings()[0]
    if application == "default":

        _dir = format_string(project_folder)

        if flag == "":
            os.system(f"{os_commands['explorer']} {_dir}")
        elif flag == "-l":
            os.system(f"{os_commands['ls']} {_dir}")
    else:
        app_settings = get_app_settings(application)
        path = app_settings["path"]

        _dir = format_string(f"{project_folder}/{path}")
        if flag == "":
            os.system(f"{os_commands['explorer']} {_dir}")
        elif flag == "-l":
            os.system(f"{os_commands['ls']} {_dir}")


def get_full_settings() -> tuple:
    """
    Gets the important settings
    """
    project_path = str
    version = str
    gh_unauthorized = list
    editor = str
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        project_path = settings['project_path']
        gh_unauthorized = settings["gh_unauthorized"]
        editor = settings["editor"]

    with open('aipconfig.json', 'r') as read_file:
        config = json.load(read_file)
        version = config["version"]

    return (project_path, version, gh_unauthorized, editor)


def get_app_settings(application):
    """
    Gets the settings from a certain application, if the application doesn't exist in settings.json, return an empty string
    :param application : application from applications: []
    """
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        try:
            applications = settings['applications']

            if (application != "default"):
                application_settings = next(
                    a for a in applications if a["application"] == application)

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
            want_to_create = str(
                input("Do you want to create the application? (Y/n)\n"))
            if (want_to_create.upper() == "YES" or want_to_create.upper() == "Y"):
                open_settings()

            return ""


def execute_commands(commands) -> None:
    """
    Executes the commands from a tuple or list in the terminal
    """
    for command in commands:
        os.system(command)
