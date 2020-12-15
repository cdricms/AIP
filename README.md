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


'aip <command>'
'<command>'
  - create <foldername> (<application>) => creates a project, and can push on GitHub
  - remove <foldername> (<application>) => deletes a project, (and can delete on GitHub, not yet available)
  - -v => returns the version of the cli
  - pf => opens the main projects folder
    - -l => returns all the directories of the projects folder in the terminal.
  - source => opens the source code in VSCode
  - settings => opens the settings.json file
```

### Original authors:

- [Kalle Hallden](https://github.com/KalleHallden)
- [gremi-jr](https://github.com/gremi-jr)
