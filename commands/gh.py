from github import Github
from dotenv import load_dotenv, find_dotenv
import os
import sys
import github
import json
import requests

from .settings import execute_commands, settings_json


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

    def create_gist_fun():
        create_gist = input(
            "Would you like to create a secret gist for your settings.json ? (Y/n)\n")

        if create_gist == "" or create_gist.upper() == "Y" or create_gist.upper() == "YES":
            if os.path.exists(settings_json):
                with open(settings_json, "r") as read_file:
                    settings = json.load(read_file)
                    settings = json.dumps(settings, indent=2)

                user.create_gist(public=False, files={
                                 settings_json: github.InputFileContent(content=str(settings))})
                print(
                    "Get your Gist ID of the settings.json file and insert it inside the .env file")
                os.system("echo 'GIST=Gist ID' >> .env")
            else:
                res = requests.get(
                    f"https://api.github.com/gists/704d343e972375a215eb92b04ca75a5f")
                raw = res.json()["files"]["settings_template.json"]["raw_url"]
                text = requests.get(raw).text
                d = json.loads(text)

                with open(settings_json, "w") as write_file:
                    dump = json.dumps(d, indent=2)
                    write_file.write(dump)

                print("A settings.json file has been created")

                create_gist_fun()
        else:
            quit()

    if gist_id != None and os.path.exists(settings_json):
        gist = gh.get_gist(gist_id)
        with open(settings_json, "r") as read_file:
            settings = json.load(read_file)
            settings = json.dumps(settings, indent=2)

        gist.edit(
            files={settings_json: github.InputFileContent(content=str(settings))})
    else:
        print("Please input a 'GIST' parameter inside your .env\n Like so: GIST=gist id")

        create_gist_fun()


def get_json_settings() -> dict:
    """
    Gets the settings from the already created Gist
    """
    if gist_id != None:
        res = requests.get(f"https://api.github.com/gists/{gist_id}")
        raw = res.json()["files"][settings_json]["raw_url"]
        text = requests.get(raw).text
        data = text.replace("'", "\"")
        d = json.loads(data)
        return d
