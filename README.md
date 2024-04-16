# vsutils vscode extension

vscode utils extension

## Installation (localy)
Please follow those steps to install the project as a vscode extension locally
* Download the project and install dependencies ( npm i )
* Zip the project ( the zip file must be extension/...)
* change the zip file name to *extension.vsix*
* run `code --install-extension extension.vsix`

## Features

`>util.generate: generate israel id`
generates valid israel id and copies to clipboard

`>>util.example: example`
example of a registered command that show an information popup

## Requirements

vscode v-1.88 or higher


## Guidelines

To register a new command please follow those steps:
* Register new command in package.json file with category
* Add new file in src/commands with the function
* Register the function in commandsConfig inside src/commands/comman.ts file
* NOTE: commandsConfig keys are the commands registered inside the package.json file and the values are the function
* Update the readme file


