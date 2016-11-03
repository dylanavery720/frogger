const assert = require('chai').assert;
var Frog = require('../lib/frog.js');


describe('Frog', function () {
  it('should be a function', function () {
    assert.isFunction(Frog);
  });

  it('should have an x coordinate', function () {
    var frog = new Frog(0,0,50,50);
    assert.equal(frog.x, 0);
  });

  it('should have a y coordinate', function () {
    var frog = new Frog(0,0,50,50);
    assert.equal(frog.y, 0);
  });

  it('should have a width', function () {
    var frog = new Frog(0,0,50,50);
    assert.equal(frog.width, 50);
  });

  it('should have a height', function () {
    var frog = new Frog(0,0,50,50);
    assert.equal(frog.height, 50);
  });
});
