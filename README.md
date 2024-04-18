# vsutils vscode extension

vscode utils extension

## Installation (localy)

Please follow those steps to install the project as a vscode extension locally

- install package vsce - `npm install -g @vscode/vsce`
- run the command `vsce package`
- change the zip file name to _extension.vsix_
- run `code --install-extension extension.vsix`, the command will create vsutils-VERSION.vsix file
- install it via vscode or the command `code --install-extension vsutils-VERSION.vsix`

## Features

`>vsutils.israelId`
generates valid israel id and copies to clipboard

`>vsutils.regexTester`
open a window with regex tester

`>vsutils.chucknorrisJokes`
calls an api and display a chuck norris joke

`>vsutils.changeColorTheme`
change the workspace color theme

## Requirements

vscode v-1.88 or higher

## Guidelines

To register a new command please follow those steps:

- Register new command in package.json file with category
- Add new file in src/commands with the function
- Update the configuration in src/commands/configuration (actionConfigurations)
- NOTE: "command" key has to be the same as registered inside package.json
- Update the readme file

## Sidebar

To add a new button the the sidebar update the html inside src/sidebar/sidebar.html

Note: command function accept the command from the package.json

## Known bugs

- vsce package creates a vsix file, there is an error after installing the package and try to run it

To install the package, copy the content of the project to "extension" folder, zip it, change the .zip to .vsix and proceed
