const chat = document.getElementById("console");
const form = document.getElementById("form");
const input = document.getElementById("command");
const saveGameFile = 'myGame';
loadGame();

const historyTypeEnum = Object.freeze({
  COMMAND: Symbol('command'),
  RESPONSE: Symbol('response')
});

form
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const text = readInput();

    gameState.history.push({
      type: historyTypeEnum.COMMAND,
      text: text,
      data: createCommand(text),
      time: new Date().getTime()
    })

    gameState.history.push({
      type: historyTypeEnum.RESPONSE,
      text: getResponse(),
      time: new Date().getTime()
    })

    clearInput();
    writeAllNewMessagesToChat();
    saveGame();
  });

function saveGame() {
  if (!isLocalStorageAvailable()) return

  const gameData = {
    gameState: gameState
  }

  localStorage.setItem(saveGameFile, JSON.stringify(gameData))
}

function loadGame() {
  if (!isLocalStorageAvailable()) return;

  const data = localStorage.getItem(saveGameFile);
  if (data !== null) {
    const gameData = JSON.parse(data);
    gameState = gameData.gameState;
  }
}

function isLocalStorageAvailable() {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('Cannot store/load gameData');
		return false;
  }
}

const levenshteinDistance = (str1 = '', str2 = '') => {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator, // substitution
      );
    }
  }
  return track[str2.length][str1.length];
};

function getGuessedCommand(text) {
  var lowest = 1000;
  var intent = null;
  const words = text.split(' ');
  words.forEach(word => {
    const commandKeys = Object.keys(commandAliases);
    commandKeys.forEach(key => {
      commandAliases[key].forEach(alias => {
        const distance = levenshteinDistance(alias, word);
        if (distance < lowest) {
          lowest = distance;
          intent = key;
        }
      });
    })
  })
  //console.log(intent);
  return intent.toLowerCase();
}

function createCommand(text) {
  return {
    name: getGuessedCommand(text),
    originalInput: text,
    transformedInput: text.toLowerCase().trim()
  };
}

function readInput() {
  return input.value;
}

function clearInput() {
  input.value = null;
}

function writeAllNewMessagesToChat() {
  while (gameState.messageCounter < gameState.history.length) {
    const div = document.createElement('div');
    div.className = gameState.history[gameState.messageCounter].type.description;
    div.innerHTML = gameState.history[gameState.messageCounter].text;
    chat.appendChild(div);
    gameState.messageCounter++;
  }
}

//--------------------------------------------
//do not touch anything above this line
const possibleCommands = Object.freeze({
  NOOP: Symbol(''),
  AHOJ: Symbol('ahoj'),
  SOUTH: Symbol('south'),
  NORTH: Symbol('north'),
  WEST: Symbol('west'),
  EAST: Symbol('east'),
  JMENO: Symbol('jmeno'),
});

const commandAliases = {
  NOOP: [''],
  AHOJ: ['cau', 'hi', 'zdar', 'cauko'],
  NORTH: ['n', 'sever'],
  SOUTH: ['s', 'jih'],
  EAST: ['e', 'vychod'],
  JMENO: ['jmeno', 'me jmeno', 'jake je me jmeno'],
}

const items = {
	shovel: {
  	name: '',
    description: 'Tohle je moc hezka lopata, akorat s ni nekoho jebout po palici'
  }
}

const gameMap = {
	hotel_lobby: {
  	name: "Vstupni hala",
    description: "Prave se nachazite v hale temné hotelu",
    items: [items.shovel],
    entities: ['Lucie'],
    connects: [
    	{link: 'stairs', type: 'hidden', direction: 'north'},
      {link: 'mistnost2', type: 'hidden', direction: 'down'}
     ],
    state: ['normal'],
    actions: ['ahoj', 'dig', 'talk'],
    quests: [{
    	id: 'jmeno',
      name: 'Predstav se',
      state: ['unsolved']
    }]
  }
};

const userProfile = {
  name: null,
  age: null,
};
var gameState = {
  messageCounter: 0,
  currentPosition: 0,
  history: [],
  inventory: {},
  userProfile: userProfile
}

function getResponse() {
  const lastCommand = gameState.history[gameState.history.length - 1];
  const lastMessage = gameState.history[gameState.history.length - 2];
  
  if (lastCommand.data.name == possibleCommands.AHOJ.description) {
    if (userProfile.name === null)
      return `ahoj, jake je tve jmeno?`;
    else
      return 'ahoj';
  }
  
  if (lastMessage.text == "ahoj, jake je tve jmeno?") {
    gameState.userProfile.name = lastCommand.text;
    return `Krásné jméno, odteď si budu pamatovat, že se jmenuješ ${lastCommand.text}`;
  }
  
  if (lastCommand.data.name == possibleCommands.JMENO.description) {
    return `Řekl jsi mi, že se jmenuješ ${gameState.userProfile.name}`;
  }
}
