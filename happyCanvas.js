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
  elementId = elementId || 'myCanvas';
  this.canvas = $(elementId);
  if (this.canvas.length < 0){
    console.log('canvas element with id "' + elementId + '" was not found');
  }

  this._balls = [];
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
