import * as vscode from "vscode";
import { registerCommandHandler } from "./commands/configuration";
import { registerSidebarProvider } from "./sidebar/sidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  registerCommandHandler(context);
  registerSidebarProvider(context);
}

export function deactivate() {}
