import * as vscode from "vscode";
import { registerCommandHandler } from "./commands/command";
import { registerWebViewProvider } from "./sidebar/sidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  registerCommandHandler(context);
  registerWebViewProvider(context);
}

export function deactivate() {}
