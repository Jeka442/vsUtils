import * as vscode from "vscode";
export const showBase64 = async (context?: vscode.ExtensionContext) => {
  if (!context) return;
  const base64 = await vscode.window.showInputBox({
    prompt: "Enter the base64 string",
  });

  if (base64 && base64.length > 0) {
    try {
      let img = base64.startsWith("data:image")
        ? base64
        : `data:image/png;base64,${base64}`;

      const panel = vscode.window.createWebviewPanel(
        "base64Preview",
        "Base64 Preview",
        vscode.ViewColumn.Active,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = getWebviewContent(img);
    } catch {
      vscode.window.showErrorMessage("Invalid base 64");
    }
  }
};

function getWebviewContent(base64: string): string {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div style="width:100vw; height:100vh; display:flex; flex-direction:column; gap:10px; justify-content:center; align-items:center">
        <h2>Preview</h2>
        <img src="${base64}" style="max-width: 90vw; height: auto; box-sizing:border-box; padding:10px; border: 2px solid; border-radius: 7px" />
    </div>
  </body>
  </html>`;
}
