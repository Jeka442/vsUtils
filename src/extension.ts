import * as vscode from "vscode";
import { registerCommandHandler } from "./commands/command";

export function activate(context: vscode.ExtensionContext) {
  registerCommandHandler(context);
}

export function deactivate() {}
