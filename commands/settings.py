import json
import sys

operating_sys = sys.platform

settings_json = "settings.json"

if operating_sys == 'win32':
    format_string = lambda string : "\\".join(string.split("/"))
    os_commands = {"ls": "dir", "explorer": "explorer"}
else:
    format_string = lambda string : string
    os_commands = {"ls": "ls", "explorer": "xdg-open"}


def open_projet(application: str, flag: str) -> str:
    pass

def get_full_settings() -> tuple:
    """
    Gets the important settings
    """
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        project_path = settings['project_path']
        version = settings["version"]
        gh_unauthorized = settings["gh_unauthorized"]
        editor = settings["editor"]
        return (project_path, version, gh_unauthorized, editor)