const STATS = '/json/stats.json';
const CHARS = '/json/characters.json';
const STAGES = '/json/stages.json';

// Match Variables
let stageID;

// DOM Variables
const domTime = document.getElementById('time');
const domScore = document.getElementById('match-score');
const domStage = document.getElementById('stage-img');
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

const p2TotalDamage = document.getElementById('p2-total-damage-done');
const p2AvgKillPercent = document.getElementById('p2-average-kill-percent');
const p2OpeningPerKill = document.getElementById('p2-openings-per-kill');
const p2DamPerOpening = document.getElementById('p2-damage-per-opening');
const p2NeutralWins = document.getElementById('p2-neutral-wins');
const p2CounterHits = document.getElementById('p2-counter-hits');
const p2APM = document.getElementById('p2-apm');

fetch(STATS)
  .then((res) => res.json())
  .then((data) => {
    // Stage ID Number
    stageID = data[0].stageId;

    // Stage Placeholder
    // domStage.src ='';

    // Match frame length
    domTime.innerHTML = matchTime(60, data);

    // Match score
    matchWinner(0, data);

    // Player 1 stats
    p1Stats(data);

    // Player 2 stats
    p2Stats(data);

    // Stat names
    domTotalDamage.innerHTML = 'Total Damage Done';
    domAvgKillPercent.innerHTML = 'Average Kill Percent';
    domOpeningPerKill.innerHTML = 'Openings per Kill';
    domDamPerOpening.innerHTML = 'Damage per Opening';
    domNeutralWins.innerHTML = 'Neutral Wins';
    domCounterHits.innerHTML = 'Counter Hits';
    domAPM.innerHTML = 'APM';

    console.log();
  });

// Match score function
function matchWinner(playerNum, data) {
  let playerIndex = data[2].overall[playerNum].playerIndex;
  let killCount = data[2].overall[playerNum].killCount;

  if (playerIndex == 0 && killCount == 4) {
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

  var time = (frames) => {
    return frames < 10 ? '0' + frames : frames;
  };

  fps = typeof fps !== 'undefined' ? fps : 24;
  return [
    time(Math.floor(frames / 3600)),
    time(Math.floor((frames % 3600) / 60)),
  ].join(':');
}

// Player 1 stats function
function p1Stats(data) {
  p1Name.innerHTML = 'placeholder';

  p1TotalDamage.innerHTML = Math.round(data[2].overall[0].totalDamage);
  p1AvgKillPercent.innerHTML = Math.round(averageKillPercent(0, data));
  p1OpeningPerKill.innerHTML =
    Math.round(data[2].overall[0].openingsPerKill.ratio * 10) / 10.0;
  p1DamPerOpening.innerHTML =
    Math.round(data[2].overall[0].damagePerOpening.ratio * 10) / 10.0;
  p1NeutralWins.innerHTML = data[2].overall[0].neutralWinRatio.count;
  p1CounterHits.innerHTML = data[2].overall[0].counterHitRatio.count;
  p1APM.innerHTML = Math.round(data[2].overall[0].inputsPerMinute.ratio);
}

// Player 2 stats function
function p2Stats(data) {
  p2Name.innerHTML = 'placeholder';

  p2TotalDamage.innerHTML = Math.round(data[2].overall[1].totalDamage);
  p2AvgKillPercent.innerHTML = Math.round(averageKillPercent(1, data));
  p2OpeningPerKill.innerHTML =
    Math.round(data[2].overall[1].openingsPerKill.ratio * 10) / 10.0;
  p2DamPerOpening.innerHTML =
    Math.round(data[2].overall[1].damagePerOpening.ratio * 10) / 10.0;
  p2NeutralWins.innerHTML = data[2].overall[1].neutralWinRatio.count;
  p2CounterHits.innerHTML = data[2].overall[1].counterHitRatio.count;
  p2APM.innerHTML = Math.round(data[2].overall[1].inputsPerMinute.ratio);
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

// ----------------------------------------------------------------------------------------------
// stage ID
// stage = data[0].stageId;

// match time
// matchTime(test, 60);
// let frames = data[1].lastFrame;

// player 1 character stats
// p1Stats = data[0].players[0];

// player 1 character
// p1Character = data[0].players[0].characterId;

// player 1 color
// p1Color = data[0].players[0].characterColor;
