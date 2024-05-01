import * as vscode from "vscode";
import { randomIsraeliId } from "./randomIsraeliId";
import { chucknorrisJokes } from "./example";
import { vsColorTheme } from "./vsColorTheme";
import { showRegexTester } from "./showRegexTester/regexTester";
import { showJsonViewer } from "./showJsonViewer/jsonViewer";
import { showDocsGeneratorts } from "./showDocsGenerator/docGenerator";
import { getApiChecker } from "./getApiChecker";
import { showSvg } from "./showSvg/showSvg";
import { showLottie } from "./showLottie/showLottie";

interface IActionConfig {
  title: string;
  items: {
    command: string;
    callback: (context?: vscode.ExtensionContext) => void;
    name: string;
  }[];
}

export const actionConfigurations: IActionConfig[] = [
  {
    title: "Generators",
    items: [
      {
        command: "vsutils.israelId",
        callback: randomIsraeliId,
        name: "Israel id",
      },
      {
        command: "vsutils.showDocGenerator",
        callback: showDocsGeneratorts,
        name: "Documentation Generator",
      },
    ],
  },
  {
    title: "Utils",
    items: [
      {
        command: "vsutils.regexTester",
        callback: showRegexTester,
        name: "Regex tester",
      },
      {
        command: "vsutils.showJsonViewer",
        callback: showJsonViewer,
        name: "Json viewer",
      },
      {
        command: "vsutils.apiGet",
        callback: getApiChecker,
        name: "Api get checker",
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        command: "vsutils.changeColorTheme",
        callback: vsColorTheme,
        name: "Change theme",
      },
      {
        command: "vsutils.chucknorrisJokes",
        callback: chucknorrisJokes,
        name: "Chuck norris",
      },
    ],
  },
  {
    title: "Preview",
    items: [
      {
        command: "vsutils.showSvg",
        callback: showSvg,
        name: "Preview svg",
      },
      {
        command: "vsutils.previewLottie",
        callback: showLottie,
        name: "Preview lottie"
      }
    ]
  }

] as const;

/**
 * Registers commands specified in the commandsConfig object. This function ensures that each command
 * defined in the commandsConfig is registered within the VS Code extension context. The command keys
 * in commandsConfig must match those declared in the package.json to function correctly.
 *
 * @function registerCommandHandler
 * @param {vscode.ExtensionContext} context - The extension context provided by the activate function.
 * @returns {void} This function does not return a value; it registers each command with VS Code.
 */
export function registerCommandHandler(context: vscode.ExtensionContext) {
  for (let commandsConfig of actionConfigurations) {
    for (let item of commandsConfig.items) {
      const withContext = () => {
        return item.callback(context);
      };
      let disposable = vscode.commands.registerCommand(
        item.command,
        withContext
      );
      context.subscriptions.push(disposable);
    }
  }
}
