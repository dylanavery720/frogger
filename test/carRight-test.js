// const assert = require('chai').assert;
// var CarRight = require('../lib/carRight.js');


// describe('CarRight', function () {
//   it('should be a function', function () {
//     assert.isFunction(CarRight);
//   });

//   it('should instantiate a wayward car heading left', function () {
//     var carRight = new CarRight(0,0,2,50);
//     assert.isObject(carRight);
//   });

//   it('should have an x coordinate', function () {
//     var carRight = new CarRight(0,0,2,50);
//     assert.equal(carRight.x, 0);
//   });

//   it('should have a y coordinate', function () {
//     var carRight = new CarRight(0,0,2,50);
//     assert.equal(carRight.y, 0);
//   });

//   it('should have a velocity', function () {
//     var carRight = new CarRight(0,0,2,50);
//     assert.equal(carRight.vx, 2);
//   });

//   it('should have a height', function () {
//     var carRight = new CarRight(0,0,2,50);
//     assert.equal(carRight.height, 50);
//   });

//   it('should have a width', function () {
//     var carRight = new CarRight(0,0,2,50);
//     assert.equal(carRight.width, 50);
//   });

//   it('should spawn a new car when drawn', function () {
//     var carRight = new CarRight(0,0,2,50);
//     assert.isFunction(carRight.draw);
//   });

//   it('should always be moving 2px to the left', function () {
//     var carRight = new CarRight(50,0,2,50);
//     carRight.move();
//     assert.equal(carRight.x, 52);
//   });
// });
