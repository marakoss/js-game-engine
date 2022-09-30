import { saveGameFile } from "constants/storage";

export function saveGame(gameState: object) {
  if (!isLocalStorageAvailable()) return;

  const gameData = {
    gameState: gameState,
  };

  localStorage.setItem(saveGameFile, JSON.stringify(gameData));
}

export function loadGame() {
  if (!isLocalStorageAvailable()) return;

  const data = localStorage.getItem(saveGameFile);
  if (data !== null) {
    const gameData = JSON.parse(data);
    return gameData.gameState;
  }
  return null;
}

function isLocalStorageAvailable() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn("Cannot store/load gameData");
    return false;
  }
}
