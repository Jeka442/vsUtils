import * as vscode from "vscode";

/**
 * Generates a valid Israeli ID number, displays a modal information message asking the user if they
 * want to copy the ID to the clipboard. If the user selects "copy", the ID is copied to the clipboard
 * and a confirmation message is displayed.
 *
 * @function randomIsraeliId
 * @returns {void} This function pup ups a modal with option to copy the random id to clipboard
 */
export const randomIsraeliId = () => {
  var id = generateValidIsraeliID();
  vscode.window.showInformationMessage(`${id} copied to clipboard`);
  vscode.env.clipboard.writeText(id);
};

function generateValidIsraeliID() {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function calculateChecksum(digits: number[]) {
    let checksum = 0;
    for (let i = 0; i < digits.length; i++) {
      let num = digits[i] * ((i % 2) + 1);
      checksum += Math.floor(num / 10) + (num % 10);
    }
    return checksum % 10;
  }

  let idDigits = [];
  for (let i = 0; i < 8; i++) {
    idDigits.push(getRandomInt(0, 9));
  }

  let checksumDigit = (10 - calculateChecksum(idDigits)) % 10;
  idDigits.push(checksumDigit);

  return idDigits.join("");
}
