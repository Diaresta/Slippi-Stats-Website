const STATS = '/json/stats.json';

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     var response = JSON.parse(xhttp.responseText);

//     var constl = response[0].slpVersion;
//     console.log(constl);
//   }
// };
// xhttp.open('GET', STATS, true);
// xhttp.send();

// Most Common Kill Move
// Most Common Neutral Opener
// Openings per Kill
// Total Damage Done
// Average Kill %
// Neutral Wins
let test;

fetch(STATS)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    // test = data[2].actionCounts;
    test = data[2].overall[0];
    console.log(test);
  });

function matchWinner(playerNum, data) {
  let playerIndex = data[2].overall[playerNum].playerIndex;
  let killCount = data[2].overall[playerNum].killCount;
  if (playerIndex == 0 && killCount == 4) {
    return true;
  } else {
    return false;
  }
}

// time, most common kill move/neutral opener

// stage ID
// stage = data[0].stageId;

// player 1 winner score
// matchWinner(0, data);

// player 1 character stats
// p1Stats = data[0].players[0];

// player 1 character
// p1Character = data[0].players[0].characterId;

// player 1 color
// p1Color = data[0].players[0].characterColor;

// player 1 total damage
// p1TotalDamage = data[2].overall[0].totalDamage;

// player 1 openings/kill
// p1OpeningPerKill = data[2].overall[0].openingsPerKill.ratio;

// player 1 neutral wins
// p1NeutWins = data[2].overall[0].neutralWinRatio.count;

// player 1 counter hits
// p1CountHits = data[2].overall[0].counterHitRatio.count;

// player 1 damage/opening
// p1DamPerOpen = data[2].overall[0].damagePerOpening.ratio;

// player 1 apm
// p1APM = data[2].overall[0].inputsPerMinute.ratio;

// player 1 average kill percent
// averageKillPercent(0, data);

// player 2 winner score
// matchWinner(1, data);

// player 2 character stats
// p2Stats = data[0].players[1];

// player 2 character
// p2Character = data[0].players[1].characterId;

// player 2 color
// p2Color = data[0].players[1].characterColor;

// player 2 total damage
// p2TotalDamage = data[2].overall[1].totalDamage;

// player 2 openings/kill
// p2OpeningPerKill = data[2].overall[1].openingsPerKill.ratio;

// player 2 neutral wins
// p2NeutWins = data[2].overall[1].neutralWinRatio.count;

// player 2 counter hits
// p2CountHits = data[2].overall[1].counterHitRatio.count;

// player 2 damage/opening
// p2DamPerOpen = data[2].overall[1].damagePerOpening.ratio;

// player 2 apm
// p2APM = data[2].overall[1].inputsPerMinute.ratio;

// player 2 average kill percent
// averageKillPercent(1, data);

// player 1/2 average kill percent function
// function averageKillPercent(playerNum, data) {
//   let killArray = [];
//   let nullRemove = 0;

//   for (let i = 0; i < data[2].stocks.length; i++) {
//     let playerIndex = data[2].stocks[i].playerIndex;
//     let endPercent = data[2].stocks[i].endPercent;
//     if (playerIndex == playerNum && endPercent != null) {
//       killArray.push(data[2].stocks[i].endPercent);
//       if (endPercent == null) {
//         nullRemove += 1;
//       }
//     }
//   }
//   let killTotal = killArray.reduce((a, b) => a + b, 0);
//   let AverageKillPercent = killTotal / (killArray.length - nullRemove);
//   console.log(AverageKillPercent);
// }

// score function. If true, p1 = winner. If false, p2 = winner
// function matchWinner(playerNum, data) {
//   let playerIndex = data[2].overall[playerNum].playerIndex;
//   let killCount = data[2].overall[playerNum].killCount;
//   if (playerIndex == 0 && killCount == 4) {
//     return true;
//   } else {
//     return false;
//   }
// }

// player index 0 = player 1
