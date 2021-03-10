// let test = document.getElementById('test');
const fs = require('fs');
const { default: SlippiGame } = require('@slippi/slippi-js');

const game = new SlippiGame('./public/uploads/match.slp');

// Get game settings – stage, characters, etc
const settings = game.getSettings();
console.log(settings);
// test.innerHTML = settings;

// Get metadata - start time, platform played on, etc
const metadata = game.getMetadata();
console.log(metadata);

// Get computed stats - openings / kill, conversions, etc
const stats = game.getStats();
console.log(stats);

// Get frames – animation state, inputs, etc
// This is used to compute your own stats or get more frame-specific info (advanced)
const frames = game.getFrames();
console.log(frames[0].players); // Print frame when timer starts counting down

// const latestFrame = game.getLatestFrame();
// console.log(latestFrame);

// const gameEnd = game.getGameEnd();
// console.log(gameEnd);

// const fixedStats = [
//   stats.KILL_MOVES,
//   stats.NEUTRAL_OPENER_MOVES,
//   stats.OPENINGS_PER_KILL,
//   stats.DAMAGE_DONE,
// ];

// port: player.port,
// characterId: player.characterId,
// characterColor: player.characterColor,
// nametag: player.nametag,
// characterName: characterUtil.getCharacterName(player.characterId),
// characterColor: characterUtil.getCharacterColorName(
//   player.characterId,
//   player.characterColor
// )

const output = [];
output.push(settings, metadata, stats);

function writeToFile(output) {
  fs.writeFileSync('public/uploads/output.json', JSON.stringify(output));
  console.log('Finished writting stats to output.json!');
}

writeToFile(output);
