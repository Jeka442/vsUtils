import * as vscode from "vscode";
import { randomIsraeliId } from "./randomIsraeliId";
import { example } from "./example";
import { insertFcTs } from "./insertFc";

export const commandsConfig = {
  ["vsutils.israelId"]: randomIsraeliId,
  ["vsutils.example"]: example,
  ["vsutils.fc-ts"]: insertFcTs,
} as const;

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
  for (let [cmd, func] of Object.entries(commandsConfig)) {
    let disposable = vscode.commands.registerCommand(cmd, func);
    context.subscriptions.push(disposable);
  }
}
