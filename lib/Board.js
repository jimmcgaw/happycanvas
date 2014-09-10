var MAX_BALLS = 1;

Board = function(canvasDrawer){
  this._balls = [];
  this.canvasDrawer = canvasDrawer;
  this.init();
};

Board.checkWallCollision = function(ball){
  var collision = {};
  if ( ball.x < 10 || ball.x > 990 ) collision.horizontal = true;
  if ( ball.y < 10 || ball.y > 540 ) collision.vertical = true;

  if ( ball.x < 10 ) ball.x = 10;
  if ( ball.y < 10 ) ball.y = 10;
  if ( ball.x > 990 ) ball.x = 990;
  if ( ball.y > 540 ) ball.y = 540;

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
    x: Math.random() * this.canvasDrawer.getWidth(),
    y: Math.random() * this.canvasDrawer.getHeight(),
    mass: Math.random() * 10,
    friction: 1,//0.95,
    radius: 5,
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
