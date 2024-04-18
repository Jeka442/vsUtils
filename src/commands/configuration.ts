import * as vscode from "vscode";
import { randomIsraeliId } from "./randomIsraeliId";
import { chucknorrisJokes } from "./example";
import { vsColorTheme } from "./vsColorTheme";
import { showRegexTester } from "./showRegexTester";

interface IActionConfig {
  title: string;
  items: { command: string; callback: () => void; name: string }[];
}

export const actionConfigurations: IActionConfig[] = [
  {
    title: "Generators",
    items: [
      {
        command: "vsutils.israelId",
        callback: randomIsraeliId,
        name: "Israel id",
      },
    ],
  },
  {
    title: "Utils",
    items: [
      {
        command: "vsutils.regexTester",
        callback: showRegexTester,
        name: "Regex tester",
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        command: "vsutils.changeColorTheme",
        callback: vsColorTheme,
        name: "Change theme",
      },
      {
        command: "vsutils.chucknorrisJokes",
        callback: chucknorrisJokes,
        name: "Chuck norris",
      },
    ],
  },
] as const;

/**
 * Registers commands specified in the commandsConfig object. This function ensures that each command
 * defined in the commandsConfig is registered within the VS Code extension context. The command keys
 * in commandsConfig must match those declared in the package.json to function correctly.
 *
 * @function registerCommandHandler
 * @param {vscode.ExtensionContext} context - The extension context provided by the activate function.
 * @returns {void} This function does not return a value; it registers each command with VS Code.
 */
export function registerCommandHandler(context: vscode.ExtensionContext) {
  for (let commandsConfig of actionConfigurations) {
    for (let item of commandsConfig.items) {
      let disposable = vscode.commands.registerCommand(
        item.command,
        item.callback
      );
      context.subscriptions.push(disposable);
    }
  }
}
