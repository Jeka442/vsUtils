import * as vscode from "vscode";
import {
  registerAutomations,
  registerCommandHandler,
} from "./commands/configuration";
import { registerSidebarProvider } from "./sidebar/sidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  registerCommandHandler(context);
  registerSidebarProvider(context);
  registerAutomations(context);
}

export function deactivate() {}
