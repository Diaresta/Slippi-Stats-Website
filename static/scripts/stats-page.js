let STATS;
if (document.getElementById('demo-test').innerHTML == 'demo') {
  STATS = '/json/match-demo.json';
} else {
  STATS = '/json/stats.json';
}
const CHARS = '/json/characters.json';
const STAGES = '/json/stages.json';

// DOM Variables
const domTime = document.getElementById('time');
const domScore = document.getElementById('match-score');
const domStage = document.getElementById('stage-img');
const statSwitch = document.getElementById('stat-switch');
const p1Image = document.getElementById('p1-image');
const p2Image = document.getElementById('p2-image');
const p1Stocks = document.getElementsByClassName('p1-stock');
const p2Stocks = document.getElementsByClassName('p2-stock');
const p1Name = document.getElementById('player-one-name');
const p2Name = document.getElementById('player-two-name');
const p1Crown = document.getElementById('p1-crown');
const p2Crown = document.getElementById('p2-crown');

const domTotalDamage = document.getElementById('total-damage-done');
const domAvgKillPercent = document.getElementById('average-kill-percent');
const domOpeningPerKill = document.getElementById('openings-per-kill');
const domDamPerOpening = document.getElementById('damage-per-opening');
const domNeutralWins = document.getElementById('neutral-wins');
const domCounterHits = document.getElementById('counter-hits');
const domAPM = document.getElementById('apm');

const p1TotalDamage = document.getElementById('p1-total-damage-done');
const p1AvgKillPercent = document.getElementById('p1-average-kill-percent');
const p1OpeningPerKill = document.getElementById('p1-openings-per-kill');
const p1DamPerOpening = document.getElementById('p1-damage-per-opening');
const p1NeutralWins = document.getElementById('p1-neutral-wins');
const p1CounterHits = document.getElementById('p1-counter-hits');
const p1APM = document.getElementById('p1-apm');

const p1Wavedash = document.getElementById('p1-wavedash-count');
const p1Waveland = document.getElementById('p1-waveland-count');
const p1Airdodge = document.getElementById('p1-airdodge-count');
const p1Dashdance = document.getElementById('p1-dashdance-count');
const p1Spotdodge = document.getElementById('p1-spotdodge-count');
const p1Ledgegrab = document.getElementById('p1-ledgegrab-count');
const p1Roll = document.getElementById('p1-roll-count');

const player1Stats = document.getElementById('p1-stats');
const player1Actions = document.getElementById('p1-actions');

const p2TotalDamage = document.getElementById('p2-total-damage-done');
const p2AvgKillPercent = document.getElementById('p2-average-kill-percent');
const p2OpeningPerKill = document.getElementById('p2-openings-per-kill');
const p2DamPerOpening = document.getElementById('p2-damage-per-opening');
const p2NeutralWins = document.getElementById('p2-neutral-wins');
const p2CounterHits = document.getElementById('p2-counter-hits');
const p2APM = document.getElementById('p2-apm');

const p2Wavedash = document.getElementById('p2-wavedash-count');
const p2Waveland = document.getElementById('p2-waveland-count');
const p2Airdodge = document.getElementById('p2-airdodge-count');
const p2Dashdance = document.getElementById('p2-dashdance-count');
const p2Spotdodge = document.getElementById('p2-spotdodge-count');
const p2Ledgegrab = document.getElementById('p2-ledgegrab-count');
const p2Roll = document.getElementById('p2-roll-count');

const player2Stats = document.getElementById('p2-stats');
const player2Actions = document.getElementById('p2-actions');

fetch(STATS)
  .then((res) => res.json())
  .then((data) => {
    // Stage ID Number
    let stageID = data[0].stageId;
    let p1Char = data[0].players[0].characterId;
    let p1Color = data[0].players[0].characterColor;
    let p2Char = data[0].players[1].characterId;
    let p2Color = data[0].players[1].characterColor;

    // Match frame length
    domTime.innerHTML = matchTime(60, data);

    // Match score
    matchWinner(0, data);

    // Player 1 stats
    p1Stats(data);

    // Player 2 stats
    p2Stats(data);

    // Player 1 Actions
    p1Actions(data);

    // Player 2 Actions
    p2Actions(data);

    // P1/2 Stock Icons
    stockCount(data);

    fetch(STAGES)
      .then((res) => res.json())
      .then((stageData) => {
        matchStage(stageData, stageID);
      });

    fetch(CHARS)
      .then((res) => res.json())
      .then((charData) => {
        // Player 1/2 Image/Names
        playerImage(charData, p1Char, p2Char, p1Color, p2Color);
      });
  });

