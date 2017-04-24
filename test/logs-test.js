// const assert = require('chai').assert;
// var Log = require('../lib/logs.js');


// describe('Log', function () {
//   it('should be a function', function () {
//     assert.isFunction(Log);
//   });

//   it('should instantiate our friend the log', function () {
//     var log = new Log(0,0,2,50);
//     assert.isObject(log);
//   });

//   it('should have an x coordinate', function(){
//     var log = new Log(0,0,2,50);
//     assert.equal(log.x, 0);
//   });

//   it('should have a y coordinate', function(){
//     var log = new Log(0,0,2,50);
//     assert.equal(log.y, 0);
//   });

//   it('should have a velocity', function(){
//     var log = new Log(0,0,2,50);
//     assert.equal(log.vx, 2);
//   });

//   it('should have a width', function(){
//     var log = new Log(0,0,2,50);
//     assert.equal(log.width, 50);
//   });

//   it('should spawn a new log when drawn', function () {
//     var log = new Log(0,0,2,50);
//     assert.isFunction(log.draw);
//   });

//   it('should always be moving 2px to the right', function () {
//     var log = new Log(50,0,2,50);
//     log.move();
//     assert.equal(log.x, 52);
//   });
// });
