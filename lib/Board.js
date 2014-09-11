var MAX_BALLS = 2000;
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
      Math.random() * 0.5 * this.canvasDrawer.getWidth() + 50,
      Math.random() * 0.5 * this.canvasDrawer.getHeight() + 50
    ),
    mass: Math.random() * 10,
    friction: 0.95,
    radius: 14,
    velocity: new Vector(
      Math.random() * 1,
      Math.random() * 1
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
  // PHYSICS HERE
  this._balls.forEach( function(ball){
    ball.tick();
  });
  // RENDER HERE
  this.render();
};

Board.prototype.render = function(context){

  this.canvasDrawer.beginDraw();
  this._balls.forEach( function(ball){
    ball.render();
  });
  this.canvasDrawer.endDraw();
};
