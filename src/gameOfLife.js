const { world } = require('./gameLibrary.js');

const isPositionExists = function(currentAliveCell){
  let { rowPosition, columnPosition, topLeft, bottomRight } = currentAliveCell;
  let gridStartingRow = topLeft[0];
  let gridStartingColumn = topLeft[1];

  let gridEndRow = bottomRight[0];
  let gridEndColumn = bottomRight[1];
  return (rowPosition >= gridStartingRow && columnPosition >= gridStartingColumn) && 
    (rowPosition <= gridEndRow && columnPosition <= gridEndColumn);
}

const getAliveCells = function(bounds){
  let { topLeft, bottomRight } = bounds;
  let newGeneration = [];
  let {length, width} = world.getWorldSize(world.grid);

  for(let row=0; row<width; row++){
    for(let column=0; column<length; column++){
      world.grid[row][column]==1 && newGeneration.push([row, column]);
    }
  }
  return newGeneration;
}

const nextGeneration = function(currGeneration,bounds) {
  let  {topLeft,  bottomRight } = bounds; 
  let length = bottomRight[0] - topLeft[0] +1;
  let width = bottomRight[1] - topLeft[1] +1;
  world.grid = world.generateGrid({length, width});

  currGeneration =  currGeneration.map((x)=> [x[0]- topLeft[0], x[1]- topLeft[1]]);
  currGeneration = currGeneration.filter((position)=> {
    return isPositionExists({rowPosition: position[0], columnPosition: position[1], topLeft, bottomRight})
  });
  currGeneration.forEach((aliveCell)=> { world.initializeGrid( { latitude:aliveCell[0], longitude:aliveCell[1] })});
  world.updateGrid();
  let aliveCells= getAliveCells(bounds);
  aliveCells=  aliveCells.map((cell)=> [cell[0]+ topLeft[0], cell[1]+ topLeft[1]]);
  return aliveCells;
}

module.exports = { nextGeneration };
