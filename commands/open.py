import os
from .settings import get_full_settings, format_string, get_app_settings


def open_project(foldername: str, application: str):

    path, editor = get_full_settings()[0], get_full_settings()[3]

    path_application = str

    settings = get_app_settings(application)

    if application == "default":
        _dir = format_string(f"{path}/{foldername}")
    else:
        path_application = settings['path']
        _dir = format_string(f"{path}/{path_application}/{foldername}")

    print("The project folder you are trying to open is:\n", _dir)

    if os.path.exists(_dir):
        os.system(f"{editor} {_dir}")
    else:
        print("The project you are looking for does not exist")
