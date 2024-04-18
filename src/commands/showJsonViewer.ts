import * as vscode from "vscode";
export const showJsonViewer = () => {
  const panel = vscode.window.createWebviewPanel(
    "JsonViewerWebview",
    "JsonViewer tester",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );

  panel.webview.html = getWebviewContent();
};
function getWebviewContent(): string {
  return `  
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Input Form</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        background-color: inherit;
        color: inherit;
      }
      .json-list {
        list-style-type: none;
        padding-left: 20px;
      }

      .json-list > li {
        border-left: 2px solid #ccc;
        margin: 5px 0;
        padding-left: 10px;
        position: relative;
      }

      .json-value {
        font-family: "Courier New", Courier, monospace;
      }
      .toggle {
        display: none;
      }

      .json-key > label {
        cursor: pointer;
        display: block;
      }

      .json-key > ul {
        display: none;
      }

      .toggle:checked + label + ul {
        display: block;
      }

      .json-key > label::before {
        content: "▶";
        display: inline-block;
        width: 1em;
      }

      .toggle:checked + label::before {
        content: "▼";
      }
    </style>
  </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
      "
    >
      <div
        style="
          display: flex;
          gap: 10px;
          padding: 10px;
          width: 100%;
          flex-grow: 1;
        "
      >
        <div style="width: 50%; display: flex; flex-direction: column">
          <h2>Json</h2>
          <textarea id="textArea" style="width: 100%; flex-grow: 1"></textarea>
        </div>
        <button
          style="align-self: center; padding: 10px"
          onclick="clickHandler()"
        >
          Parse
        </button>
        <div style="width: 50%; display: flex; flex-direction: column">
          <h2>Tree view</h2>
          <div
            id="treeView"
            style="width: 100%; flex-grow: 1; border: 1px solid"
          ></div>
        </div>
      </div>
    </div>

    <script>
      function jsonToUl(json) {
        if (typeof json !== "object" || json === null) {
          return \`<li class="json-value">\${json}</li>\`;
        }

        const listItems = Object.entries(json)
          .map(([key, value], index) => {
            const hasNested = typeof value === "object";
            const content = hasNested
              ? jsonToUl(value)
              : \`<li class="json-value">\${key}: \${value}</li>\`;
            return hasNested
              ? \`<li class="json-key">
             <input type="checkbox" id="item-\${index}" class="toggle" checked>
             <label for="item-\${index}">\${key}</label>
             \${content}
           </li>\`
              : content;
          })
          .join("");

        return \`<ul class="json-list">\${listItems}</ul>\`;
      }

      function clickHandler() {
        try {
          let value = document.getElementById("textArea").value;
          const obj = JSON.parse(value);
          document.getElementById("treeView").innerHTML = jsonToUl(obj);
          document.getElementById("textArea").value = JSON.stringify(obj, null, 3);
        } catch (err) {
          document.getElementById(
            "treeView"
          ).innerHTML = \`<h2>Invalid json</h2><p>\${err}</p>\`;
        }
      }
    </script>
  </body>
</html>

  `;
}
