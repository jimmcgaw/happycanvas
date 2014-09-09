var MAX_BALLS = 100;

var Particle = function(coords, velocity, mass, friction){
  this.x = coords.x;
  this.y = coords.y;
  this.velocity = velocity;
  this.mass = mass;
  this.friction = friction;
};

var Ball = function(){

};

Ball.prototype.render = function() {
  canvasDrawer.drawBall(ball);
}

var Magnet = function(){

};

var CanvasDrawer = function(elementId) {
  elementId = elementId || '#happycanvas';
  this.canvas = $(elementId);
  this.context = this.canvas.getContext("2d");
};

CanvasDrawer.prototype.drawBall = function(ball) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
};

var Board = function(elementId, canvasDrawer){
  if (this.canvas.length < 0){
    console.error('canvas element with id "' + elementId + '" was not found');
  }
  this._balls = [];
  this.init();
};

Board.prototype.init = function(){
  for (var i = 0; i < MAX_BALLS; i++) {
    var ball = this.createRandomBall();
    this.addBall(ball);
  }
};


Board.prototype.createRandomBall = function(){
  var ball = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    mass: Math.random() * 10,
    friction: 0.8,
    velocity: {
      speed: Math.random() * 10,
      angle: Math.random() * 360
    }
  };
  return ball;
};


Board.prototype.addBall = function(ball){
  if (this._balls.length >= MAX_BALLS){
    console.log('This board is at capacity, not adding ball');
  }
  this._balls.push(ball);
};

Board.prototype.removeBall = function(ball){
  console.log('removeBall not yet implemented');
};

Board.prototype.tick = function(){

  console.log("ticking");

  // getBalls
  // getLaws
  // updatedBalls = applyLaws(ball, laws);
  this.render();
};

Board.prototype.render = function(){
  var ball;
  for (var i = 0; i < this._balls.length; i++) {
    ball = this._balls[i];
    ball.render()
  }
};

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  Meteor.startup(function () {
    var canvasDrawer = CanvasDrawer();
    var board = new Board(canvasDrawe);
    Meteor.setInterval(board.tick, 20);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
