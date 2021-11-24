# Electron Task Manager

## 🔑 Initialize a project and implement provision working installation packages for several platforms.

1. Install npm packages using "yarn"

2. Then install globally by doing this "npm install -g electron-packager"

- node build.js

- Run command prompt as administrator and run commands as following accrording to the platforms

✔ Windows

 electron-packager [path] --platform=win32 --arch=x64 myapp-source-built


✔ MacOS

electron-packager [path] --platform=darwin --arch=x64 myapp-source-built


✔ Linux

 electron-packager [path] --platform=linux --arch=x64 myapp-source-built


## 🔑 Set up a TODO project for development mode
1. npm install --save-dev electron-rebuild
2. npm install sqlite3 --save
3. ./node_modules/.bin/electron-rebuild  -f -w sqlite3
If not working please open powershell as admin and enter 'npm install -g windows-build-tools'

## 🔑 Make keyboard shortcuts for managing tasks such as CREATE, EDIT, DELETE, TOGGLE COMPLETED, MOVE UP, MOVE DOWN


## 🔑 Connection with SQlite
