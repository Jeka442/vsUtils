# vsutils vscode extension

vscode utils extension

## Installation (localy)
Please follow those steps to install the project as a vscode extension locally
* install package vsce - `npm install -g @vscode/vsce`
* run the command `vsce package`
* change the zip file name to *extension.vsix*
* run `code --install-extension extension.vsix`, the command will create vsutils-VERSION.vsix file
* install it via vscode or the command `code --install-extension vsutils-VERSION.vsix`

## Features

`>util.generate: generate israel Id`
generates valid israel id and copies to clipboard

`>>util.example: example`
example of a registered command that show an information popup

`>util.generate: insert react fc with interface`
Place new component in the active text editor

## Requirements

vscode v-1.88 or higher



## Guidelines

To register a new command please follow those steps:
* Register new command in package.json file with category
* Add new file in src/commands with the function
* Register the function in commandsConfig inside src/commands/comman.ts file
* NOTE: commandsConfig keys are the commands registered inside the package.json file and the values are the function
* Update the readme file


## Sidebar

To add a new button the the sidebar update the html inside src/sidebar/sidebar.html

Note: command function accept the command from the package.json


