import sys
import os
from settings import get_full_settings, get_app_settings, execute_commands
from gh import repo_create


foldername = ""
path_application = ""
application = "default"

settings = get_app_settings(application)
path = get_full_settings()[0]


try:
    if (len(sys.argv) > 1):
        foldername = str(sys.argv[1])
        gh_unauthorized = get_full_settings()[2]
        if len(sys.argv) >= 3:
            application = str(sys.argv[2])
            settings = get_app_settings(application)
            if application == settings["application"]:
                path_application = settings["path"]


        do_push_on_gh = False
        if application not in gh_unauthorized:
            upload_on_gh = str(input("Create repository? (Y/n)\n"))
            is_private = bool
            if (upload_on_gh.upper() == "Y" or upload_on_gh.upper() == "YES"):
                do_push_on_gh = True
                visibility = str(input("Public or private\n"))
                if visibility.upper() == "PUBLIC":
                    is_private = False
                elif visibility.upper() == "PRIVATE":
                    is_private = True


        if path_application == "":
            _dir = f"{path}/{foldername}"
        else:
            _dir = f"{path}/{path_application}/{foldername}"

        def create():
            os.mkdir(_dir)
            editor = get_full_settings()[3]
            os.chdir(_dir)
            if (application != "default"):
                print(f'=========={application.upper()}========== ')
                if application == settings["application"]:                    
                    if len(settings['packages']) > 0 and settings['package_origin'] == "requirements.txt":
                        for package in settings['packages']:
                            os.system(f"echo {package} >> requirements.txt")

                    execute_commands(settings["commands"])
                    

            if do_push_on_gh:
                repo_create(foldername, is_private)
                
            print(f'{foldername} created locally @ {_dir} ')
            os.system(f'{editor} .')

        if __name__ == "__main__":
            create()

except KeyboardInterrupt:
    print("\nBOUYA")
