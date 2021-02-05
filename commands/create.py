from commands.gh import repo_create
from commands.settings import execute_commands, format_string, get_app_settings, get_full_settings
import os


def create(foldername: str, application: str):
    settings = get_full_settings()
    gh_unauthorized = settings[2]
    project_folder = settings[0]

    init = False
    is_private = bool
    if application not in gh_unauthorized:
        upload_on_gh = str(input("Create repository? (Y/n)\n"))
        if (upload_on_gh.upper() == "Y" or upload_on_gh.upper() == "YES"):
            init = True
            visibility = str(input("Public or private\n"))
            if visibility.upper() == "PUBLIC":
                is_private = False
            elif visibility.upper() == "PRIVATE":
                is_private = True

    if application != "default":
        app_settings = get_app_settings(application)['path']
        _dir = format_string(f"{project_folder}/{app_settings}/{foldername}")
    else:
        _dir = format_string(f"{project_folder}/{foldername}")

    try:
        os.mkdir(_dir)
        editor = settings[3]
        os.chdir(_dir)
        print(os.getcwd())

        if (application != "default"):
            print(f'=========={application.upper()}==========')
            if application == settings["application"]:
              # TODO: add the package.json posibility with both npm and yarn
                if len(settings['packages']) > 0 and settings['package_origin'] == "requirements.txt":
                    for package in settings['packages']:
                        os.system(f"echo {package} >> requirements.txt")

                    execute_commands(settings["commands"])

        if init:
            try:
                repo_create(foldername, is_private)
            except:
                print("error")

        print(f'{foldername} created locally @ {_dir} ')
        os.system(f'{editor} .')

    except KeyboardInterrupt:
        print("You aborted")

    except FileExistsError:
        print("This folder already exists...")
