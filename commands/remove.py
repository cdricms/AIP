
from commands.settings import format_string, get_app_settings, get_full_settings
import os
from shutil import rmtree
import stat
import sys
from .gh import repo_delete


def handle_error(func, path_, exc_info):
    if not os.access(path_, os.W_OK):
        os.chmod(path_, stat.S_IWUSR)
        func(path_)


def remove(foldername: str, application: str):
    try:
        _dir = str

        settings = (get_app_settings(application))
        path = get_full_settings()[0]

        if application == "default":
            _dir = format_string(f"{path}/{foldername}")
        else:
            settings = get_app_settings(application)
            path_application = settings['path']

            _dir = format_string(f"{path}/{path_application}/{foldername}")

        print(_dir)

        try:
            ver = str(
                input(f"Are you sure you want to delete the folder {foldername}? (Y/n)\n"))
            if ver.upper() == "Y" or ver.upper() == "YES":
                rmtree(_dir, onerror=handle_error)
                if not os.path.exists(_dir):
                    print(
                        "Your project has been successfully deleted from your computer.")

        except FileNotFoundError:
            print("The folder has not been found in your projects folder.")

        repo_delete(foldername)

    except KeyboardInterrupt:
        print("There are no guarantees that your project or your GitHub repository has not been deleted. Would be wise to check.")
