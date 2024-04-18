import path from "path";
import * as vscode from "vscode";
export const showDocsGeneratorts = async (
  context?: vscode.ExtensionContext
) => {
  const panel = vscode.window.createWebviewPanel(
    "DocGeneratorWebview",
    "Documentation generator",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );

  if(!context)return;
  panel.webview.html = await getWebviewContent(context);
};
async function getWebviewContent(context: vscode.ExtensionContext) {
  const filePath = vscode.Uri.file(
    path.join(
      context.extensionPath,
      "src",
      "commands",
      "showDocsGenerator",
      "view.html"
    )
  );
  const content = await vscode.workspace.fs.readFile(filePath);

  return content.toString();
}
