// const assert = require('chai').assert;
// var Frog = require('../lib/frog.js');


// describe('Frog', function () {
//   it('should be a function', function () {
//     assert.isFunction(Frog);
//   });

//   it('should instantiate our friend the frog', function () {
//     var frog = new Frog(0,0,50,50);
//     assert.isObject(frog);
//   });

//   it('should have an x coordinate', function () {
//     var frog = new Frog(0,0,50,50);
//     assert.equal(frog.x, 0);
//   });

//   it('should have a y coordinate', function () {
//     var frog = new Frog(0,0,50,50);
//     assert.equal(frog.y, 0);
//   });

//   it('should have a width', function () {
//     var frog = new Frog(0,0,50,50);
//     assert.equal(frog.width, 50);
//   });

//   it('should have a height', function () {
//     var frog = new Frog(0,0,50,50);
//     assert.equal(frog.height, 50);
//   });

//   it('should take its shape and form when drawn', function() {
//     var frog = new Frog(0,0,50,50);
//     assert.isFunction(frog.drawFrog);
//   });

//   it('should move left when left arrow key is pressed', function() {
//     var frog = new Frog(50,0,50,50);
//     assert.equal(frog.x, 50);
//     frog.frogLeft();
//     assert.equal(frog.x, 0);
//   });

//   it('should move right when right arrow key is pressed', function() {
//     var frog = new Frog(0,0,50,50);
//     frog.frogRight();
//     assert.equal(frog.x, 50);
//   });

//   it('should move up when up arrow key is pressed', function() {
//     var frog = new Frog(0,50,50,50);
//     frog.frogUp();
//     assert.equal(frog.y, 0);
//   });

//   it('should move down when down arrow key is pressed', function() {
//     var frog = new Frog(0,0,50,50);
//     frog.frogDown();
//     assert.equal(frog.y, 50);
//   });
// });
