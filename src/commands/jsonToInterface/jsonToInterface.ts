import * as vscode from "vscode";
export async function jsonToInterface() {

  const json = await vscode.window.showInputBox({
    placeHolder: "insert json here...",
  });
  if (json && json.length > 0) {
    try {
      const obj = JSON.parse(json);
      const result = getInterfaceFromJSON(obj);
      const document = await vscode.workspace.openTextDocument({
        content: result,
        language: "typescript",
      });
      await vscode.window.showTextDocument(document);
    } catch {
      vscode.window.showErrorMessage("Invalid json");
    }
  }
}

function getInterfaceFromJSON(obj: any, name?: string) {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input is not a valid JSON object");
  }

  const nestedInterfaces: Map<string, string> = new Map<string, string>();
  const interfaceName = name ?? "root";
  let interfaceString = `interface I${interfaceName} {\n`;

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object") {
      if (Array.isArray(obj[key])) {
        if (obj[key].length == 0) {
          interfaceString += `    ${key}: any[];`;
        } else {
          if (typeof obj[key][0] === "object") {
            if (Array.isArray(typeof obj[key][0])) {
              //TODO: array of arrays
            } else {
              interfaceString += `    ${key}: I${key};`;
              nestedInterfaces.set(key, objectArrayHandler(obj[key], key));
            }
          } else {
            interfaceString += `    ${key}: ${typeof obj[key][0]}[];`;
          }
        }
      } else {
        interfaceString += `    ${key}: I${key};`;
        nestedInterfaces.set(key, getInterfaceFromJSON(obj[key], key));
      }
    } else {
      interfaceString += `    ${key}: ${typeof value};`;
    }
    interfaceString += "\n";
  }

  interfaceString += "}";

  let result = interfaceString;
  for (let item of nestedInterfaces) {
    result += "\n\n";
    result += item[1];
  }

  return result;
}

function tupleHandler() {}

function objectArrayHandler(objects: any[], interfaceName: string): string {
  const properties: { [key: string]: string } = {};

  objects.forEach((obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const type = typeof obj[key];
        if (!properties[key]) {
          properties[key] = type;
        } else if (properties[key] !== type) {
          properties[key] = "any";
        }
      }
    }
  });

  const interfaceProperties = Object.keys(properties)
    .map(
      (key) =>
        `${key}${properties[key] === "any" ? "?" : ""}: ${properties[key]};`
    )
    .join("\n    ");

  return `interface I${interfaceName} {\n    ${interfaceProperties}\n}`;
}
