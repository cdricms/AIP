import os
import sys
from settings import get_full_settings, format_string, get_app_settings


def open():
    foldername = str(sys.argv[1])

    application = "default"

    path, editor = get_full_settings()[0], get_full_settings()[3]
    
    path_application = str

    if len(sys.argv) > 2:
        application = str(sys.argv[2])
        settings = get_app_settings(application)
        path_application = settings['path']

    if application == "default":
        _dir = format_string(f"{path}/{foldername}")
    else:
        _dir = format_string(f"{path}/{path_application}/{foldername}")

    print("The project folder you are trying to open is:\n", _dir)

    if os.path.exists(_dir):
        os.system(f"{editor} {_dir}")
    else:
        print("The project you are looking for does not exist")
    

if len(sys.argv) > 1:
    open()    
