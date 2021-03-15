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
    test = data[0].stageId;
    console.log(test);
  });

// stage ID
// stage = data[0].stageId;

// player 1 character stats
// p1Stats = data[0].players[0];

// player 1 character
// p1Character = data[0].players[0].characterId;

// player 1 color
// p1Color = data[0].players[0].characterColor;

// player 2 character stats
// p2Stats = data[0].players[1];

// player 2 character
// p2Character = data[0].players[1].characterId;

// player 2 color
// p2Color = data[0].players[1].characterColor;