// Match score function
function matchWinner(playerNum, data) {
  let playerIndex = data[2].overall[playerNum].playerIndex;
  let killCount = data[2].overall[playerNum].killCount;

  if (killCount == 4) {
    domScore.innerHTML = '1 - 0';
    p1Crown.className = 'fas fa-crown';
    p2Crown.className = '';
    return true;
  } else {
    domScore.innerHTML = '0 - 1';
    p1Crown.className = '';
    p2Crown.className = 'fas fa-crown';
    return false;
  }
}

// Match time function
function matchTime(fps, data) {
  let frames = data[1].lastFrame;

  let time = (frames) => {
    return frames < 10 ? '0' + frames : frames;
  };

  fps = typeof fps !== 'undefined' ? fps : 24;
  return [
    time(Math.floor(frames / 3600)),
    time(Math.floor((frames % 3600) / 60)),
  ].join(':');
}

// Match stage function
function matchStage(stageData, stageID) {
  for (let i = 0; i < stageData.length; i++) {
    if (stageData[i].id === stageID) {
      domStage.src = stageData[i].stage_img;
    }
  }
}

// Player 1 stats function
function p1Stats(data) {
  p1TotalDamage.innerHTML = Math.round(data[2].overall[0].totalDamage) + '%';
  p1AvgKillPercent.innerHTML = Math.round(averageKillPercent(1, data)) + '%';
  p1OpeningPerKill.innerHTML =
    Math.round(data[2].overall[0].openingsPerKill.ratio * 10) / 10.0;
  p1DamPerOpening.innerHTML =
    Math.round(data[2].overall[0].damagePerOpening.ratio * 10) / 10.0 + '%';
  p1NeutralWins.innerHTML = data[2].overall[0].neutralWinRatio.count;
  p1CounterHits.innerHTML = data[2].overall[0].counterHitRatio.count;
  p1APM.innerHTML = Math.round(data[2].overall[0].inputsPerMinute.ratio);
}

// Player 2 stats function
function p2Stats(data) {
  p2TotalDamage.innerHTML = Math.round(data[2].overall[1].totalDamage) + '%';
  p2AvgKillPercent.innerHTML = Math.round(averageKillPercent(0, data)) + '%';
  p2OpeningPerKill.innerHTML =
    Math.round(data[2].overall[1].openingsPerKill.ratio * 10) / 10.0;
  p2DamPerOpening.innerHTML =
    Math.round(data[2].overall[1].damagePerOpening.ratio * 10) / 10.0 + '%';
  p2NeutralWins.innerHTML = data[2].overall[1].neutralWinRatio.count;
  p2CounterHits.innerHTML = data[2].overall[1].counterHitRatio.count;
  p2APM.innerHTML = Math.round(data[2].overall[1].inputsPerMinute.ratio);
}

// Player 1 actions function
function p1Actions(data) {
  p1Wavedash.innerHTML = data[2].actionCounts[0].wavedashCount;
  p1Waveland.innerHTML = data[2].actionCounts[0].wavelandCount;
  p1Airdodge.innerHTML = data[2].actionCounts[0].airDodgeCount;
  p1Dashdance.innerHTML = data[2].actionCounts[0].dashDanceCount;
  p1Spotdodge.innerHTML = data[2].actionCounts[0].spotDodgeCount;
  p1Ledgegrab.innerHTML = data[2].actionCounts[0].ledgegrabCount;
  p1Roll.innerHTML = data[2].actionCounts[0].rollCount;
}

// Player 2 actions function
function p2Actions(data) {
  p2Wavedash.innerHTML = data[2].actionCounts[1].wavedashCount;
  p2Waveland.innerHTML = data[2].actionCounts[1].wavelandCount;
  p2Airdodge.innerHTML = data[2].actionCounts[1].airDodgeCount;
  p2Dashdance.innerHTML = data[2].actionCounts[1].dashDanceCount;
  p2Spotdodge.innerHTML = data[2].actionCounts[1].spotDodgeCount;
  p2Ledgegrab.innerHTML = data[2].actionCounts[1].ledgegrabCount;
  p2Roll.innerHTML = data[2].actionCounts[1].rollCount;
}

