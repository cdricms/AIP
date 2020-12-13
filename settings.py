import json
import os
import subprocess

def open_settings():
    os.system(".\\settings.json")    


settings_json = "settings.json"


def get_version():
    with open(settings_json, 'r') as read_file:
        settings = json.load(read_file)
        return settings["version"]


def open_project_folder():
    with open(settings_json, 'r',) as read_file:
        settings = json.load(read_file)
        project_path = "\\".join(settings["project_path"].split("/"))
        os.system(f'explorer {project_path} ')


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
