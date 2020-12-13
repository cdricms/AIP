@echo off

set command=%1
set fn=%2
set app=%3
cd /d %~dp0

if "%1"=="create" (
    python create.py %fn% %app%
) else if "%1"=="settings" (
    echo.
    echo ^>^>^> Opening settings in VSCode
    .\settings.json
) else if "%1"=="source" (
    echo.
    echo ^>^>^> Opening source code in VSCode
    code .\
) else if "%1"=="-v" (
    echo Version:
    python -c "from settings import get_version; print(get_version())"    
) else if "%1"=="projects-folder" (
    python -c "from settings import open_project_folder; open_project_folder()"    
)

If "%1"=="" if "%1" == "/?" if "%1" == "/help" (
    :write_Help
    echo.
    echo Syntax: aip ^<command^>
    echo.
    echo Options: 
    echo    ^<command^>     [^<settings^>, ^<create^>, ^<source^>]
    echo.
    echo    ^<create^>
    echo        ^<name^>        Name of the project
    echo        ^<application^> The kind of application (React, Flutter, Django, django-react...)
    echo.
)


EXIT /B 0

