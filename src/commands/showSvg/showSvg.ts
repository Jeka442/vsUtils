import path from "path";
import * as vscode from "vscode";

let panel: vscode.WebviewPanel | null = null;
export const showSvg = async (context?: vscode.ExtensionContext) => {
  if (!context) return;
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const text = document.getText();

    // Only proceed if it's an SVG file
    if (document.languageId === "xml" && document.fileName.endsWith(".svg")) {
      if (!panel)
        panel = vscode.window.createWebviewPanel(
          "svgPreview",
          "SVG Preview",
          vscode.ViewColumn.Beside,
          {}
        );
      panel.webview.html = await getWebviewContent(context, text);
      panel.onDidDispose(() => {
        panel = null;
      });
    } else {
      return vscode.window.showInformationMessage("Not an SVG file.");
    }
  } else {
    vscode.window.showInformationMessage("No active editor.");
  }
};

let currentPanel: vscode.WebviewPanel | null = null;
export async function showSvgByText(
  context: vscode.ExtensionContext,
  text: string,
) {
  if (!currentPanel)
    currentPanel = vscode.window.createWebviewPanel(
      "svgPreview",
      "SVG Preview",
      { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
      {}
    );
  currentPanel.webview.html = await getWebviewContent(context, text);

  currentPanel.onDidDispose(() => {
    currentPanel = null;
  });
}

async function getWebviewContent(
  context: vscode.ExtensionContext,
  svgContent: string
) {
  const filePath = vscode.Uri.file(
    path.join(context.extensionPath, "src", "commands", "showSvg", "view.html")
  );
  const content = await vscode.workspace.fs.readFile(filePath);

  let html = content.toString();
  html = html.replace("{{svgContent}}", svgContent);
  return html;
}
