import requests
import urllib
import zipfile
import os
import re
import shutil
import sys
import json

os_platform = sys.platform
version = sys.version_info

if version.major == 3 and version.minor >= 7:
        response = requests.get("https://api.github.com/repos/Smoqu/AIP/releases/latest")
        url = response.json()["zipball_url"]
        aip_version = response.json()["tag_name"]

        settings_template = {
            "project_path": "The path of your main projects directory, ex: 'D:/.../'",
            "applications": [
                {
                    "application": "name of the application (like react or flutter...)",
                    "commands": ["ex: 'yarn create react-app .'", ""],
                    "path": "path of the application folder, like: 'React' (will be found in 'project_path/path')",
                    "package_origin": "ex: 'package.json'",
                    "packages": ["ex: 'uuid'", "ex: 'whatever'"]
                }
            ],
            "version": aip_version,
            "gh_unauthorized": [],
            "editor": "Your favourite editor"
        }
        
        gitignore = ".gitignore"

        if os.path.exists("README.md"):
            os.remove("README.md")
		
        if os.path.exists(gitignore):
            os.remove(gitignore)

        urllib.request.urlretrieve(url, "aip.zip")

        with zipfile.ZipFile("./aip.zip", 'r') as zip_ref:
            aip_folder = zip_ref.namelist()[0]
            zip_ref.extractall("./")

        # print(sys.path[0])
        folder_name = str

        dirs = os.listdir("./")
        for dir in dirs:
            match = re.search("Smoqu-AIP-\w+", dir)
            if match:
                folder_name = match.group(0)
                break

        print(folder_name)

        files = os.listdir(f"./{folder_name}")
        for file in files:
            if file != "scripts":
                shutil.move(f"./{folder_name}/{file}", "./")
        
        shutil.move(f"./{folder_name}/scripts", "./")


        os.rmdir(folder_name)
        os.remove("aip.zip")
        os.remove(gitignore)

        if os_platform == "win32":
            os.remove("aip-linux")
        else:
            os.remove("aip")
            os.remove("aip.bat")
            os.rename("aip-linux", "aip")

        os.system("touch .env")
        os.system("echo TOKEN=GitHub token (must have repo and delete_repo enabled) >> .env")

        with open("settings.json", "w") as write_file:
            settings = json.dumps(settings_template, indent=2)
            write_file.write(settings)

        os.system("pip install -r requirements.txt -U")

        if os_platform == "win32":
            input(f"Add {os.getcwd()} in your Environment Varibales > PATH")
        elif os_platform == "linux":
            os.system("chmod +x aip")

            if os.path.exists("/usr/bin/aip"):
                print("aip already exists in /usr/bin; We need to remove it.")
                os.system("sudo rm /usr/bin/aip")
                
            print("Move aip file inside /usr/bin, for this we need authorization, if you wish you can do it manualy => Ctrl C")
            os.system("sudo mv ./aip /usr/bin")



else:
    print("Python version less than 3.7.x or not supported, you can create a virtual environment to fix this issue or use te correct version.")
    
