var Frog = require('./frog.js');
var CarLeft = require('./carLeft.js');
var CarRight = require('./carRight.js');
var Log = require('./logs.js');
var Turtle = require('./turtles.js');
var LilyPad = require('./lily-pad.js');
var Score = require('./score.js');
var GameOver = require('./gameover.js');
var StartScreen = require('./startscreen.js');
var WinScreen = require('./winscreen.js');

var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var rightCarImg = document.getElementById("right-car-img");
var leftCarImg = document.getElementById("left-car-img");
var frogImg = document.getElementById("frog-img");
var turtleImg = document.getElementById("turtle-img");
var thinLogImg = document.getElementById("thin-log-img");
var deadFrogImg = document.getElementById("dead-frog-img");
var startScreenImg = document.getElementById("start-screen-img");
var winImg = document.getElementById("win-img");
var froggerMusic = document.getElementById("main-audio");
var froggerIntro = document.getElementById("intro-audio");
var deathMusic = document.getElementById("death-audio");
var winMusic = document.getElementById("win-audio");

var World = function(canvas, ctx, width, height){
  this.canvas = canvas;
  this.ctx = ctx;
  this.width = width;
  this.height = height;
};

  var frog = new Frog((width-50)/2, height -100, 45, 50);

  var frogs = [];

  frogs.push(new Frog(-5000, 0, 45, 50));
  frogs.push(new Frog(-5000, 0, 45, 50));
  frogs.push(new Frog(-5000, 0, 45, 50));
  frogs.push(new Frog(-5000, 0, 45, 50));
  var frogE = new Frog(550, 650, 45, 50);
  var frogF = new Frog(500, 650, 45, 50);
  var frogG = new Frog(450, 650, 45, 50);
  var score = new Score();
  var gameover = new GameOver();
  var startScreen = new StartScreen();
  var win = new WinScreen();

  var updateScore = 0;
  var death = false;
  var start = false;
  var counter = 0;
  var collide = false;

  document.addEventListener('keydown', function(e) {
    if(e.keyCode == 37) {
      e.preventDefault();
      frog.frogLeft();
    }
    if(e.keyCode == 38) {
      e.preventDefault();
      frog.frogUp();
      return updateScore += 10;
    }
    if(e.keyCode == 39) {
      e.preventDefault();
      frog.frogRight();
    }
    if(e.keyCode == 40) {
      e.preventDefault();
      frog.frogDown();
    }
  });

  World.prototype.drawings = function() {
    frog.drawFrog(ctx, frogImg);
    frogs.forEach(function(frogs, i){
      frogs.drawFrog(ctx, frogImg);
    });
    frogE.drawFrog(ctx, frogImg);
    frogF.drawFrog(ctx, frogImg);
    frogG.drawFrog(ctx, frogImg);
    score.draw(ctx, updateScore);
  };

  World.prototype.objectLoops = function() {
    leftCar.forEach(function(car){
      car.draw(ctx, leftCarImg).move(width);
    });
    rightCar.forEach(function(car){
      car.draw(ctx, rightCarImg).move(width);
    });
    allLogs.forEach(function(log){
      log.draw(ctx, thinLogImg).move(width);
    });
    allTurtles.forEach(function(turtle){
      turtle.draw(ctx, turtleImg).move();
    });
    allLilyPads.forEach(function(lilypad){
      lilypad.draw(ctx);
    });
  };

  var leftCar = [];
  var rightCar = [];

  leftCar.push(new CarLeft(50, 550, 1, 50));
  leftCar.push(new CarLeft(250, 550, 1, 50));
  leftCar.push(new CarLeft(450, 550, 1, 50));
  rightCar.push(new CarRight(600, 500, -1, 50));
  rightCar.push(new CarRight(400, 500, -1, 50));
  rightCar.push(new CarRight(50, 500, -1, 50));
  leftCar.push(new CarLeft(0, 450, 1, 50));
  leftCar.push(new CarLeft(100, 450, 1, 50));
  leftCar.push(new CarLeft(400, 450, 1, 50));
  rightCar.push(new CarRight(400, 400, -1, 50));
  rightCar.push(new CarRight(150, 400, -1, 50));
  leftCar.push(new CarLeft(300, 350, 1, 50));
  leftCar.push(new CarLeft(100, 350, 1, 50));

  var allLogs = [];

  allLogs.push(new Log(-200, 200, 1, 100));
  allLogs.push(new Log(50, 200, 1, 100));
  allLogs.push(new Log(450, 200, 1, 100));
  allLogs.push(new Log(350, 150, 2, 200));
  allLogs.push(new Log(0, 150, 2, 200));
  allLogs.push(new Log(-200, 50, 1.5, 150));
  allLogs.push(new Log(100, 50, 1.5, 150));
  allLogs.push(new Log(450, 50, 1.5, 150));

  var allTurtles = [];

  allTurtles.push(new Turtle(-100, 251, -1, 150));
  allTurtles.push(new Turtle(250, 251, -1, 150));
  allTurtles.push(new Turtle(600, 251, -1, 150));
  allTurtles.push(new Turtle(-150, 100, -1.5, 150));
  allTurtles.push(new Turtle(50, 100, -1.5, 150));
  allTurtles.push(new Turtle(350, 100, -1.5, 150));
  allTurtles.push(new Turtle(650, 100, -1.5, 150));

  var allLilyPads = [];

  allLilyPads.push(new LilyPad(90, 0));
  allLilyPads.push(new LilyPad(190, 0));
  allLilyPads.push(new LilyPad(290, 0));
  allLilyPads.push(new LilyPad(390, 0));
  allLilyPads.push(new LilyPad(490, 0));

  function incrementSpeeds(){
    leftCar.forEach(function(car){
      car.vx = car.vx + 0.5;
    });
    rightCar.forEach(function(car){
      car.vx = car.vx - 0.5;
    });
  }



  World.prototype.frogCollision = function(){
    frogs.forEach(function(frogs, i){
    if (frog.x < frogs.x + frogs.width &&
     frog.x + frog.width > frogs.x &&
     frog.y < frogs.y + frogs.height &&
     frog.height + frog.y > frogs.y) {
      frog.x = (width-50)/2;
      frog.y = height -100;
      lives--;
      }
    });
  };



  World.prototype.leftCarCollision = function(){
    leftCar.forEach(function(car, i){
    if (frog.x < car.x + car.width &&
     frog.x + frog.width > car.x &&
     frog.y < car.y + car.height &&
     frog.height + frog.y > car.y) {
      frog.x = (width-50)/2;
      frog.y = height -100;
      lives--;
      }
    });
  };

  World.prototype.rightCarCollision = function () {
    rightCar.forEach(function(car, i){
    if (frog.x < car.x + car.width &&
     frog.x + frog.width > car.x &&
     frog.y < car.y + car.height &&
     frog.height + frog.y > car.y) {
      frog.x = (width-50)/2;
      frog.y = height -100;
      lives--;
      }
    });
  };

