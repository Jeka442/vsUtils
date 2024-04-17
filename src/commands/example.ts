import * as vscode from "vscode";

export interface Joke {
  categories: string[];
  created_at: Date;
  icon_url: string;
  id: string;
  updated_at: Date;
  url: string;
  value: string;
}

export const chucknorrisJokes = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (!response.ok) {
      vscode.window.showErrorMessage(`No more jokes`);
    }
    const data = (await response.json()) as Joke;
    vscode.window.showInformationMessage(data.value);
  } catch (error) {
    vscode.window.showErrorMessage(`No more jokes`);
  }
};