// Player 1/2 Image and Name
function playerImage(charData, p1Char, p2Char, p1Color, p2Color) {
  // Player 1 Character/Stocks Image
  for (let i = 0; i < charData.length; i++) {
    if (charData[i].id === p1Char) {
      p1Image.src = charData[i].colors[p1Color];
      p1Name.innerHTML = charData[i].name;

      for (let ii = 0; ii < p1Stocks.length; ii++) {
        p1Stocks[ii].src = charData[i].stocks[p1Color];
      }
    }
  }

  // Player 2 Character/Stocks Image
  for (let i = 0; i < charData.length; i++) {
    if (charData[i].id === p2Char) {
      p2Image.src = charData[i].colors[p2Color];
      p2Name.innerHTML = charData[i].name;

      for (let ii = 0; ii < p2Stocks.length; ii++) {
        p2Stocks[ii].src = charData[i].stocks[p2Color];
      }
    }
  }
}

// Average kill percent function
function averageKillPercent(playerNum, data) {
  let killArray = [];
  let nullRemove = 0;

  for (let i = 0; i < data[2].stocks.length; i++) {
    let playerIndex = data[2].stocks[i].playerIndex;
    let endPercent = data[2].stocks[i].endPercent;
    if (playerIndex == playerNum && endPercent != null) {
      killArray.push(data[2].stocks[i].endPercent);
      if (endPercent == null) {
        nullRemove += 1;
      }
    }
  }
  let killTotal = killArray.reduce((a, b) => a + b, 0);
  let AverageKillPercent = killTotal / (killArray.length - nullRemove);
  return AverageKillPercent;
}

//P1/P2 stock icons
function stockCount(data) {
  let p1KillCount = data[2].overall[0].killCount;
  let p2KillCount = data[2].overall[1].killCount;

  for (let i = 0; i < p1KillCount; i++) {
    p2Stocks[i].style.opacity = '0.25';
  }

  for (let ii = 0; ii < p2KillCount; ii++) {
    p1Stocks[ii].style.opacity = '0.25';
  }

  reverseChildren(document.getElementById('p1-stocks'));
}

// P1 Reverse Stock Icons
function reverseChildren(parent) {
  for (var i = 1; i < parent.childNodes.length; i++) {
    parent.insertBefore(parent.childNodes[i], parent.firstChild);
  }
}

// Stat names
domTotalDamage.innerHTML = 'Total Damage Done';
domAvgKillPercent.innerHTML = 'Average Kill Percent';
domOpeningPerKill.innerHTML = 'Openings per Kill';
domDamPerOpening.innerHTML = 'Damage per Opening';
domNeutralWins.innerHTML = 'Neutral Wins';
domCounterHits.innerHTML = 'Counter Hits';
domAPM.innerHTML = 'APM';

statSwitch.onclick = () => switchStats();

// Switches Between Stats/Actions ul
function switchStats() {
  if (statSwitch.innerHTML == 'Get Actions') {
    domTotalDamage.innerHTML = 'Wavedashes';
    domAvgKillPercent.innerHTML = 'Wavelands';
    domOpeningPerKill.innerHTML = 'Air Dodges';
    domDamPerOpening.innerHTML = 'Dash Dances';
    domNeutralWins.innerHTML = 'Spot Dodges';
    domCounterHits.innerHTML = 'Ledgegrabs';
    domAPM.innerHTML = 'Rolls';

    player1Stats.style.display = 'none';
    player1Actions.style.display = 'inherit';

    player2Stats.style.display = 'none';
    player2Actions.style.display = 'inherit';

    statSwitch.innerHTML = 'Get Stats';
  } else {
    domTotalDamage.innerHTML = 'Total Damage Done';
    domAvgKillPercent.innerHTML = 'Average Kill Percent';
    domOpeningPerKill.innerHTML = 'Openings per Kill';
    domDamPerOpening.innerHTML = 'Damage per Opening';
    domNeutralWins.innerHTML = 'Neutral Wins';
    domCounterHits.innerHTML = 'Counter Hits';
    domAPM.innerHTML = 'APM';

    player1Stats.style.display = 'inherit';
    player1Actions.style.display = 'none';

    player2Stats.style.display = 'inherit';
    player2Actions.style.display = 'none';

    statSwitch.innerHTML = 'Get Actions';
  }
}
