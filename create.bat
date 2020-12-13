@echo off

set fn=%1
set app=%2
cd /d %~dp0



If "%1"=="" if "%1" == "/?" if "%1" == "/help" (
    goto:write_Help
) else (
    goto:write_Help
)


python create.py %fn% %app%

cd "%mp%\%fn%"

:write_Help
    echo.
    echo Syntax: create ^<name^> ^<application^>
    echo.
    echo Options: 
    echo    ^<name^>        Name of the project
    echo    ^<application^> The kind of application (React, Flutter...)
    echo.
EXIT /B 0

