/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var World = __webpack_require__(1);
	var Collision = __webpack_require__(8);
	// var Frog = require('./frog.js');
	var canvas = document.getElementById("frogger");
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var world = new World(canvas, ctx, width, height);
	var collision = new Collision();

	requestAnimationFrame(function gameLoop() {
	  ctx.clearRect(0, 0, width, height);
	  collision.logLoops();
	  world.drawings();
	  world.collisionCheck();
	  world.checkLives();
	  world.startTheScreen();
	  world.winScreen();
	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Frog = __webpack_require__(2);
	var Score = __webpack_require__(3);
	var GameOver = __webpack_require__(4);
	var StartScreen = __webpack_require__(5);
	var WinScreen = __webpack_require__(6);
	var Music = __webpack_require__(7);
	var Collision = __webpack_require__(8);

	var canvas = document.getElementById("frogger");
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;

	var frogImg = document.getElementById("frog-img");
	var deadFrogImg = document.getElementById("dead-frog-img");
	var startScreenImg = document.getElementById("start-screen-img");
	var winImg = document.getElementById("win-img");
	var froggerMusic = document.getElementById("main-audio");
	var froggerIntro = document.getElementById("intro-audio");
	var deathMusic = document.getElementById("death-audio");
	var winMusic = document.getElementById("win-audio");
	var hopMusic = document.getElementById("hop-audio");

	var World = function (width, height, canvas, ctx) {
	  this.canvas = canvas;
	  this.ctx = ctx;
	  this.width = width;
	  this.height = height;
	};

	var collision = new Collision();

	var frog = new Frog((width - 50) / 2, height - 100, 45, 50, ctx);
	var frogA = new Frog(550, 650, 45, 50, ctx);
	var frogB = new Frog(500, 650, 45, 50, ctx);
	var frogC = new Frog(450, 650, 45, 50, ctx);

	var score = new Score();
	var gameover = new GameOver();
	var startScreen = new StartScreen();
	var win = new WinScreen();
	var music = new Music();

	var updateScore = 0;
	var lives = collision.lives;
	var start = false;
	var collide = false;
	var death = false;

	World.prototype.drawings = function () {
	  frog.drawFrog(ctx, frogImg);
	  score.draw(ctx, updateScore);
	  frogA.drawFrog(ctx, frogImg);
	  frogB.drawFrog(ctx, frogImg);
	  frogC.drawFrog(ctx, frogImg);
	};

	World.prototype.collisionCheck = function () {
	  collision.logCollusion(frog);
	  collision.turtleCollusion(frog);
	  collision.leftCarCollision(frog, lives);
	  collision.rightCarCollision(frog, lives);
	  collision.frogCollision(frog, lives);
	  collision.lilyPadCollusion(frog);
	  collision.waterDeath(frog, lives);
	  collide = collision.collide;
	};

	document.addEventListener('keydown', function (e) {
	  if (e.keyCode === 37) {
	    e.preventDefault();
	    frog.frogLeft();
	    music.playHop(hopMusic);
	  }
	  if (e.keyCode === 38) {
	    e.preventDefault();
	    frog.frogUp();
	    music.playHop(hopMusic);
	    return updateScore += 10;
	  }
	  if (e.keyCode === 39) {
	    e.preventDefault();
	    frog.frogRight();
	    music.playHop(hopMusic);
	  }
	  if (e.keyCode === 40) {
	    e.preventDefault();
	    frog.frogDown();
	    music.playHop(hopMusic);
	    return updateScore > 0 ? updateScore -= 10 : updateScore -= 0;
	  }
	});

	function spaceBarReload() {
	  document.addEventListener('keydown', function (e) {
	    if (e.keyCode === 32) {
	      e.preventDefault();
	      resetDefaults();
	    }
	  });
	}

	function resetDefaults() {
	  collision.lives = 3;
	  frogA.width = 50;
	  frogB.width = 50;
	  frogC.width = 50;
	  collision.resetPlaceholders();
	  updateScore = 0;
	  frog.resetFrog();
	  collision.resetSpeeds();
	  start = true;
	  death = false;
	  collision.counter = 0;
	  music.playMain(winMusic, deathMusic, froggerIntro, froggerMusic);
	}

	World.prototype.startTheScreen = function () {
	  if (start === false) {
	    startScreen.draw(ctx, startScreenImg, width, height);
	    music.playIntro(froggerIntro);
	    spaceBarReload();
	  }
	};

	World.prototype.checkLives = function () {
	  if (collision.lives === 2) {
	    frogC.width = 0;
	  } else if (collision.lives === 1) {
	    frogB.width = 0;
	  } else if (collision.lives <= 0) {
	    death = true;
	    frogA.width = 0;
	    music.playDeath(froggerMusic, deathMusic);
	    gameover.draw(ctx, deadFrogImg, width, height);
	    spaceBarReload();
	  }
	};

	World.prototype.winScreen = function () {
	  if (collision.counter === 5) {
	    music.playWin(winMusic, froggerMusic);
	    win.draw(ctx, winImg, this.width, this.height);
	    spaceBarReload();
	  }
	};

	module.exports = World;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var frogImg = document.getElementById("frog-img");

	var Frog = function (x, y, height, width, ctx) {
	  this.x = x;
	  this.y = y;
	  this.height = height;
	  this.width = width;
	  this.ctx = ctx;
	};

	Frog.prototype.drawFrog = function () {
	  this.ctx.beginPath();
	  this.ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
	  this.ctx.fillStyle = "transparent";
	  this.ctx.fill();
	  this.ctx.closePath();
	};

	Frog.prototype.frogLeft = function () {
	  if (this.x >= 0 + this.width) {
	    this.x -= 50;
	  }
	};

	Frog.prototype.frogRight = function () {
	  if (this.x + this.width <= 600 - this.width) {
	    this.x += 50;
	  }
	};

	Frog.prototype.frogUp = function () {
	  this.y -= 50;
	};

	Frog.prototype.frogDown = function () {
	  if (this.y <= 550) {
	    this.y += 50;
	  }
	};

	Frog.prototype.resetFrog = function () {
	  this.x = (600 - 50) / 2;
	  this.y = 700 - 100;
	};

	module.exports = Frog;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Score() {}

	Score.prototype.draw = function (ctx, updateScore) {
	  ctx.fillStyle = "white";
	  ctx.font = '30px Krungthep';
	  ctx.fillText(updateScore, 112, 686);
	  return this;
	};

	module.exports = Score;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function GameOver() {
	  this.x = 0;
	  this.y = 0;
	  this.width = 600;
	  this.height = 700;
	}

	GameOver.prototype.draw = function (ctx, deadFrogImg, width, height) {
	  ctx.clearRect(0, 0, width, height);
	  ctx.drawImage(deadFrogImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = 'transparent';
	};

	module.exports = GameOver;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function StartScreen() {
	  this.x = 0;
	  this.y = 0;
	  this.width = 600;
	  this.height = 700;
	}

	StartScreen.prototype.draw = function (ctx, startScreenImg, width, height) {
	  ctx.clearRect(0, 0, width, height);
	  ctx.drawImage(startScreenImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = 'transparent';
	};

	module.exports = StartScreen;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function WinScreen() {
	  this.x = 0;
	  this.y = 0;
	  this.width = 600;
	  this.height = 700;
	}

	WinScreen.prototype.draw = function (ctx, winImg, width, height) {
	  ctx.clearRect(0, 0, width, height);
	  ctx.drawImage(winImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = 'transparent';
	};

	module.exports = WinScreen;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var Music = function () {};

	Music.prototype.playMain = function (winMusic, deathMusic, froggerIntro, froggerMusic) {
	  winMusic.pause();
	  deathMusic.pause();
	  froggerIntro.pause();
	  froggerMusic.play();
	};

	Music.prototype.playIntro = function (froggerIntro) {
	  froggerIntro.play();
	};

	Music.prototype.playDeath = function (froggerMusic, deathMusic) {
	  froggerMusic.pause();
	  deathMusic.play();
	};

	Music.prototype.playWin = function (winMusic, froggerMusic) {
	  froggerMusic.pause();
	  winMusic.play();
	};

	Music.prototype.playHop = function (hopMusic) {
	  hopMusic.pause();
	  hopMusic.currentTime = 0;
	  hopMusic.play();
	};

	module.exports = Music;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Log = __webpack_require__(9);
	var Turtle = __webpack_require__(10);
	var CarLeft = __webpack_require__(11);
	var CarRight = __webpack_require__(12);
	var Frog = __webpack_require__(2);
	var LilyPad = __webpack_require__(13);
	var canvas = document.getElementById("frogger");
	var ctx = canvas.getContext("2d");

	var Collision = function (ctx) {
	  this.ctx = ctx;
	  this.collide = false;
	  this.lives = 3;
	  this.counter = 0;
	};

	Collision.prototype.logLoops = function (ctx, thinLogImg, turtleImg, leftCarImg, rightCarImg, frogImg, width) {
	  allLogs.forEach(function (log) {
	    log.draw(ctx, thinLogImg).move(width);
	  });
	  allTurtles.forEach(function (turtle) {
	    turtle.draw(ctx, turtleImg).move();
	  });
	  leftCar.forEach(function (car) {
	    car.draw(ctx, leftCarImg).move(width);
	  });
	  rightCar.forEach(function (car) {
	    car.draw(ctx, rightCarImg).move(width);
	  });
	  frogs.forEach(function (frogs) {
	    frogs.drawFrog(ctx, frogImg);
	  });
	  allLilyPads.forEach(function (lilypad) {
	    lilypad.draw(ctx);
	  });
	};

	Collision.prototype.logCollusion = function (frog) {
	  var self = this;
	  allLogs.forEach(function (item) {
	    logAndTurtleCollision(item, frog, self);
	  });
	};

	Collision.prototype.turtleCollusion = function (frog) {
	  var self = this;
	  allTurtles.forEach(function (item) {
	    logAndTurtleCollision(item, frog, self);
	  });
	};

	function logAndTurtleCollision(item, frog, self) {
	  if (frog.x < item.x + item.width - 25 && frog.x + frog.width > item.x + 25 && frog.y < item.y + item.height && frog.height + frog.y > item.y) {
	    frog.x = frog.x + item.vx;
	    frog.y = item.y + 1;
	    self.collide = true;
	  }
	}

	function frogAndCarCollision(item, frog, self) {
	  if (frog.x < item.x + item.width && frog.x + frog.width > item.x && frog.y < item.y + item.height && frog.height + frog.y > item.y) {
	    frog.resetFrog();
	    self.lives--;
	  }
	}

	Collision.prototype.frogCollision = function (frog) {
	  var self = this;
	  frogs.forEach(function (item) {
	    frogAndCarCollision(item, frog, self);
	  });
	};

	Collision.prototype.leftCarCollision = function (frog) {
	  var self = this;
	  leftCar.forEach(function (item) {
	    frogAndCarCollision(item, frog, self);
	  });
	};

	Collision.prototype.rightCarCollision = function (frog) {
	  var self = this;
	  rightCar.forEach(function (item) {
	    frogAndCarCollision(item, frog, self);
	  });
	};

	Collision.prototype.lilyPadCollusion = function (frog, updateScore) {
	  var self = this;
	  allLilyPads.forEach(function (lilypad) {
	    if (frog.x < lilypad.x + lilypad.width && frog.x + frog.width > lilypad.x && frog.y < lilypad.y + lilypad.height && frog.height + frog.y > lilypad.y) {
	      frog.x = lilypad.x - 15;
	      frog.y = lilypad.y + 1;
	      self.collide = true;
	      frog.resetFrog();
	      self.counter++;
	      if (self.counter === 1) {
	        frogs[0].x = lilypad.x - 15;
	        incrementSpeeds();
	      } else if (self.counter === 2) {
	        frogs[1].x = lilypad.x - 15;
	        incrementSpeeds();
	      } else if (self.counter === 3) {
	        frogs[2].x = lilypad.x - 15;
	        incrementSpeeds();
	      } else if (self.counter === 4) {
	        frogs[3].x = lilypad.x - 15;
	        incrementSpeeds();
	      }
	      return updateScore += 90;
	    }
	  });
	};

	Collision.prototype.waterDeath = function (frog) {
	  var self = this;
	  if (frog.y < 300) {
	    if (self.collide === false) {
	      frog.resetFrog();
	      self.lives--;
	    } else if (self.collide === true) {
	      self.collide = false;
	    }
	  }
	};

	Collision.prototype.resetPlaceholders = function () {
	  frogs.forEach(function (frogs) {
	    frogs.x = -5000;
	  });
	};

	function incrementSpeeds() {
	  rightCar.forEach(function (car) {
	    car.vx = car.vx - 0.5;
	  });
	  leftCar.forEach(function (car) {
	    car.vx = car.vx + 0.5;
	  });
	}

	Collision.prototype.resetSpeeds = function () {
	  rightCar.forEach(function (car) {
	    car.vx = -1;
	  });
	  leftCar.forEach(function (car) {
	    car.vx = +1;
	  });
	};

	var allLogs = [];
	allLogs.push(new Log(-200, 200, 1, 100, ctx));
	allLogs.push(new Log(50, 200, 1, 100, ctx));
	allLogs.push(new Log(450, 200, 1, 100, ctx));
	allLogs.push(new Log(350, 150, 2, 200, ctx));
	allLogs.push(new Log(0, 150, 2, 200, ctx));
	allLogs.push(new Log(-200, 50, 1.5, 150, ctx));
	allLogs.push(new Log(100, 50, 1.5, 150, ctx));
	allLogs.push(new Log(450, 50, 1.5, 150, ctx));

	var allTurtles = [];
	allTurtles.push(new Turtle(-100, 251, -1, 150, ctx));
	allTurtles.push(new Turtle(250, 251, -1, 150, ctx));
	allTurtles.push(new Turtle(600, 251, -1, 150, ctx));
	allTurtles.push(new Turtle(-150, 100, -1.5, 150, ctx));
	allTurtles.push(new Turtle(50, 100, -1.5, 150, ctx));
	allTurtles.push(new Turtle(350, 100, -1.5, 150, ctx));
	allTurtles.push(new Turtle(650, 100, -1.5, 150, ctx));

	var leftCar = [];
	var rightCar = [];
	leftCar.push(new CarLeft(50, 550, 1, 50, ctx));
	leftCar.push(new CarLeft(250, 550, 1, 50, ctx));
	leftCar.push(new CarLeft(450, 550, 1, 50, ctx));
	rightCar.push(new CarRight(600, 500, -1, 50, ctx));
	rightCar.push(new CarRight(400, 500, -1, 50, ctx));
	rightCar.push(new CarRight(50, 500, -1, 50, ctx));
	leftCar.push(new CarLeft(0, 450, 1, 50, ctx));
	leftCar.push(new CarLeft(100, 450, 1, 50, ctx));
	leftCar.push(new CarLeft(400, 450, 1, 50, ctx));
	rightCar.push(new CarRight(400, 400, -1, 50, ctx));
	rightCar.push(new CarRight(150, 400, -1, 50, ctx));
	leftCar.push(new CarLeft(300, 350, 1, 50, ctx));
	leftCar.push(new CarLeft(100, 350, 1, 50, ctx));

	var frogs = [];
	frogs.push(new Frog(-5000, 0, 45, 50, ctx));
	frogs.push(new Frog(-5000, 0, 45, 50, ctx));
	frogs.push(new Frog(-5000, 0, 45, 50, ctx));
	frogs.push(new Frog(-5000, 0, 45, 50, ctx));

	var allLilyPads = [];
	allLilyPads.push(new LilyPad(90, 0, ctx));
	allLilyPads.push(new LilyPad(190, 0, ctx));
	allLilyPads.push(new LilyPad(290, 0, ctx));
	allLilyPads.push(new LilyPad(390, 0, ctx));
	allLilyPads.push(new LilyPad(490, 0, ctx));

	module.exports = Collision;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var thinLogImg = document.getElementById("thin-log-img");

	function Log(x, y, vx, width, ctx) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 48;
	  this.width = width;
	  this.ctx = ctx;
	}

	Log.prototype.draw = function () {
	  this.ctx.drawImage(thinLogImg, this.x, this.y, this.width, this.height);
	  this.ctx.fillStyle = "transparent";
	  return this;
	};

	Log.prototype.move = function () {
	  this.x += this.vx;
	  if (this.x > 600 + 50) {
	    this.x = -200;
	    return this;
	  }
	};

	module.exports = Log;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var turtleImg = document.getElementById("turtle-img");

	function Turtle(x, y, vx, width, ctx) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 48;
	  this.width = width;
	  this.ctx = ctx;
	}

	Turtle.prototype.draw = function () {
	  this.ctx.drawImage(turtleImg, this.x, this.y, this.width, this.height);
	  this.ctx.fillStyle = 'transparent';
	  return this;
	};

	Turtle.prototype.move = function () {
	  this.x += this.vx;
	  if (this.x < -200) {
	    this.x = 800;
	    return this;
	  }
	};

	module.exports = Turtle;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var leftCarImg = document.getElementById("left-car-img");

	function CarLeft(x, y, vx, width, ctx) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 50;
	  this.width = width;
	  this.ctx = ctx;
	}

	CarLeft.prototype.draw = function () {
	  this.ctx.fillStyle = 'transparent';
	  this.ctx.drawImage(leftCarImg, this.x, this.y, this.width, this.height);
	  return this;
	};

	CarLeft.prototype.move = function () {
	  this.x += this.vx;
	  if (this.x > 600 + 50) {
	    this.x = -50;
	    return this;
	  }
	};

	module.exports = CarLeft;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var rightCarImg = document.getElementById("right-car-img");

	function CarRight(x, y, vx, width, ctx) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 50;
	  this.width = width;
	  this.ctx = ctx;
	}

	CarRight.prototype.draw = function () {
	  this.ctx.fillStyle = 'transparent';
	  this.ctx.drawImage(rightCarImg, this.x, this.y, this.width, this.height);
	  return this;
	};

	CarRight.prototype.move = function () {
	  this.x += this.vx;
	  if (this.x < -50) {
	    this.x = 650;
	    return this;
	  }
	};

	module.exports = CarRight;

/***/ },
/* 13 */
/***/ function(module, exports) {

	function LilyPad(x, y, ctx) {
	  this.x = x;
	  this.y = y;
	  this.height = 50;
	  this.width = 20;
	  this.ctx = ctx;
	}

	LilyPad.prototype.draw = function () {
	  this.ctx.fillStyle = "transparent";
	  this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	module.exports = LilyPad;

/***/ }
/******/ ]);