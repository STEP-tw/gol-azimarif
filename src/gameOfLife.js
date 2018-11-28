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
  let rowIndex = generateIndex(topLeft[0], bottomRight[0]);
  let columnIndex = generateIndex(topLeft[1], bottomRight[1]);

  rowIndex.map((row)=>
    columnIndex.map((col)=> {
      world.grid[row][col] == 1 && newGeneration.push([row,col]);
    })
  );
  return newGeneration;
}

const generateIndex = function(startIndex, endIndex){
  let size = endIndex - startIndex + 1;
  let index = startIndex;
  return new Array(size).fill(0).map((element)=> index++ );
}

const nextGeneration = function(currGeneration,bounds) {
  let  {topLeft,  bottomRight } = bounds; 
  let size = Math.max.apply(null,bottomRight) + 1;
  world.grid = world.generateGrid(size);

  currGeneration = currGeneration.filter((position)=> {
    return isPositionExists({rowPosition: position[0], columnPosition: position[1], topLeft, bottomRight})
  });
  currGeneration.forEach((aliveCell)=> { world.initializeGrid( { latitude:aliveCell[0], longitude:aliveCell[1] })});
  world.updateGrid();

  return getAliveCells(bounds);
}

module.exports = { nextGeneration };
