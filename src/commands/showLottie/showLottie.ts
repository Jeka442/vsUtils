import * as vscode from "vscode";
import * as path from "path";

export const showLottie = (context?: vscode.ExtensionContext) => {
  if (!context) return;
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const documentText = document.getText();

    if (document.languageId !== "json") {
      vscode.window.showInformationMessage(
        "The active file is not a JSON file."
      );
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "lottiePreview",
      "Lottie Preview",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
      }
    );

    const lottiePath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "node_modules",
        "lottie-web",
        "build",
        "player",
        "lottie.min.js"
      )
    );

    panel.webview.html = getWebviewContent(
      panel.webview,
      lottiePath,
      documentText
    );
  }
};

function getWebviewContent(
  webview: vscode.Webview,
  lottiePath: vscode.Uri,
  lottieJson: string
): string {
  const scriptSrc = webview.asWebviewUri(lottiePath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="${scriptSrc}"></script>
</head>
<body>
  <div id="lottie"></div>
  <script>
    var animation = bodymovin.loadAnimation({
      container: document.getElementById('lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: ${lottieJson}
    });
  </script>
</body>
</html>`;
}
