const {
  equal, deepEqual
} = require('assert');

let {
  world
} = require('../src/gameLibrary.js');

world.grid = [[1, 0, 1], [1, 0, 1], [1, 0, 1]];

describe("test for isNeighbourValid ()", function() {
  it("should return false for negative neighbour positions", function() {
    equal(world.isNeighbourValid({ latitude: 0, longitude: 0 }), true);
    equal(world.isNeighbourValid({ latitude: -1, longitude: 0 }), false);
    equal(world.isNeighbourValid({ latitude: 0, longitude: -2 }), false);
    equal(world.isNeighbourValid({ latitude: -1, longitude: -1 }), false);
  });

  it("should return false for neighbour position greater than or equal to grid length", function() {
    equal(world.isNeighbourValid({ latitude: 1, longitude: 3 }), false);
    equal(world.isNeighbourValid({ latitude: 3, longitude: 1 }), false);
    equal(world.isNeighbourValid({ latitude: 3, longitude: 3 }), false);
  });

  it('should return true for valid neighbour positions', function() {
    equal(world.isNeighbourValid({ latitude: 2, longitude: 2 }), true);
  })
});

describe("test for isNeighbourAlive ()", function() {
  it("should return neighbour state", function() {
    world.grid = [[1, 0, 1], [1, 0, 1], [1, 0, 1]];
    equal(world.isNeighbourAlive({ latitude: 0, longitude: 0 }), true);
    equal(world.isNeighbourAlive({ latitude: 1, longitude: 0 }), true);
    equal(world.isNeighbourAlive({ latitude: 0, longitude: 1 }), false);
    equal(world.isNeighbourAlive({ latitude: 1, longitude: 1 }), false);
  });
});

describe("test for getAllNeighbours ()", function() {
  it("should return all possible neighbour", function() {
    deepEqual(world.getAllNeighbours({ latitude: 1, longitude: 1 }), 
      [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]);
  });
});

describe("test for getAliveNeighboursCount ()", function() {
  it("should return number of alive neighbours ", function() {
    world.grid = [[1, 0, 1], [1, 0, 1], [1, 0, 1]];
    equal(world.getAliveNeighboursCount({ latitude: 0, longitude: 0 }), 1);
    equal(world.getAliveNeighboursCount({ latitude: 1, longitude: 0 }), 2);
    equal(world.getAliveNeighboursCount({ latitude: 0, longitude: 1 }), 4);
    equal(world.getAliveNeighboursCount({ latitude: 1, longitude: 1 }), 6);
  });
});
