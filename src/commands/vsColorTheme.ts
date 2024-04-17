import * as vscode from "vscode";

export const vsColorTheme = async () => {
  const userColor = await vscode.window.showQuickPick(
    [
      { label: "Red", description: "red", detail: "#ff0000" },
      { label: "Green", description: "green", detail: "#00ff00" },
      { label: "Yellow", description: "yellow", detail: "#ffff00" },
      { label: "Blue", description: "blue", detail: "#0000ff" },
      { label: "Default", description: "default" },
    ],
    {
      placeHolder: "Choose a color for the title bar",
    }
  );

  if (userColor) {
    changeTitleBarColor(userColor.label.toLowerCase());
  }
};
async function changeTitleBarColor(color: string) {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showErrorMessage(
      "Please open a workspace to change the title bar color."
    );
    return;
  }

  const config = vscode.workspace.getConfiguration("workbench", null);
  let colorCustomizations = {};

  switch (color) {
    case "red":
      colorCustomizations = {
        "titleBar.activeBackground": "#4B0000",
        "titleBar.activeForeground": "#ffffff",
      };
      break;
    case "green":
      colorCustomizations = {
        "titleBar.activeBackground": "#013D00",
        "titleBar.activeForeground": "#ffffff",
      };
      break;
    case "yellow":
      colorCustomizations = {
        "titleBar.activeBackground": "#383D00",
        "titleBar.activeForeground": "#ffffff",
      };
      break;
    case "blue":
      colorCustomizations = {
        "titleBar.activeBackground": "#000E3D",
        "titleBar.activeForeground": "#ffffff",
      };
      break;
    case "default":
      colorCustomizations = {
        "titleBar.activeBackground": null,
        "titleBar.activeForeground": null,
      };
      break;
  }

  config.update(
    "colorCustomizations",
    colorCustomizations,
    vscode.ConfigurationTarget.Workspace
  );
}
