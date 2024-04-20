import * as vscode from "vscode";

export const getApiChecker = async () => {
  const apiUrl = await vscode.window.showInputBox({
    prompt: "Enter the GET: URL",
  });

  if (apiUrl) {
    try {
      const res = await fetch(apiUrl);
      if (res) {
        const type = res.headers.get("Content-Type");
        const isJson = type && type.indexOf("application/json") >= 0;
        const body = (await res.json()) as string;
        const document = await vscode.workspace.openTextDocument({
          content: isJson ? JSON.stringify(body, null, 2) : body,
          language: isJson ? "json" : "txt",
        });
        await vscode.window.showTextDocument(document);
      } else {
        vscode.window.showErrorMessage("Failed process", res);
      }
    } catch (error) {
      vscode.window.showErrorMessage("Failed process: " + error);
    }
  }
};
