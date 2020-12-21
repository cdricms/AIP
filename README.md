## Only available on Windows (for now), works on bash.

### setup:

```bash
git clone "https://github.com/Smoqu/AIP"
cd AIP
touch .env
```

#### .env

```txt
TOKEN=GitHub token
```

```bash
pip install -r requirements.txt

Add path to the folder in enviroment variables:
"...\AIP" folder directory to path
```

### Usage:

#### Changes too much

```bash
Command to run the program type


Syntax:
'aip <command>'
'<command>'
     Commands:
        '<create> <foldername> (<application>)'
            '=> creates a folder inside the projects directory; once done opens it directly on your editor. (can also push on GitHub)'
        '<remove> <foldername> (<application>)'
            '=> removes a folder inside the projects directory; can also remove on GitHub.'
        '<settings>'
            'opens the settings in your editor'
        '<source>'
            'opens the source code in your editor'
        '<-v>'
            'the version of aip'
        '<pf>'
            'opens the main project folder'
            '<-l>'
                'lists all your projects directories inside the main folder'
            '<application> (<-l>)'
                "opens the application's folder"
            '<aip>'
                'opens the AIP GitHub repository'
            '<repos>'
                'lists all your repositories'
            '<gh>'
                'lists all the applications unauthorized to push on GitHub'
            '<upgrade>'
```

### Original authors:

- [Kalle Hallden](https://github.com/KalleHallden)
- [gremi-jr](https://github.com/gremi-jr)
