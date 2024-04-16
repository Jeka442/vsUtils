import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { commandsConfig } from "../commands/command";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test('Commands from commandsConfig should be added to package.json file', () => {
    const packagePath = path.join(__dirname, "..", "..", "package.json"); // Adjust path as necessary
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const commandsFromPackageJson = packageJson.contributes.commands.map(
      (cmd: { command: string }) => cmd.command
    );

    for (let cmd of Object.keys(commandsConfig)) {
      const flag = commandsFromPackageJson.includes(cmd);
      assert.ok(flag, `${cmd} command is not included in package.json`);
    }
  });
});
