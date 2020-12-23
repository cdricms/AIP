@echo off

set command=%1
set fn=%2
set app=%3
cd /d %~dp0


if "%1"=="create" (
    py scripts/create.py %fn% %app%
) else if "%1"=="remove" (
    py scripts/remove.py %fn% %app%
) else if "%1"=="settings" (
    echo.
    echo ^>^>^> Opening settings
    .\settings.json
) else if "%1"=="source" (
    echo.
    echo ^>^>^> Opening source code in VSCode
    REM can be changed to whatever editor you are using.
    code .\ 
) else if "%1"=="-v" (
    echo Version:
    py scripts/settings.py %command%
) else if "%1"=="pf" (
    py scripts/settings.py %command% %fn% %3
) else if "%1"=="aip" (
    start https://github.com/Smoqu/AIP
) else if "%1"=="repos" (
    py -c "from scripts.gh import repos_get; repos_get()"
) else if "%1"=="gh" (
    py -c "from scripts.settings import get_full_settings; print(get_full_settings()[2])"
) else if "%1"=="upgrade" (
    py scripts/upgrade.py %1
) else (
    echo.
    echo Syntax:
    echo aip ^<command^>
    echo Commands:
    echo    ^<create^> ^<foldername^> (^<application^>^)
    echo        =^> creates a folder inside the projects directory; once done opens it directly on your editor. (can also push on GitHub^)
    echo    ^<remove^> ^<foldername^> (^<application^>^)
    echo        =^> removes a folder inside the projects directory; can also remove on GitHub.
    echo    ^<settings^>
    echo        opens the settings in your editor
    echo    ^<source^>
    echo        opens the source code in your editor
    echo    ^< -v^>
    echo        the version of aip
    echo    ^<pf^>
    echo        opens the main project folder
    echo        ^< -l^>
    echo            lists all your projects directories inside the main folder
    echo        ^<application^> (^< -l^>^)
    echo            opens the application's folder
    echo        ^<aip^>
    echo            opens the AIP GitHub repository
    echo        ^<repos^>
    echo            lists all your repositories
    echo        ^<gh^>
    echo            lists all the applications unauthorized to push on GitHub
    echo        ^<upgrade^>
    echo.     
)
