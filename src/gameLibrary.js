const world = {
  grid :[],

  generateGrid : function(size){
    let gridCells = new Array(size).fill(0);
    let grid = gridCells.map((x)=> new Array(size).fill(0));
    return grid;
  },

  generateGridPosition : function(size){
    this.grid = this.generateGrid(size);
    let position=1;
    return this.grid = this.grid.map((x)=> x.map((y) => position++));
  },

  getWorldSize : function(grid){
    return grid.length;
  },

  isNeighbourValid : function(position) {
    let { latitude, longitude } = position;
    return !( Math.min(latitude,longitude) < 0 || Math.max(latitude,longitude) >= this.getWorldSize(this.grid));
  },

  isNeighbourAlive : function(position) {
    let { latitude, longitude } = position;
    return (this.isNeighbourValid(position)) &&  (this.grid[latitude][longitude] == 1);
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
    return this.getAllNeighbours(position).map((x)=> this.isNeighbourAlive({ latitude:x[0], longitude:x[1]})).map((x)=> 0+x);
  },

  getAliveNeighboursCount : function(position) {
    return this.getAliveNeighbours(position).reduce((x,y)=> x+y);
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
    let worldSize = this.getWorldSize(this.grid);
    for(let latitude=0; latitude<worldSize; latitude++){
      for(let longitude=0;longitude<worldSize; longitude++){
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
  }
}

module.exports = { 
  world 
};
