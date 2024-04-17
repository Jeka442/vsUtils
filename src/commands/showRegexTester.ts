import * as vscode from "vscode";
export const showRegexTester = () => {
  const panel = vscode.window.createWebviewPanel(
    "regexWebview",
    "Regex tester",
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
        input {
          padding-block: 10px;
          font-weight: 600;
          background-color: inherit;
          color: inherit;
        }
        textarea {
            background-color: inherit;
            color: inherit;
            font-size: 18px
        }
      </style>
    </head>
    <body>
      <div style="display: flex; flex-direction: column; gap: 50px; margin: 20px">
        <div style="display: flex; flex-direction: column">
          <input
            type="text"
            oninput="changeHandler()"
            id="regex"
            placeholder="Enter regex... ^[a-z]*$"
          />
          <span style="color: red" id="errRegex"></span>
        </div>
        <div style="display: flex; flex-direction: column">
          <span style="font-weight: bold" id="result"></span>
          <textarea
            id="freeText"
            style="height: 300px"
            oninput="changeHandler()"
            placeholder="enter text here..."
          ></textarea>
        </div>
      </div>
      <script>
        function regError(msg) {
          document.getElementById("errRegex").innerHTML = msg;
        }
  
        function validRegex() {
          document.getElementById("result").innerHTML = "Valid pattern";
          document.getElementById("result").style.color = "green";
        }
  
        function invalidRegex() {
          document.getElementById("result").innerHTML = "Invalid pattern";
          document.getElementById("result").style.color = "red";
        }
  
        function changeHandler() {
          const regexPatter = document.getElementById("regex").value;
          if (!regexPatter || regexPatter.value == "") return;
          regError("");
          const freeText = document.getElementById("freeText").value;
          try {
            const regex = new RegExp(regexPatter, "g");
            const appliedRegex = freeText.replaceAll(regex, "");
            if (appliedRegex.length === 0) {
              validRegex();
            } else {
              invalidRegex();
            }
          } catch (e) {
            regError("Invalid json");
          }
        }
      </script>
    </body>
  </html>
    `;
}
