@echo off

set command=%1
set fn=%2
set app=%3
cd /d %~dp0


@REM If "%1"=="" if "%1" == "/?" if "%1" == "help" (
@REM     CALL :write_Help
@REM )

if "%1"=="create" (
    python create.py %fn% %app%
) else if "%1"=="remove" (
    python remove.py %fn% %app%
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
    python settings.py %command% %fn% %3
) else if "%1"=="aip" (
    start https://github.com/Smoqu/AIP
) else if "%1"=="repos" (
    python -c "from gh import repos_get; repos_get()"
) else if "%1"=="gh" (
    python -c "from settings import get_full_settings; print(get_full_settings()[2])"
) else if "%1"=="upgrade" (
    python upgrade.py %1
)


:: Doesn't work as expected

@REM :write_Help
@REM     echo.
@REM     echo Syntax: aip ^<command^>
@REM     echo.
@REM     echo Options: 
@REM     echo    ^<command^>     [^<settings^>, ^<create^>, ^<source^>]
@REM     echo.
@REM     echo    ^<create^>
@REM     echo        ^<name^>        Name of the project
@REM     echo        ^<application^> The kind of application (React, Flutter, Django, django-react...)
@REM     echo.
@REM EXIT /B 0