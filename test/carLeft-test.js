// const assert = require('chai').assert;
// var CarLeft = require('../lib/carLeft.js');


// describe('CarLeft', function () {
//   it('should be a function', function () {
//     assert.isFunction(CarLeft);
//   });

//   it('should instantiate a wayward car heading left', function () {
//     var carLeft = new CarLeft(0,0,2,50);
//     assert.isObject(carLeft);
//   });

//   it('should have an x coordinate', function () {
//     var carLeft = new CarLeft(0,0,2,50);
//     assert.equal(carLeft.x, 0);
//   });

//   it('should have a y coordinate', function () {
//     var carLeft = new CarLeft(0,0,2,50);
//     assert.equal(carLeft.y, 0);
//   });

//   it('should have a velocity', function () {
//     var carLeft = new CarLeft(0,0,2,50);
//     assert.equal(carLeft.vx, 2);
//   });

//   it('should have a height', function () {
//     var carLeft = new CarLeft(0,0,2,50);
//     assert.equal(carLeft.height, 50);
//   });

//   it('should have a width', function () {
//     var carLeft = new CarLeft(0,0,2,50);
//     assert.equal(carLeft.width, 50);
//   });

//   it('should spawn a new car when drawn', function () {
//     var carLeft = new CarLeft(0,0,2,50);
//     assert.isFunction(carLeft.draw);
//   });

//   it('should always be moving 2px to the right', function () {
//     var carLeft = new CarLeft(50,0,2,50);
//     carLeft.move();
//     assert.equal(carLeft.x, 52);
//   });
// });
