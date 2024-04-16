import * as vscode from "vscode";


/**
 * Ask for user input
 * Check if the file is a TSX file
 * Place new component in the active text editor
 *
 * @function insertFcTs
 * @returns {void} place new component in the active text editor
 */
export const insertFcTs = async () => {
  const userInput = await vscode.window.showInputBox({
    placeHolder: "Enter component name",
    title: "New component",
    validateInput: (text) => {
      return text.length < 3
        ? "Input must be at least 3 characters long."
        : null;
    },
  });

  if (userInput) {
    const compName = userInput.charAt(0).toUpperCase() + userInput.slice(1);
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor)
      return vscode.window.showErrorMessage("No active text editor vas found");
    const fileName = activeEditor.document.fileName;
    if (!fileName.endsWith("tsx")) {
      return vscode.window.showErrorMessage(
        "The active file is not a tsx file"
      );
    }

    const lastLine = activeEditor.document.lineAt(
      activeEditor.document.lineCount - 1
    );
    const endOfDocument = new vscode.Position(
      lastLine.lineNumber,
      lastLine.text.length
    );

    const snippet = new vscode.SnippetString(`


interface I${compName}{
    $1
}

export const ${compName} = (props:I${compName}) => {
    return <>${compName}</>
}
`);
    activeEditor.insertSnippet(snippet, endOfDocument);

    vscode.window.showInformationMessage(`You entered: ${compName}`);
  }
};
