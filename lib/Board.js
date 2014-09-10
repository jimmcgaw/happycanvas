var MAX_BALLS = 100;
BOARD_WIDTH = 1000;
BOARD_HEIGHT = 550;

Board = function(canvasDrawer){
  this._balls = [];
  this.canvasDrawer = canvasDrawer;
  this.init();
};

Board.checkWallCollision = function(ball){
  var collision = {};
  var maxW = BOARD_WIDTH - ball.radius;
  var maxH = BOARD_HEIGHT - ball.radius;

  if ( ball.position.x < ball.radius || ball.position.x > maxW ) collision.horizontal = true;
  if ( ball.position.y < ball.radius || ball.position.y > maxH ) collision.vertical = true;

  return collision;
};

Board.prototype.init = function(){
  for (var i = 0; i < MAX_BALLS; i++) {
    var ball = this.createRandomBall();
    this.addBall(ball);
  }
};


Board.prototype.createRandomBall = function(){
  var ball = {
    position: new Vector(
      Math.random() * this.canvasDrawer.getWidth(),
      Math.random() * this.canvasDrawer.getHeight()
    ),
    mass: Math.random() * 10,
    friction: 0.95,
    radius: 5,
    velocity: new Vector(
      Math.random() * 5,
      Math.random() * 5
    )
  };
  console.log(">>",ball.velocity);
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
  var self = this;

  // PHYSICS HERE
  // updatedBalls = applyLaws(ball, laws);
  this._updateBalls();

  // RENDER HERE
  this.render();
};

Board.prototype._updateBalls = function(){
  this._balls.forEach( function(ball){
    ball.tick();
  });
};

Board.prototype._clear = function(){
  this.canvasDrawer.clear();
};

Board.prototype.render = function(){
  this._clear();
  this._balls.forEach( function(ball){
    ball.render();
  });
};