World.prototype.logCollusion = function() {
    allLogs.forEach(function(log, i){
    if (frog.x < log.x + log.width - 30 &&
     frog.x + frog.width > log.x + 30 &&
     frog.y < log.y + log.height &&
     frog.height + frog.y > log.y) {
       (frog.x = frog.x + log.vx);
       (frog.y = log.y + 1);
       collide = true;
       }
     });
  };

  World.prototype.turtleCollusion =function() {
    allTurtles.forEach(function(turtle, i){
    if (frog.x < turtle.x + turtle.width -20 &&
     frog.x + frog.width > turtle.x + 20 &&
     frog.y < turtle.y + turtle.height &&
     frog.height + frog.y > turtle.y) {
       (frog.x = frog.x + turtle.vx);
       (frog.y = turtle.y + 1);
       collide = true;
     }
   });
 };

World.prototype.lilyPadCollusion = function() {
    allLilyPads.forEach(function(lilypad, i){
    if (frog.x < lilypad.x + lilypad.width &&
     frog.x + frog.width > lilypad.x &&
     frog.y < lilypad.y + lilypad.height &&
     frog.height + frog.y > lilypad.y) {
       (frog.x = lilypad.x -15);
       (frog.y = lilypad.y + 1);
       collide = true;
       frog.x = (width -50)/2;
       frog.y = height -100;
       counter ++;
       if(counter === 1) {
         frogs[0].x = lilypad.x-15;
         incrementSpeeds();
       }
       else if(counter === 2) {
        frogs[1].x = lilypad.x-15;
        incrementSpeeds();
       }
       else if(counter === 3) {
        frogs[2].x = lilypad.x-15;
        incrementSpeeds();
       }
       else if(counter === 4) {
        frogs[3].x = lilypad.x-15;
        incrementSpeeds();
       }
       return updateScore += 90;
    }
  });
};


  World.prototype.waterDeath = function () {
    if(frog.y < 300) {
    if(collide === false){
      // gameover.draw(ctx, deadFrogImg, width, height);
      // death = true;
      frog.x = (width-50)/2;
      frog.y = height -100;
      lives--;
      }
    else if(collide === true){
      collide = false;
      }
    }
  };


  function spaceBarReload(){
    document.addEventListener('keydown', function(e) {
      if(e.keyCode == 32) {
        e.preventDefault();
        resetDefaults();
      }
    });
  }

  function resetDefaults(){
    lives = 3;
    frogE.width = 50;
    frogF.width = 50;
    frogG.width = 50;
    frogs.forEach(function(frogs, i){
      frogs.x = -5000;
    });
    updateScore = 0;
    frog.x = (width -50)/2;
    frog.y = height -100;
    start = true;
    death = false;
    playMain();
  }


  function spaceBarRestart(){
    document.addEventListener('keydown', function(e) {
      if(e.keyCode == 32) {
        e.preventDefault();
        document.location.reload();
      }
    });
  }

World.prototype.startTheScreen = function(){
    if(start === false){
    startScreen.draw(ctx, startScreenImg, width, height);
    playIntro();
    spaceBarReload();
    }
  };

  var lives = 3;

World.prototype.tryAgainScreen = function(){
    if(lives === 2){
      frogG.width = 0;
    }
    else if(lives === 1){
      frogF.width = 0;
    }
    else if(lives === 0){
      death = true;
      frogE.width = 0;
      deathScreen();
    }
  };

  World.prototype.winScreen = function() {
      if(counter === 5){
      playWin();
      win.draw(ctx, winImg, this.width, this.height);
      spaceBarRestart();
    }
  };

function deathScreen(){
    if(lives === 0){
      playDeath();
      gameover.draw(ctx, deadFrogImg, width, height);
      spaceBarReload();
      // death = false;
    }
  }

  function playMain() {
    deathMusic.pause();
    froggerIntro.pause();
    froggerMusic.play();
  }

  function playIntro() {
    froggerIntro.play();
  }

  function playDeath() {
    froggerMusic.pause();
    deathMusic.play();
  }

  function playWin() {
    froggerMusic.pause();
    winMusic.play();
  }

module.exports = World;