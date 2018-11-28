const { world } = require('./gameLibrary.js');

const nextGeneration = function(currGeneration,bounds) {
  let  {topLeft,  bottomRight } = bounds; 
  let size = Math.max.apply(null,bottomRight) + 1;
  world.grid = world.generateGrid(size);
  
  currGeneration.map((aliveCell)=> { world.initializeGrid( { latitude:aliveCell[0], longitude:aliveCell[1] })});
  world.updateGrid();
  let newGeneration = []; 

  world.grid.map((gridRow)=> 
    gridRow.map((cell)=> {
      return cell==1 && 
         newGeneration.push([world.grid.indexOf(gridRow), gridRow.indexOf(cell)]);
      
    })
  )
  return newGeneration;
}

module.exports = { nextGeneration };
