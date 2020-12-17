from github import Github
from dotenv import load_dotenv, find_dotenv
import os
import sys
import github

from settings import execute_commands


load_dotenv(find_dotenv())
token = os.getenv("TOKEN")
user = Github(token).get_user()
login = user.login

def repo_create(foldername, private):
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


def repo_delete(foldername):
    try:
        repo = user.get_repo(foldername)
        verification_string = f"Are you sure you want to delete this repository ({repo.full_name})? (Y/n)\n"
        verification = str(input(verification_string))
        if verification.upper() == "Y" or verification.upper() == "YES":
            repo.delete()
            print("Your repository has been successfully deleted.")
        
    except github.GithubException:
        print("Your repository has not been found")


def repos_get():
    repos = user.get_repos()
    for repo in repos:
        print(f"{repo.name}, Private: {repo.private}")