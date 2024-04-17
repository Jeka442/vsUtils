import * as vscode from "vscode";
export const showRegex = () => {
  const panel = vscode.window.createWebviewPanel(
    "regexWebview",
    "Regex tester",
    vscode.ViewColumn.One,
    {}
  );

  panel.webview.html = getWebviewContent();
};
function getWebviewContent(): string {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Input Form</title>
        </head>
        <body>
            <input type="text" id="inputField" placeholder="Enter something..."/>
            <button onclick="handleButtonClick()">Submit</button>

            <script>
                const vscode = acquireVsCodeApi();
                
                function handleButtonClick() {
                    const input = document.getElementById('inputField').value;
                    vscode.postMessage({
                        command: 'submit',
                        text: input
                    });
                }
            </script>
        </body>
        </html>
    `;
}
