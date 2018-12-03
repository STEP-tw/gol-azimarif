const { 
  sum,
  parseBoolToInt,
  repeatCharacter
} = require('./util.js');

const world = {
  grid :[],

  generateGrid : function(dimension){
    let {length, breadth} = dimension;
    let gridRows = new Array(length).fill(0);
    let grid = gridRows.map((element)=> new Array(breadth).fill(0));
    return grid;
  },

  generateLabelledGrid : function(dimension){
    this.grid = this.generateGrid(dimension);
    let position=1;
    return this.grid = this.grid.map((x)=> x.map((y) => position++));
  },

  getGridDimension : function(grid){
    return {length: grid.length, width : grid[0].length };
  },

  isCellPositionValid : function(position) {
    let { latitude, longitude } = position;
    let {length, width} = this.getGridDimension(this.grid);
    return !( Math.min(latitude,longitude) < 0 || latitude >= length ||longitude >= width);
  },

  isCellStateAlive : function(position) {
    let { latitude, longitude } = position;
    return (this.isCellPositionValid(position)) &&  (this.grid[latitude][longitude] == 1);
  },

  getAllNeighbours : function(position){
    let { latitude, longitude } = position;
    let points = [-1, 0, 1];
    let neighbour=[];

    points.forEach((x)=> {
      points.forEach((y) =>{
        neighbour.push([latitude+x, longitude+y]);
      });
    });

    return neighbour.filter((x)=>{ return !(x[0] ==latitude && x[1] == longitude)});
  },

  getAliveNeighbours : function(position) {
    let { latitude, longitude } = position;
    return this.getAllNeighbours(position).map((x)=> this.isCellStateAlive({ latitude:x[0], longitude:x[1]})).map(parseBoolToInt);
  },

  getAliveNeighboursCount : function(position) {
    return this.getAliveNeighbours(position).reduce(sum);
  },

  updatePositionState : function(positionDetail){
    let { latitude, longitude, aliveNeighbours } = positionDetail;
    if(aliveNeighbours < 2 || aliveNeighbours > 3){
      return 0;
    }
    if(aliveNeighbours == 3){
      return 1;
    }
    return this.grid[latitude][longitude];
  },

  updateGrid : function(){
    let newGrid = this.grid.map((x)=> x.slice());
    let {length, width} = this.getGridDimension(this.grid);
    for(let latitude=0; latitude<length; latitude++){
      for(let longitude=0;longitude<width; longitude++){
        let aliveNeighbours = this.getAliveNeighboursCount({latitude, longitude});
        let newState = this.updatePositionState({latitude, longitude, aliveNeighbours});
        newGrid[latitude][longitude] = newState;
      }
    }
    this.grid = newGrid
  },

  initializeGrid : function(position){
    let { latitude, longitude } = position;
    this.grid[latitude][longitude] = 1;
  },

  runWorld : function(numberOfIteration){
    while (numberOfIteration){
      this.updateGrid();
      numberOfIteration--;
    }
    return this.grid;
  },
  
  calculateLongestElementLength : function(list) {
  let { length, breadth } =  this.getGridDimension(world.grid);
  return (length*breadth).toString().length;
  },

  createPrintableBoard : function(grid){
  let longestLength = this.calculateLongestElementLength(grid);
  let printableBoard= grid.map((row)=>row.map((col)=>{
    let lengthDifference = longestLength - col.toString().length;
    let prefixString = new Array(lengthDifference).fill(' ').join('');
    return prefixString + col;
  }));
  printableBoard = printableBoard.map((row) => '|' + row.join('|')+ '|');
  let borderLength = printableBoard[0].length;
  let border = repeatCharacter(borderLength, "-");
  printableBoard = border + "\n" + printableBoard.join("\n" + border + "\n")+ "\n" + border;
  return printableBoard;
  }
}

module.exports = { 
  world 
};
