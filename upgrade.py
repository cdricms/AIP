import requests
import urllib
import zipfile
import os
import re
import shutil
import sys


version = sys.version_info
if version.major == 3 and version.minor >= 7:
    try:
        response = requests.get("https://api.github.com/repos/Smoqu/AIP/releases/latest")
        url = response.json()["zipball_url"]
        aip_version = response.json()["tag_name"]

        urllib.request.urlretrieve(url, "aip.zip")

        with zipfile.ZipFile("./aip.zip", 'r') as zip_ref:
            aip_folder = zip_ref.namelist()[0]
            zip_ref.extractall("./")

        DO_NOT_REMOVE = ["settings.json", ".env"]
        dirs = os.listdir("./")
        for dir in dirs:
            if dir not in DO_NOT_REMOVE:
                os.remove(dir)


        folder_name = str

        for dir in dirs:
            match = re.search("Smoqu-AIP-\w+", dir)
            if match:
                folder_name = match.group(0)
                break


        files = os.listdir(f"./{folder_name}")
        for file in files:
            if file == "settings.json":
                os.rename(file, "new-settings.json")

            shutil.move(f"./{folder_name}/{file}", "./")

        os.rmdir(folder_name)
        os.remove("aip.zip")
        os.remove(".gitignore")

        os.system("pip install -r requirements.txt -U")

    except:
        print("An issue occured!")

else:
    print("Python version less than 3.7.x or not supported, you can create a virtual environment to fix this issue or use te correct version.")

