@echo off

set command=%1
set fn=%2
set app=%3
cd /d %~dp0


If "%1"=="" if "%1" == "/?" if "%1" == "help" (
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

if "%1"=="create" (
    python create.py %fn% %app%
) else if "%1"=="settings" (
    echo.
    echo ^>^>^> Opening settings
    .\settings.json
) else if "%1"=="source" (
    echo.
    echo ^>^>^> Opening source code in VSCode
    code .\
) else if "%1"=="-v" (
    echo Version:
    python settings.py %command%
) else if "%1"=="pf" (
    python settings.py %command% %fn%
)




EXIT /B 0

