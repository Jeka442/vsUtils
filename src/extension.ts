import * as vscode from "vscode";
import {
  registerAutomations,
  registerCommandHandler,
  registerExtractToFile,
} from "./commands/configuration";
import { registerSidebarProvider } from "./sidebar/sidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  registerCommandHandler(context);
  registerSidebarProvider(context);
  registerAutomations(context);
  registerExtractToFile(context);
}

export function deactivate() {}
