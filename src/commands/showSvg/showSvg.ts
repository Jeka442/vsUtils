import path from "path";
import * as vscode from "vscode";
export const showSvg = async (context?: vscode.ExtensionContext) => {
  if (!context) return;
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const text = document.getText();

    // Only proceed if it's an SVG file
    if (document.languageId === "xml" && document.fileName.endsWith(".svg")) {
      const panel = vscode.window.createWebviewPanel(
        "svgPreview",
        "SVG Preview",
        vscode.ViewColumn.Beside,
        {}
      );
      panel.webview.html = await getWebviewContent(context, text);
    } else {
      return vscode.window.showInformationMessage("Not an SVG file.");
    }
  } else {
    vscode.window.showInformationMessage("No active editor.");
  }
};

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
