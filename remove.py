import os
import sys

import github
from settings import get_settings, _format_string
from shutil import rmtree
import stat
from github import Github
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

application = "default"

settings = (get_settings(application))
path = settings['project_path']
_dir = str



def handle_error(func, path_, exc_info):
    # print("Handling error for file", path_)
    # print(exc_info)

    if not os.access(path_, os.W_OK):
        os.chmod(path_, stat.S_IWUSR)
        func(path_)

def remove():
    try:
        token = os.getenv("TOKEN")
        user = Github(token).get_user()
        # login = user.login
        folder_name = str(sys.argv[1])
        _dir = _format_string(f"{path}/{folder_name}")
        repos = user.get_repos()
        # for repo in repos:
        #     print(repo.full_name, "is private: ", repo.private)
        try:
            ver = str(input(f"Are you sure you want to delete the folder {folder_name}? (Y/n)\n"))
            if ver.upper() == "Y" or ver.upper() == "YES":
                rmtree(_dir, onerror=handle_error)
                print(f"Your project folder {folder_name} has been successfully deleted")

        except FileNotFoundError:
            print("The folder has not been found in your projects folder.")
        
        try:
            repo = user.get_repo(folder_name)
            verification_string = f"Are you sure you want to delete this repository ({repo.full_name})? (Y/n)\n"
            verification = str(input(verification_string))
            if verification.upper() == "Y" or verification.upper() == "YES":
                repo.delete()
                print("Your repository has been successfully deleted.")
        
        except github.GithubException:
            print("Your repository has not been found")
    
    except KeyboardInterrupt:
        print("There are no guarantees that your project or your GitHub repository has not been deleted. Would be wise to check.")


if len(sys.argv) > 1:
    print("/!\ Warning ! This is a harmful command! /!\\")
    remove()


