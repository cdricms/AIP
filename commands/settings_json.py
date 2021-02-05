import json
from .gh import get_json_settings
import os
import json

settings_path = "settings.json"


def get_settings():
    settings = get_json_settings()
    if os.path.exists(settings_path):
        want_replace = input(
            "settings.json already exists, would you like to replace it? (y/N)\n")
        if (want_replace.upper() == "Y" or want_replace.upper() == "YES"):
            os.remove(settings_path)
        else:
            print("Your file has note been replaced!")
            quit()

    with open(settings_path, "w") as write_file:
        dump = json.dumps(settings, indent=2)
        write_file.write(dump)

    print("The file has been created with your settings.")