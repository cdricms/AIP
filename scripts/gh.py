from github import Github
from dotenv import load_dotenv, find_dotenv
import os
import sys
import github
import json
import requests

from settings import execute_commands


load_dotenv(find_dotenv())
token, gist_id = os.getenv("TOKEN"), os.getenv("GIST")
gh = Github(token)
user = gh.get_user()
login = user.login


def repo_create(foldername: str, private: bool) -> None:
    """
    Creates a GitHub repository
    
    :param foldername: str
    :param private: bool
    """
    repo = user.create_repo(foldername, private=private)
    commands = [f'echo # {repo.name} >> README.md',
        'git init',
        f'git remote add origin https://github.com/{login}/{foldername}.git',
        'git add .',
        'git commit -m "Initial commit"',
        'git push -u origin master']
                
    execute_commands(commands)

    link = f"https://github.com/{login}/{repo.name}"
    os.system(f"echo {foldername} commited @ {link}")


def repo_delete(foldername: str) -> None:
    """
    Deletes a GitHub repository
    
    :param foldername: str
    """
    try:
        repo = user.get_repo(foldername)
        verification_string = f"[GITHUB]:\nAre you sure you want to delete this repository ({repo.full_name})? (Y/n)\n"
        verification = str(input(verification_string))
        if verification.upper() == "Y" or verification.upper() == "YES":
            repo.delete()
            print("[GITHUB]: Your repository has been successfully deleted.")
        
    except github.GithubException:
        print("[GITHUB]: Your repository has not been found")


def repos_get() -> None:
    """
    Gets all the GitHub repository
    """
    repos = user.get_repos()
    for repo in repos:
        print(f"{repo.name}, Private: {repo.private}")


def backup() -> None:
    """
    Backs up the settings.json file to a personal gist
    """
    if gist_id != None:
        gist = gh.get_gist(gist_id)
        with open("settings.json", "r") as read_file:
            settings = json.load(read_file)
            settings = json.dumps(settings, indent=2)

        gist.edit(files={'settings.json': github.InputFileContent(content=str(settings))})
    else:
        print("Please input a 'GIST' parameter inside your .env\n Like so: GIST=gist id")
        

def get_json_settings() -> dict:
    """
    Gets the settings from the already created Gist
    """
    if gist_id != None:
        res = requests.get(f"https://api.github.com/gists/{gist_id}")
        raw = res.json()["files"]["settings.json"]["raw_url"]
        text = requests.get(raw).text
        data = text.replace("'", "\"")
        d = json.loads(data)
        return d
