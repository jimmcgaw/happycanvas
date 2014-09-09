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

var Magnet = function(){

};

var Board = function(elementId){
  elementId = elementId || '#happycanvas';
  this.canvas = $(elementId);
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
  // render
};

Board.prototype.render = function(){

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
    var board = new Board();
    Meteor.setInterval(board.tick, 20);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
