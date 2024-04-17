import path from "path";
import * as vscode from "vscode";

export function registerSidebarProvider(context: vscode.ExtensionContext) {
  const provider = new SidebarProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vsutils-sidebar", provider)
  );
}

class SidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _context: vscode.ExtensionContext) {}
  view?: vscode.WebviewView;
  context?: vscode.ExtensionContext;

  async resolveWebviewView(webviewView: vscode.WebviewView) {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,

      localResourceRoots: [this._context.extensionUri],
    };

    webviewView.webview.html = await this._getHtmlForWebview(this._context);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.message) {
        case "command": {
          await vscode.commands.executeCommand(data.value);
          break;
        }
      }
    });
  }

  async _getHtmlForWebview(context: vscode.ExtensionContext) {
    const filePath = vscode.Uri.file(
      path.join(context.extensionPath, "src", "sidebar", "sidebar.html")
    );
    const content = await vscode.workspace.fs.readFile(filePath);
    let html = content.toString();
    const customCommands = await vscode.workspace
      .getConfiguration()
      .get<{ command: string; name: string }[]>("vsutil.customCommands");
    if (customCommands && customCommands.length > 0) {
      let customCommandHtml = `<div style="width:100%"> <h2>Custom</h2>`;
      for (let command of customCommands) {
        customCommandHtml += `<button onclick="command('${command.command}')">${command.name}</button>`;
      }
      customCommandHtml += "</div>";
      html = html.replace(
        "<!--custom-command-placeholder-->",
        customCommandHtml
      );
    }
    return html;
  }
}
