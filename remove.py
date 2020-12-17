from gh import repo_delete
import os
import sys

from settings import get_settings, _format_string
from shutil import rmtree
import stat


def handle_error(func, path_, exc_info):  
    if not os.access(path_, os.W_OK):
        os.chmod(path_, stat.S_IWUSR)
        func(path_)

    elif exc_info[0].__name__ != "PermissionError":
        print(f"Your project folder @ {path_} has been successfully deleted")
    else:
        print(exc_info[1])


def remove():
    try:
        _dir = str
        foldername = str(sys.argv[1])

        application = "default"

        settings = (get_settings(application))
        path = settings['project_path']
        path_application = str

        if len(sys.argv) > 2:
            application = str(sys.argv[2])
            settings = (get_settings(application))
            path = settings['project_path']
            path_application = settings['path']

        if application == "default":
            _dir = _format_string(f"{path}/{foldername}")
        else:
            _dir = _format_string(f"{path}/{path_application}/{foldername}")

        print(_dir)

        try:
            ver = str(input(f"Are you sure you want to delete the folder {foldername}? (Y/n)\n"))
            if ver.upper() == "Y" or ver.upper() == "YES":
                rmtree(_dir, onerror=handle_error)

        except FileNotFoundError:
            print("The folder has not been found in your projects folder.")
        

        repo_delete(foldername)
    
    except KeyboardInterrupt:
        print("There are no guarantees that your project or your GitHub repository has not been deleted. Would be wise to check.")


if len(sys.argv) > 1:
    print("/!\ Warning ! This is a harmful command! /!\\")
    remove()


