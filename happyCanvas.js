var MAX_BALLS = 100;

var Particle = function(params){
  this.init(params);
};

Particle.prototype.init = function(params) {
  this.x = params.x || 100;
  this.y = params.y || 100;
  this.velocity = params.velocity || {angle: 45, speed: 1};
  this.mass = params.mass || 1;
  this.friction = params.friction || 0.5;
};

var Ball = function(params){
  this.init(params);
  this.radius = params.radius;
  this.canvasDrawer = params.canvasDrawer;
};

Ball.prototype = Particle.prototype;
Ball.constructor = Ball;

Ball.prototype.render = function() {
  this.canvasDrawer.drawCircle(this);
  console.log('1');
}

var Magnet = function(){

};

// DRAWING TOOL
// TAKES A CANVAS
var CanvasDrawer = function(elementId) {
  elementId = elementId || '#happycanvas';
  this.canvas = document.querySelector(elementId);
  this.context = this.canvas.getContext("2d");
  this.width = this.canvas.width;
  this.height = this.canvas.height;
};

CanvasDrawer.prototype.drawCircle = function(params) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
};

var Board = function(canvasDrawer){
  this._balls = [];
  this.canvasDrawer = canvasDrawer;
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
    x: Math.random() * this.canvasDrawer.width,
    y: Math.random() * this.canvasDrawer.height,
    mass: Math.random() * 10,
    friction: 0.8,
    radius: 10,
    velocity: {
      speed: Math.random() * 10,
      angle: Math.random() * 360
    }
  };
  ball.canvasDrawer = this.canvasDrawer;
  return new Ball(ball);
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

  // PHYSICS HERE
  // updatedBalls = applyLaws(ball, laws);

  // RENDER HERE
  this.render();
};

Board.prototype.render = function(){
  this._balls.forEach( function(ball){
    ball.render();
  });
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
    var canvasDrawer = new CanvasDrawer();
    var board = new Board(canvasDrawer);
    Meteor.setInterval(board.tick.bind(board), 20);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
