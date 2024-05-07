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

  // if it's an array of object, generate the type for the first object only
  if (!name && Array.isArray(obj)) {
    return getInterfaceFromJSON(obj[0]);
  }

  const nestedInterfaces: string[] = [];
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
            if (Array.isArray(obj[key][0])) {
              if (obj[key][0].length === 0) {
                interfaceString += `    ${key}: any[];`;
              } else {
                if (typeof obj[key][0][0] === "object") {
                  interfaceString += `    ${key}: I${key}[][];`;
                  nestedInterfaces.push(
                    getInterfaceFromJSON(obj[key][0][0], key)
                  );
                } else {
                  interfaceString += `    ${key}: string[];`;
                }
              }
            } else {
              interfaceString += `    ${key}: I${key}[];`;
              nestedInterfaces.push(objectArrayHandler(obj[key], key));
            }
          } else {
            interfaceString += `    ${key}: ${typeof obj[key][0]}[];`;
          }
        }
      } else {
        interfaceString += `    ${key}: I${key};`;
        nestedInterfaces.push(getInterfaceFromJSON(obj[key], key));
      }
    } else {
      interfaceString += `    ${key}: ${typeof value};`;
    }
    interfaceString += "\n";
  }

  interfaceString += "}";

  let result = interfaceString;

  function objectArrayHandler(arr: any[], interfaceName: string): string {
    const properties = new Map<string, string>();

    for (const key in arr[0]) {
      if (typeof arr[0][key] === "object") {
        if (Array.isArray(arr[0][key])) {
          if (arr[0][key].length === 0) {
            properties.set(key, `any[]`);
          } else {
            if (typeof arr[0][key][0] === "object") {
              if (Array.isArray(arr[0][key][0])) {
                if (arr[0][key][0].length == 0) {
                  properties.set(key, `any[]`);
                } else {
                  if (typeof arr[0][key][0][0] === "object") {
                    properties.set(key, `I${key}[]`);
                    nestedInterfaces.push(
                      objectArrayHandler(arr[0][key][0], key)
                    );
                  } else {
                    properties.set(key, `string[]`);
                  }
                }
              } else {
                properties.set(key, `I${key}[]`);
                nestedInterfaces.push(
                  objectArrayHandler(arr[0][key], `${key}`)
                );
              }
            } else {
              properties.set(key, `string[]`);
            }
          }
        } else {
          properties.set(key, `I${key}`);
          nestedInterfaces.push(getInterfaceFromJSON(arr[0][key], `${key}`));
        }
      } else {
        properties.set(key, typeof arr[0][key]);
      }
    }
    for (let obj of arr) {
      for (let prop in obj) {
        if (!properties.has(prop) && !properties.has(prop + "?")) {
          if (typeof obj[prop] === "object") {
            if (Array.isArray(obj[prop])) {
              if (obj[prop].length === 0) {
                properties.set(prop + "?", "any[]");
              } else {
                if (typeof obj[prop][0] === "object") {
                  if (Array.isArray(obj[prop][0])) {
                    if (obj[prop][0].length == 0) {
                      properties.set(prop + "?", `any[]`);
                    } else {
                      if (typeof obj[prop][0][0] === "object") {
                        properties.set(prop + "?", `I${prop}[][]`);
                        nestedInterfaces.push(
                          objectArrayHandler(obj[prop][0], prop)
                        );
                      } else {
                        properties.set(prop + "?", `string[]`);
                      }
                    }
                  } else {
                    properties.set(prop + "?", `I${prop}[]`);
                    nestedInterfaces.push(
                      objectArrayHandler(obj[prop], `${prop}`)
                    );
                  }
                } else {
                  properties.set(prop + "?", `${typeof obj[prop][0]}[]`);
                }
              }
            } else {
              properties.set(prop, `I${prop}`);
              nestedInterfaces.push(getInterfaceFromJSON(obj[prop], `${prop}`));
            }
          } else {
            properties.set(prop + "?", typeof obj[prop]);
          }
        }
      }
      if (properties.size > Object.keys(obj).length) {
        for (let [key, type] of Array.from(properties)) {
          if (!obj.hasOwnProperty(key.replace("?", ""))) {
            properties.delete(key);
            properties.set(key.replace("?", "") + "?", type);
          }
        }
      }
    }

    const interfaceProperties = Array.from(properties)
      .map(([prop, type]) => `${prop}: ${type}`)
      .join("\n    ");

    return `interface I${interfaceName} {\n    ${interfaceProperties}\n}`;
  }

  for (let item of nestedInterfaces) {
    result += "\n\n" + item;
  }

  return result;
}
