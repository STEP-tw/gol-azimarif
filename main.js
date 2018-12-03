const readline = require('readline-sync');
const { world } = require('./src/gameLibrary.js');
const { repeatCharacter } = require('./src/util.js');

const main = function(){
  let length = readline.questionInt('Enter the length of the world: ');
  let breadth = readline.questionInt('Enter the breadth of the world: ');
  let dimension = { length, breadth };
  world.generateLabelledGrid(dimension);
  console.log(world.createPrintableBoard(world.grid));
}

main();
