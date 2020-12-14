import os
import sys
import settings

application = "default"

settings = (settings.get_settings(application))
path = settings['project_path']
_dir = str

if len(sys.argv) > 1:
    folder_name = str(sys.argv[1])
    _dir = f"{path}{folder_name}"
    print(_dir)

