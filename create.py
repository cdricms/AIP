import sys
import os
from github import Github
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

foldername = ""
path_application = ""
application = "-D"

if (len(sys.argv) > 1):
    foldername = str(sys.argv[1])
    if len(sys.argv) >= 3:
        application = str(sys.argv[2])
        if application == "flutter":
            path_application = os.getenv("FLUTTER")
        elif application == "react":
            path_application = os.getenv("REACT")
        elif application == "django-react":
            path_application = os.getenv("DJANGO-REACT")

    do_push_on_gh = False
    if application != "react" and application != "django-react":
        upload_on_gh = str(input("Create repository? (Y/n)\n"))
        is_private = bool
        if (upload_on_gh.upper() == "Y" or upload_on_gh.upper() == "YES"):
            do_push_on_gh = True
            visibility = str(input("Public or private\n"))
            if visibility.upper() == "PUBLIC":
                is_private = False
            elif visibility.upper() == "PRIVATE":
                is_private = True

    path = os.getenv("FILEPATH")
    token = os.getenv("TOKEN")

    if path_application == "":
        _dir = f"{path}/{foldername}"
    else:
        _dir = f"{path}/{path_application}/{foldername}"

    def create():
        os.mkdir(_dir)
        os.chdir(_dir)
        if (path_application != "-D"):
            os.system(f'echo =========={application.upper()}========== ')
            if application == "flutter":
                os.system(f"flutter create .")
            elif application == "react":
                os.system(f"npx create-react-app .")
            elif application == "django-react":
                packages = ["Django", "django-cors-headers", "djangorestframework"]
                os.chdir(_dir)
                os.system("virtualenv env")
                os.system("touch requirements.txt")
                for package in packages:
                    os.system(f"echo {package} >> requirements.txt")
                



        if do_push_on_gh:
            user = Github(token).get_user()
            login = user.login
            repo = user.create_repo(foldername, private=is_private)
            commands = [f'echo # {repo.name} >> README.md',
                'git init',
                f'git remote add origin https://github.com/{login}/{foldername}.git',
                'git add .',
                'git commit -m "Initial commit"',
                'git push -u origin master']
            
            for command in commands:
                os.system(command)

            os.system(f"echo {foldername} commited @ {f'https://github.com/{login}/{repo.name}'}")

        print(f'{foldername} created locally @ {_dir} ')
        os.system('code .')



    if __name__ == "__main__":
        create()