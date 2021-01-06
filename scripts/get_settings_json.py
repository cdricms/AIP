import json
from gh import get_json_settings
import os
import json

settings_path = "settings.json"

def create_settings():
    settings = get_json_settings()
    if os.path.exists(settings_path):
        want_replace = input("settings.json already exists, would you like to replace it? (y/N)\n")
        if want_replace == "" or want_replace.upper() == "N" or want_replace.upper() == "NO":
            print("Your file has note been replaced!")
            quit()
        elif want_replace.upper() == "Y" or want_replace.upper() == "YES":
            os.remove(settings_path)
            with open(settings_path, "w") as write_file:
                dump = json.dumps(settings, indent=2)
                write_file.write(dump)

    else:
        with open(settings_path, "w") as write_file:
                dump = json.dumps(settings, indent=2)
                write_file.write(dump)
        
        print("The file has been created with your settings.")


if __name__ == "__main__":
    create_settings()